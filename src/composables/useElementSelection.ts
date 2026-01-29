/**
 * Vue Agentation - Element Selection Composable
 *
 * This is a Vue 3 port of Agentation by Benji Taylor
 * Original: https://github.com/benjitaylor/agentation
 * License: PolyForm Shield License 1.0.0
 */

import { ref, onUnmounted, readonly, computed } from "vue";
import {
  identifyElement,
  getNearbyText,
  getNearbyElements,
  getElementClasses,
  getDetailedComputedStyles,
  getFullElementPath,
  getAccessibilityInfo,
  isElementFixed,
} from "../utils/element-identification";
import type { PendingAnnotation, GroupElement } from "../types";

export interface ElementInfo {
  element: HTMLElement;
  name: string;
  path: string;
  rect: DOMRect;
}

export interface MarqueeBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface SelectionCallbacks {
  onSelect: (pending: PendingAnnotation, element: HTMLElement | null) => void;
  onHoverChange?: (info: ElementInfo | null) => void;
  onMarqueeChange?: (freeformBox: MarqueeBox | null, elementBox: MarqueeBox | null, elements: GroupElement[]) => void;
}

export interface CursorPosition {
  x: number;
  y: number;
}

export interface UseElementSelectionReturn {
  isActive: Readonly<import("vue").Ref<boolean>>;
  isMarqueeMode: Readonly<import("vue").Ref<boolean>>;
  hoveredElement: Readonly<import("vue").Ref<HTMLElement | null>>;
  highlightBox: Readonly<import("vue").Ref<DOMRect | null>>;
  elementInfo: Readonly<import("vue").Ref<ElementInfo | null>>;
  cursorPosition: Readonly<import("vue").Ref<CursorPosition | null>>;
  marqueeBox: Readonly<import("vue").Ref<MarqueeBox | null>>;
  selectedElements: Readonly<import("vue").Ref<readonly GroupElement[]>>;
  start: () => void;
  stop: () => void;
  toggle: () => void;
}

