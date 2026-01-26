/**
 * Vue Agentation - Element Selection Composable
 *
 * This is a Vue 3 port of Agentation by Benji Taylor
 * Original: https://github.com/benjitaylor/agentation
 * License: PolyForm Shield License 1.0.0
 */

import { ref, onUnmounted, readonly } from "vue";
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
import type { PendingAnnotation } from "../types";

export interface ElementInfo {
  element: HTMLElement;
  name: string;
  path: string;
  rect: DOMRect;
}

export interface SelectionCallbacks {
  onSelect: (pending: PendingAnnotation, element: HTMLElement) => void;
  onHoverChange?: (info: ElementInfo | null) => void;
}

export interface UseElementSelectionReturn {
  isActive: Readonly<import("vue").Ref<boolean>>;
  hoveredElement: Readonly<import("vue").Ref<HTMLElement | null>>;
  highlightBox: Readonly<import("vue").Ref<DOMRect | null>>;
  elementInfo: Readonly<import("vue").Ref<ElementInfo | null>>;
  start: () => void;
  stop: () => void;
  toggle: () => void;
}

export function useElementSelection(callbacks: SelectionCallbacks): UseElementSelectionReturn {
  const isActive = ref(false);
  const hoveredElement = ref<HTMLElement | null>(null);
  const highlightBox = ref<DOMRect | null>(null);
  const elementInfo = ref<ElementInfo | null>(null);

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

  function handleMouseMove(event: MouseEvent) {
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

  function handleClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    const target = event.target as HTMLElement;

    if (shouldIgnoreElement(target)) {
      return;
    }

    // Gather element information
    const { name, path } = identifyElement(target);
    const rect = target.getBoundingClientRect();
    const viewportWidth = window.innerWidth;

    // Calculate position as percentage of viewport width (x) and absolute pixels (y)
    const scrollY = window.scrollY;
    const fixed = isElementFixed(target);

    const pending: PendingAnnotation = {
      x: ((rect.left + rect.width / 2) / viewportWidth) * 100,
      y: fixed
        ? rect.top + rect.height / 2
        : rect.top + rect.height / 2 + scrollY,
      element: name,
      elementPath: path,
      boundingBox: {
        x: rect.left,
        y: rect.top,
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
    };

    // Stop selection mode
    stop();

    // Notify callback
    callbacks.onSelect(pending, target);
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      stop();
    }
  }

  function start() {
    if (isActive.value) return;

    isActive.value = true;
    document.addEventListener("mousemove", handleMouseMove, { capture: true });
    document.addEventListener("click", handleClick, { capture: true });
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

    document.removeEventListener("mousemove", handleMouseMove, {
      capture: true,
    });
    document.removeEventListener("click", handleClick, { capture: true });
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
    hoveredElement: readonly(hoveredElement) as unknown as Readonly<import("vue").Ref<HTMLElement | null>>,
    highlightBox: readonly(highlightBox),
    elementInfo: readonly(elementInfo) as unknown as Readonly<import("vue").Ref<ElementInfo | null>>,
    start,
    stop,
    toggle,
  };
}
