/**
 * Vue Agentation - Element Identification Utilities
 *
 * This is a Vue 3 port of Agentation by Benji Taylor
 * Original: https://github.com/benjitaylor/agentation
 * License: PolyForm Shield License 1.0.0
 */

/**
 * Gets a readable CSS selector path for an element (e.g., 'article > section > p')
 */
export function getElementPath(target: Element, maxDepth = 3): string {
  const parts: string[] = [];
  let el: Element | null = target;
  let depth = 0;

  while (el && el !== document.body && depth < maxDepth) {
    let selector = el.tagName.toLowerCase();

    // Add id if present
    if (el.id) {
      selector += `#${el.id}`;
    }
    // Add first significant class if no id
    else if (el.classList.length > 0) {
      const significantClass = Array.from(el.classList).find(
        (c) => !c.match(/^_/) && !c.match(/[A-Za-z]+_[a-z0-9]{5,}/),
      );
      if (significantClass) {
        selector += `.${significantClass}`;
      }
    }

    parts.unshift(selector);
    el = el.parentElement;
    depth++;
  }

  return parts.join(" > ");
}

/**
 * Gets a complete DOM ancestry path for forensic analysis
 */
export function getFullElementPath(target: Element): string {
  const parts: string[] = [];
  let el: Element | null = target;

  while (el && el !== document.documentElement) {
    let selector = el.tagName.toLowerCase();

    if (el.id) {
      selector += `#${el.id}`;
    } else {
      // Add nth-child for uniqueness
      const parent = el.parentElement;
      if (parent) {
        const siblings = Array.from(parent.children).filter(
          (child) => child.tagName === el!.tagName,
        );
        if (siblings.length > 1) {
          const index = siblings.indexOf(el) + 1;
          selector += `:nth-of-type(${index})`;
        }
      }
    }

    parts.unshift(selector);
    el = el.parentElement;
  }

  return parts.join(" > ");
}

/**
 * Returns a human-readable name for an element
 */
export function identifyElement(target: Element): {
  name: string;
  path: string;
} {
  const path = getElementPath(target);
  const tag = target.tagName.toLowerCase();

  // SVG elements
  if (target instanceof SVGElement || target.closest("svg")) {
    const svgParent = target.closest("svg");
    const title = svgParent?.querySelector("title")?.textContent;
    const ariaLabel = svgParent?.getAttribute("aria-label");
    return {
      name: title || ariaLabel || "SVG graphic",
      path,
    };
  }

  // Buttons
  if (tag === "button" || target.getAttribute("role") === "button") {
    const text =
      target.textContent?.trim().slice(0, 30) ||
      target.getAttribute("aria-label") ||
      "Button";
    return { name: `Button: "${text}"`, path };
  }

  // Links
  if (tag === "a") {
    const text =
      target.textContent?.trim().slice(0, 30) ||
      target.getAttribute("aria-label") ||
      "Link";
    return { name: `Link: "${text}"`, path };
  }

  // Inputs
  if (tag === "input" || tag === "textarea" || tag === "select") {
    const inputType = (target as HTMLInputElement).type || tag;
    const label =
      target.getAttribute("aria-label") ||
      target.getAttribute("placeholder") ||
      document.querySelector(`label[for="${target.id}"]`)?.textContent?.trim();
    return {
      name: label ? `${inputType}: "${label}"` : `${inputType} field`,
      path,
    };
  }

  // Headings
  if (/^h[1-6]$/.test(tag)) {
    const text = target.textContent?.trim().slice(0, 40) || "Heading";
    return { name: `Heading: "${text}"`, path };
  }

  // Images
  if (tag === "img") {
    const alt = (target as HTMLImageElement).alt;
    return { name: alt ? `Image: "${alt}"` : "Image", path };
  }

  // Paragraphs and text blocks
  if (tag === "p" || tag === "span" || tag === "div") {
    const text = target.textContent?.trim();
    if (text && text.length > 0) {
      const preview = text.slice(0, 40) + (text.length > 40 ? "..." : "");
      return { name: `Text: "${preview}"`, path };
    }
  }

  // Lists
  if (tag === "li") {
    const text = target.textContent?.trim().slice(0, 40) || "List item";
    return { name: `List item: "${text}"`, path };
  }

  // Nav, header, footer, main, section, article
  if (["nav", "header", "footer", "main", "section", "article"].includes(tag)) {
    const ariaLabel = target.getAttribute("aria-label");
    return {
      name: ariaLabel ? `${tag}: "${ariaLabel}"` : tag,
      path,
    };
  }

  // Default: use tag name and first class
  const className = target.classList[0];
  return {
    name: className ? `${tag}.${className}` : tag,
    path,
  };
}