export function useElementSelection(
  callbacks: SelectionCallbacks
): UseElementSelectionReturn {
  const isActive = ref(false);
  const hoveredElement = ref<HTMLElement | null>(null);
  const highlightBox = ref<DOMRect | null>(null);
  const elementInfo = ref<ElementInfo | null>(null);
  const cursorPosition = ref<CursorPosition | null>(null);

  // Marquee selection state
  const mouseDownPosition = ref<CursorPosition | null>(null);
  const isDragging = ref(false);
  const marqueeBox = ref<MarqueeBox | null>(null);
  const selectedElements = ref<GroupElement[]>([]);
  const elementsBoundingBox = ref<MarqueeBox | null>(null); // Bounding box of selected elements

  const isMarqueeMode = computed(() => isDragging.value && marqueeBox.value !== null);

  // Elements to ignore during selection
  const ignoreSelector = "[data-agentation-ignore]";

  function shouldIgnoreElement(target: HTMLElement): boolean {
    // Ignore the toolbar and its children
    if (target.closest(ignoreSelector)) {
      return true;
    }
    // Ignore body and html
    if (target === document.body || target === document.documentElement) {
      return true;
    }
    return false;
  }

  function rectsIntersect(
    rect1: { x: number; y: number; width: number; height: number },
    rect2: { x: number; y: number; width: number; height: number }
  ): boolean {
    return !(
      rect1.x + rect1.width < rect2.x ||
      rect2.x + rect2.width < rect1.x ||
      rect1.y + rect1.height < rect2.y ||
      rect2.y + rect2.height < rect1.y
    );
  }

  interface SelectedElementData {
    element: GroupElement;
    rect: DOMRect;
    htmlElement: HTMLElement;
  }

  // Check if an element should always be excluded (html, body, script, style, etc.)
  function isStructuralElement(el: HTMLElement): boolean {
    const structuralTags = ['HTML', 'BODY', 'HEAD', 'SCRIPT', 'STYLE', 'LINK', 'META', 'NOSCRIPT'];
    return structuralTags.includes(el.tagName);
  }

  // Check if element is too large (covers most of the viewport)
  function isViewportSized(rect: DOMRect): boolean {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    // Consider element "viewport-sized" if it covers more than 80% in both dimensions
    return rect.width >= viewportWidth * 0.8 && rect.height >= viewportHeight * 0.8;
  }

  // Calculate how much of the element's area is covered by the marquee
  function calculateCoverageRatio(marquee: MarqueeBox, elementRect: { x: number; y: number; width: number; height: number }): number {
    // Calculate intersection rectangle
    const intersectLeft = Math.max(marquee.x, elementRect.x);
    const intersectTop = Math.max(marquee.y, elementRect.y);
    const intersectRight = Math.min(marquee.x + marquee.width, elementRect.x + elementRect.width);
    const intersectBottom = Math.min(marquee.y + marquee.height, elementRect.y + elementRect.height);

    // No intersection
    if (intersectRight <= intersectLeft || intersectBottom <= intersectTop) {
      return 0;
    }

    const intersectionArea = (intersectRight - intersectLeft) * (intersectBottom - intersectTop);
    const elementArea = elementRect.width * elementRect.height;

    return elementArea > 0 ? intersectionArea / elementArea : 0;
  }

  // Check if marquee meaningfully covers the element (not just touching it)
  function marqueeMeaningfullyCovers(marquee: MarqueeBox, elementRect: { x: number; y: number; width: number; height: number }): boolean {
    const coverage = calculateCoverageRatio(marquee, elementRect);

    // Element is considered "meaningfully covered" if:
    // 1. Marquee covers at least 30% of the element's area, OR
    // 2. Element is smaller than or similar in size to the marquee (element fits within 2x marquee size)
    const elementArea = elementRect.width * elementRect.height;
    const marqueeArea = marquee.width * marquee.height;

    // If element is small relative to marquee, accept lower coverage
    if (elementArea <= marqueeArea * 2) {
      return coverage > 0.1; // Just needs some overlap for small elements
    }

    // For larger elements, require meaningful coverage
    return coverage >= 0.3;
  }

  // Count all descendant elements within an element (for annotation summary)
  function countNestedElements(el: HTMLElement): number {
    // Count all descendants plus the element itself
    return el.querySelectorAll('*').length + 1;
  }

  /**
   * New marquee selection algorithm:
   * 1. Find element under cursor release point using elementFromPoint
   * 2. Walk up the DOM to find the highest ancestor whose bounds the marquee intersects
   * 3. If no suitable container found (cursor in empty space), fall back to leaf selection
   */
  function getIntersectingElements(marquee: MarqueeBox, cursorPos: CursorPosition | null): {
    elements: GroupElement[];
    boundingBox: MarqueeBox | null;
    totalElementCount: number;
  } {
    // Step 1: Try to find element under cursor
    const anchorElement = cursorPos
      ? document.elementFromPoint(cursorPos.x, cursorPos.y) as HTMLElement | null
      : null;

    // Step 2: If we have an anchor element, walk up to find highest qualifying ancestor
    if (anchorElement && !shouldIgnoreElement(anchorElement) && !isStructuralElement(anchorElement)) {
      const targetElement = findHighestIntersectingAncestor(anchorElement, marquee);

      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        const { name, path } = identifyElement(targetElement);
        const totalCount = countNestedElements(targetElement);

        return {
          elements: [{ name, path }],
          boundingBox: {
            x: rect.left,
            y: rect.top,
            width: rect.width,
            height: rect.height,
          },
          totalElementCount: totalCount,
        };
      }
    }

    // Step 3: Fallback - no anchor or no suitable ancestor, use leaf selection
    return getLeafIntersectingElements(marquee);
  }

  /**
   * Walk up from element to find the highest ancestor whose bounds
   * the marquee meaningfully covers. Stop when coverage becomes too low.
   */
  function findHighestIntersectingAncestor(element: HTMLElement, marquee: MarqueeBox): HTMLElement | null {
    let current: HTMLElement | null = element;
    let highestValid: HTMLElement | null = null;

    while (current && !isStructuralElement(current)) {
      if (shouldIgnoreElement(current)) {
        current = current.parentElement;
        continue;
      }

      const rect = current.getBoundingClientRect();

      // Skip elements with zero or very small dimensions
      if (rect.width < 2 || rect.height < 2) {
        current = current.parentElement;
        continue;
      }

      // Stop at viewport-sized elements
      if (isViewportSized(rect)) {
        break;
      }

      const elementRect = {
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height,
      };

      // Check if marquee meaningfully covers this element (not just touching it)
      if (marqueeMeaningfullyCovers(marquee, elementRect)) {
        highestValid = current;
      } else if (highestValid !== null) {
        // Once we stop covering meaningfully, don't go higher
        break;
      }

      current = current.parentElement;
    }

    return highestValid;
  }

  /**
   * Fallback: select all leaf elements that intersect the marquee.
   * Used when cursor is not over a specific element.
   */
  function getLeafIntersectingElements(marquee: MarqueeBox): {
    elements: GroupElement[];
    boundingBox: MarqueeBox | null;
    totalElementCount: number;
  } {
    const seenPaths = new Set<string>();
    const allElements = document.querySelectorAll("*");

    // Collect all intersecting elements with their rects
    const intersecting: { element: HTMLElement; rect: DOMRect }[] = [];

    allElements.forEach((el) => {
      const htmlEl = el as HTMLElement;
      if (shouldIgnoreElement(htmlEl)) return;
      if (isStructuralElement(htmlEl)) return;

      const rect = htmlEl.getBoundingClientRect();

      // Skip elements with zero or very small dimensions
      if (rect.width < 2 || rect.height < 2) return;

      // Skip viewport-sized elements
      if (isViewportSized(rect)) return;

      // Check if element intersects with marquee
      if (rectsIntersect(marquee, {
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height,
      })) {
        intersecting.push({ element: htmlEl, rect });
      }
    });

    // Build set for quick lookup
    const intersectingSet = new Set(intersecting.map(i => i.element));

    // Filter to leaf elements only (no intersecting children)
    const selectedData: SelectedElementData[] = [];

    intersecting.forEach(({ element, rect }) => {
      // Check if any of this element's children are in the intersecting set
      let hasIntersectingChild = false;
      intersectingSet.forEach((other) => {
        if (element.contains(other) && element !== other) {
          hasIntersectingChild = true;
        }
      });

      // Skip if it has intersecting children (prefer children)
      if (hasIntersectingChild) return;

      const { name, path } = identifyElement(element);

      // Avoid duplicates
      if (seenPaths.has(path)) return;
      seenPaths.add(path);

      selectedData.push({ element: { name, path }, rect, htmlElement: element });
    });

    // Calculate bounding box
    let boundingBox: MarqueeBox | null = null;
    if (selectedData.length > 0) {
      let minX = Infinity;
      let minY = Infinity;
      let maxX = -Infinity;
      let maxY = -Infinity;

      selectedData.forEach(({ rect }) => {
        minX = Math.min(minX, rect.left);
        minY = Math.min(minY, rect.top);
        maxX = Math.max(maxX, rect.right);
        maxY = Math.max(maxY, rect.bottom);
      });

      boundingBox = {
        x: minX,
        y: minY,
        width: maxX - minX,
        height: maxY - minY,
      };
    }

    // Count total nested elements across all selected elements
    let totalCount = 0;
    selectedData.forEach(({ htmlElement }) => {
      totalCount += countNestedElements(htmlElement);
    });

    return {
      elements: selectedData.map((d) => d.element),
      boundingBox,
      totalElementCount: totalCount,
    };
  }

  function calculateMarqueeBox(
    start: CursorPosition,
    current: CursorPosition
  ): MarqueeBox {
    const x = Math.min(start.x, current.x);
    const y = Math.min(start.y, current.y);
    const width = Math.abs(current.x - start.x);
    const height = Math.abs(current.y - start.y);
    return { x, y, width, height };
  }

  function handleMouseDown(event: MouseEvent) {
    if (event.button !== 0) return; // Only left click

    const target = event.target as HTMLElement;
    if (shouldIgnoreElement(target)) return;

    // Prevent text/image selection from starting
    event.preventDefault();

    mouseDownPosition.value = { x: event.clientX, y: event.clientY };
    isDragging.value = false;
    marqueeBox.value = null;
    selectedElements.value = [];
  }

  function handleMouseMove(event: MouseEvent) {
    const currentPos: CursorPosition = { x: event.clientX, y: event.clientY };
    cursorPosition.value = currentPos;

    // If mouse is down, check for drag
    if (mouseDownPosition.value) {
      const box = calculateMarqueeBox(mouseDownPosition.value, currentPos);

      // Check if marquee intersects any element bounding box
      if (!isDragging.value) {
        // Check if we've touched any element's bounding box
        const allElements = document.querySelectorAll("*");
        let touchedElement = false;

        allElements.forEach((el) => {
          if (touchedElement) return;
          const htmlEl = el as HTMLElement;
          if (shouldIgnoreElement(htmlEl)) return;

          const rect = htmlEl.getBoundingClientRect();
          if (
            rectsIntersect(box, {
              x: rect.left,
              y: rect.top,
              width: rect.width,
              height: rect.height,
            })
          ) {
            // Only trigger marquee if we've moved enough AND touched an element
            if (box.width > 5 || box.height > 5) {
              touchedElement = true;
            }
          }
        });

        if (touchedElement) {
          isDragging.value = true;
          // Clear single element hover state
          hoveredElement.value = null;
          highlightBox.value = null;
          elementInfo.value = null;
          callbacks.onHoverChange?.(null);
        }
      }

      if (isDragging.value) {
        // Prevent text/image selection during marquee drag
        event.preventDefault();

        marqueeBox.value = box;
        // During drag, pass current cursor position for preview
        const result = getIntersectingElements(box, currentPos);
        selectedElements.value = result.elements;
        elementsBoundingBox.value = result.boundingBox;
        // Pass the freeform box for marquee display, element box for preview
        callbacks.onMarqueeChange?.(box, result.boundingBox, result.elements);
        return;
      }
    }

    // Regular hover behavior (no drag)
    if (!isDragging.value) {
      const target = event.target as HTMLElement;

      if (shouldIgnoreElement(target)) {
        hoveredElement.value = null;
        highlightBox.value = null;
        elementInfo.value = null;
        callbacks.onHoverChange?.(null);
        return;
      }

      // Update highlight if target changed
      if (target !== hoveredElement.value) {
        hoveredElement.value = target;
        const rect = target.getBoundingClientRect();
        highlightBox.value = rect;

        const { name, path } = identifyElement(target);
        const info: ElementInfo = {
          element: target,
          name,
          path,
          rect,
        };
        elementInfo.value = info;
        callbacks.onHoverChange?.(info);
      }
    }
  }

  function handleMouseUp(event: MouseEvent) {
    if (event.button !== 0) return; // Only left click

    const target = event.target as HTMLElement;

    if (isDragging.value && marqueeBox.value) {
      // Marquee selection completed - recalculate with final cursor position
      event.preventDefault();
      event.stopPropagation();

      const cursorPos: CursorPosition = { x: event.clientX, y: event.clientY };
      const result = getIntersectingElements(marqueeBox.value, cursorPos);

      // If no elements selected, abort
      if (result.elements.length === 0) {
        resetDragState();
        return;
      }

      const elements = result.elements;
      const box = result.boundingBox || marqueeBox.value;
      const totalElementCount = result.totalElementCount;
      const viewportWidth = window.innerWidth;
      const scrollY = window.scrollY;

      // Use cursor release position for marker placement
      const markerX = event.clientX;
      const markerY = event.clientY;

      // Create element name summary - use totalElementCount for the count
      const displayCount = elements.length === 1 ? totalElementCount : elements.length;
      const elementSummary =
        elements.length === 1
          ? (totalElementCount > 1 ? `${elements[0].name} (${totalElementCount} elements)` : elements[0].name)
          : `${displayCount} elements: ${elements
              .slice(0, 3)
              .map((e) => e.name)
              .join(", ")}${elements.length > 3 ? ` +${elements.length - 3} more` : ""}`;

      const pending: PendingAnnotation = {
        x: (markerX / viewportWidth) * 100,
        y: markerY + scrollY,
        element: elementSummary,
        elementPath: elements.map((e) => e.path).join(", "),
        isMultiSelect: true,
        elements: elements,
        totalElementCount: totalElementCount,
        // Store bounding box in document coordinates (add scrollY to convert from viewport)
        groupBoundingBox: {
          x: box.x,
          y: box.y + scrollY,
          width: box.width,
          height: box.height,
        },
        boundingBox: {
          x: box.x,
          y: box.y + scrollY,
          width: box.width,
          height: box.height,
        },
      };

      // Stop selection mode
      stop();

      // Notify callback
      callbacks.onSelect(pending, null);
    } else if (mouseDownPosition.value && !isDragging.value) {
      // Single click selection
      if (shouldIgnoreElement(target)) {
        resetDragState();
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      // Gather element information
      const { name, path } = identifyElement(target);
      const rect = target.getBoundingClientRect();
      const viewportWidth = window.innerWidth;

      // Use cursor position for marker placement (not element center)
      const scrollY = window.scrollY;
      const fixed = isElementFixed(target);

      const pending: PendingAnnotation = {
        x: (event.clientX / viewportWidth) * 100,
        y: fixed
          ? event.clientY
          : event.clientY + scrollY,
        element: name,
        elementPath: path,
        // Store bounding box in document coordinates (add scrollY for non-fixed elements)
        boundingBox: {
          x: rect.left,
          y: fixed ? rect.top : rect.top + scrollY,
          width: rect.width,
          height: rect.height,
        },
        nearbyText: getNearbyText(target),
        nearbyElements: getNearbyElements(target),
        cssClasses: getElementClasses(target),
        computedStyles: getDetailedComputedStyles(target),
        fullPath: getFullElementPath(target),
        accessibility: getAccessibilityInfo(target),
        isFixed: fixed,
        isMultiSelect: false,
      };

      // Stop selection mode
      stop();

      // Notify callback
      callbacks.onSelect(pending, target);
    }

    resetDragState();
  }

  function resetDragState() {
    mouseDownPosition.value = null;
    isDragging.value = false;
    marqueeBox.value = null;
    selectedElements.value = [];
    elementsBoundingBox.value = null;
    callbacks.onMarqueeChange?.(null, null, []);
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      stop();
    }
  }

  function start() {
    if (isActive.value) return;

    isActive.value = true;
    document.addEventListener("mousedown", handleMouseDown, { capture: true });
    document.addEventListener("mousemove", handleMouseMove, { capture: true });
    document.addEventListener("mouseup", handleMouseUp, { capture: true });
    document.addEventListener("keydown", handleKeyDown);

    // Change cursor
    document.body.style.cursor = "crosshair";
  }

  function stop() {
    if (!isActive.value) return;

    isActive.value = false;
    hoveredElement.value = null;
    highlightBox.value = null;
    elementInfo.value = null;
    cursorPosition.value = null;
    resetDragState();

    document.removeEventListener("mousedown", handleMouseDown, {
      capture: true,
    });
    document.removeEventListener("mousemove", handleMouseMove, {
      capture: true,
    });
    document.removeEventListener("mouseup", handleMouseUp, { capture: true });
    document.removeEventListener("keydown", handleKeyDown);

    // Restore cursor
    document.body.style.cursor = "";

    callbacks.onHoverChange?.(null);
  }

  function toggle() {
    if (isActive.value) {
      stop();
    } else {
      start();
    }
  }

  // Cleanup on unmount
  onUnmounted(() => {
    if (isActive.value) {
      stop();
    }
  });

  return {
    isActive: readonly(isActive),
    isMarqueeMode: readonly(isMarqueeMode),
    hoveredElement: readonly(hoveredElement) as unknown as Readonly<
      import("vue").Ref<HTMLElement | null>
    >,
    highlightBox: readonly(highlightBox),
    elementInfo: readonly(elementInfo) as unknown as Readonly<
      import("vue").Ref<ElementInfo | null>
    >,
    cursorPosition: readonly(cursorPosition),
    marqueeBox: readonly(marqueeBox),
    selectedElements: readonly(selectedElements),
    start,
    stop,
    toggle,
  };
}