/**
 * Simplified identifier for animation feedback (less verbose)
 */
export function identifyAnimationElement(target: Element): string {
  const tag = target.tagName.toLowerCase();

  // Check for icon/svg
  if (target instanceof SVGElement || target.closest("svg")) {
    return "icon";
  }

  // Check for button-like elements
  if (tag === "button" || target.getAttribute("role") === "button") {
    return "button";
  }

  // Check for spinner/loader patterns
  const className = target.className?.toString() || "";
  if (
    className.includes("spinner") ||
    className.includes("loader") ||
    className.includes("loading")
  ) {
    return "spinner";
  }

  return tag;
}

/**
 * Collects text content from the target element and adjacent siblings
 */
export function getNearbyText(element: Element): string {
  const texts: string[] = [];

  // Get text from previous sibling
  const prev = element.previousElementSibling;
  if (prev) {
    const text = prev.textContent?.trim();
    if (text && text.length < 100) {
      texts.push(`[prev]: ${text.slice(0, 50)}`);
    }
  }

  // Get own text content
  const own = element.textContent?.trim();
  if (own && own.length < 200) {
    texts.push(own.slice(0, 80));
  }

  // Get text from next sibling
  const next = element.nextElementSibling;
  if (next) {
    const text = next.textContent?.trim();
    if (text && text.length < 100) {
      texts.push(`[next]: ${text.slice(0, 50)}`);
    }
  }

  return texts.join(" | ");
}

/**
 * Provides structural context by identifying sibling elements and parent
 */
export function getNearbyElements(element: Element): string {
  const parts: string[] = [];

  const parent = element.parentElement;
  if (parent && parent !== document.body) {
    parts.push(`parent: ${parent.tagName.toLowerCase()}`);
  }

  const prev = element.previousElementSibling;
  if (prev) {
    parts.push(`prev: ${prev.tagName.toLowerCase()}`);
  }

  const next = element.nextElementSibling;
  if (next) {
    parts.push(`next: ${next.tagName.toLowerCase()}`);
  }

  const childCount = element.children.length;
  if (childCount > 0) {
    parts.push(`children: ${childCount}`);
  }

  return parts.join(", ");
}

/**
 * Extracts and cleans CSS class names, removing module hashes
 */
export function getElementClasses(target: Element): string {
  if (!target.classList || target.classList.length === 0) {
    return "";
  }

  return Array.from(target.classList)
    .filter((c) => {
      // Filter out CSS module hashes (e.g., _abc123, Component_hash)
      if (c.match(/^_[a-zA-Z0-9]+$/)) return false;
      if (c.match(/[A-Za-z]+_[a-z0-9]{5,}$/)) return false;
      return true;
    })
    .join(" ");
}

/**
 * Returns relevant CSS properties based on element type
 */
export function getDetailedComputedStyles(target: Element): string {
  const styles = window.getComputedStyle(target);
  const tag = target.tagName.toLowerCase();
  const properties: string[] = [];

  // Always include display and position
  properties.push(`display: ${styles.display}`);
  properties.push(`position: ${styles.position}`);

  // Text elements
  if (
    ["p", "span", "h1", "h2", "h3", "h4", "h5", "h6", "a", "button"].includes(
      tag,
    )
  ) {
    properties.push(`font-size: ${styles.fontSize}`);
    properties.push(`font-weight: ${styles.fontWeight}`);
    properties.push(`color: ${styles.color}`);
    properties.push(`line-height: ${styles.lineHeight}`);
  }

  // Container elements
  if (
    ["div", "section", "article", "main", "nav", "header", "footer"].includes(
      tag,
    )
  ) {
    properties.push(`width: ${styles.width}`);
    properties.push(`height: ${styles.height}`);
    properties.push(`padding: ${styles.padding}`);
    properties.push(`margin: ${styles.margin}`);
    if (styles.display === "flex" || styles.display === "inline-flex") {
      properties.push(`flex-direction: ${styles.flexDirection}`);
      properties.push(`justify-content: ${styles.justifyContent}`);
      properties.push(`align-items: ${styles.alignItems}`);
      properties.push(`gap: ${styles.gap}`);
    }
    if (styles.display === "grid" || styles.display === "inline-grid") {
      properties.push(`grid-template-columns: ${styles.gridTemplateColumns}`);
      properties.push(`grid-template-rows: ${styles.gridTemplateRows}`);
      properties.push(`gap: ${styles.gap}`);
    }
  }

  // Background if visible
  if (styles.backgroundColor !== "rgba(0, 0, 0, 0)") {
    properties.push(`background-color: ${styles.backgroundColor}`);
  }

  // Border if visible
  if (styles.borderWidth !== "0px") {
    properties.push(`border: ${styles.border}`);
  }

  // Border radius if present
  if (styles.borderRadius !== "0px") {
    properties.push(`border-radius: ${styles.borderRadius}`);
  }

  return properties.join("; ");
}

/**
 * Provides comprehensive CSS properties for forensic analysis
 */
export function getForensicComputedStyles(target: Element): string {
  const styles = window.getComputedStyle(target);
  const relevantProps = [
    "display",
    "position",
    "top",
    "right",
    "bottom",
    "left",
    "width",
    "height",
    "min-width",
    "min-height",
    "max-width",
    "max-height",
    "padding",
    "margin",
    "border",
    "border-radius",
    "background",
    "background-color",
    "color",
    "font-family",
    "font-size",
    "font-weight",
    "line-height",
    "text-align",
    "flex-direction",
    "justify-content",
    "align-items",
    "gap",
    "grid-template-columns",
    "grid-template-rows",
    "overflow",
    "z-index",
    "opacity",
    "transform",
    "transition",
    "animation",
  ];

  return relevantProps
    .map((prop) => {
      const value = styles.getPropertyValue(prop);
      return value && value !== "none" && value !== "normal" && value !== "auto"
        ? `${prop}: ${value}`
        : null;
    })
    .filter(Boolean)
    .join("; ");
}

/**
 * Extracts ARIA attributes, roles, and focusability data
 */
export function getAccessibilityInfo(target: Element): string {
  const parts: string[] = [];

  // Role
  const role = target.getAttribute("role");
  if (role) {
    parts.push(`role="${role}"`);
  }

  // ARIA attributes
  const ariaAttrs = Array.from(target.attributes)
    .filter((attr) => attr.name.startsWith("aria-"))
    .map((attr) => `${attr.name}="${attr.value}"`)
    .join(" ");
  if (ariaAttrs) {
    parts.push(ariaAttrs);
  }

  // Focusability
  const tabIndex = target.getAttribute("tabindex");
  if (tabIndex !== null) {
    parts.push(`tabindex="${tabIndex}"`);
  }

  // Check if naturally focusable
  const focusableTags = ["a", "button", "input", "textarea", "select"];
  if (focusableTags.includes(target.tagName.toLowerCase())) {
    parts.push("focusable");
  }

  return parts.join(" ");
}

/**
 * Check if an element has fixed or sticky positioning
 */
export function isElementFixed(element: Element): boolean {
  let el: Element | null = element;
  while (el && el !== document.body) {
    const position = window.getComputedStyle(el).position;
    if (position === "fixed" || position === "sticky") {
      return true;
    }
    el = el.parentElement;
  }
  return false;
}
