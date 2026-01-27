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

  // Form elements (input, textarea, select)
  if (tag === "input" || tag === "textarea" || tag === "select") {
    // Priority 1: Use ID if present (e.g., input#email, select#country)
    if (target.id) {
      return { name: `${tag}#${target.id}`, path };
    }

    // Priority 2: Use significant class if present (e.g., input.form-control, select.form-select)
    if (target.classList.length > 0) {
      const significantClasses = Array.from(target.classList).filter((c) => {
        if (c.match(/^_[a-zA-Z0-9]+$/)) return false;
        if (c.match(/[A-Za-z]+_[a-z0-9]{5,}$/)) return false;
        return true;
      });
      if (significantClasses.length > 0) {
        const classesStr = significantClasses.slice(0, 2).join('.');
        return { name: `${tag}.${classesStr}`, path };
      }
    }

    // Priority 3: Use label or aria-label for context
    const labelElement = target.id 
      ? document.querySelector(`label[for="${target.id}"]`) 
      : null;
    const labelText = labelElement?.textContent?.trim();
    const ariaLabel = target.getAttribute("aria-label");
    const placeholder = target.getAttribute("placeholder");
    const name = target.getAttribute("name");

    // Build a descriptive name with type info
    const inputType = tag === "select" 
      ? "select" 
      : tag === "textarea" 
        ? "textarea" 
        : (target as HTMLInputElement).type || "text";
    
    const descriptor = labelText || ariaLabel || placeholder || name;
    if (descriptor) {
      return { name: `${tag}[${inputType}]: "${descriptor.slice(0, 30)}"`, path };
    }

    // Priority 4: Just show tag with type (e.g., "input[text]", "select")
    return { name: tag === "input" ? `${tag}[${inputType}]` : tag, path };
  }

  // Headings
  if (/^h[1-6]$/.test(tag)) {
    const text = target.textContent?.trim().slice(0, 40);
    return { name: text ? `${tag}: "${text}"` : tag, path };
  }

  // Paragraphs (Specific request: "Paragraph")
  if (tag === "p") {
    const text = target.textContent?.trim();
    if (text && text.length > 0) {
      const preview = text.slice(0, 40) + (text.length > 40 ? "..." : "");
      return { name: `Paragraph: "${preview}"`, path };
    }
    return { name: "Paragraph", path };
  }

  // Images
  if (tag === "img") {
    const alt = (target as HTMLImageElement).alt;
    return { name: alt ? `Image: "${alt}"` : "Image", path };
  }

  // Labels (form companion)
  if (tag === "label") {
    const forAttr = target.getAttribute("for");
    const text = target.textContent?.trim().slice(0, 30);
    if (forAttr) {
      return { name: `Label[for="${forAttr}"]: "${text || ""}"`, path };
    }
    return { name: text ? `Label: "${text}"` : "Label", path };
  }

  // Tables
  if (tag === "table") {
    const caption = target.querySelector("caption")?.textContent?.trim().slice(0, 30);
    const ariaLabel = target.getAttribute("aria-label");
    return { name: caption || ariaLabel ? `Table: "${caption || ariaLabel}"` : "Table", path };
  }
  if (tag === "thead") return { name: "Table header", path };
  if (tag === "tbody") return { name: "Table body", path };
  if (tag === "tfoot") return { name: "Table footer", path };
  if (tag === "tr") {
    const rowIndex = (target as HTMLTableRowElement).rowIndex;
    return { name: `Table row ${rowIndex >= 0 ? `#${rowIndex + 1}` : ""}`, path };
  }
  if (tag === "th") {
    const text = target.textContent?.trim().slice(0, 25);
    return { name: text ? `Table header: "${text}"` : "Table header cell", path };
  }
  if (tag === "td") {
    const text = target.textContent?.trim().slice(0, 25);
    return { name: text ? `Table cell: "${text}"` : "Table cell", path };
  }

  // Forms
  if (tag === "form") {
    const name = target.getAttribute("name") || target.getAttribute("id");
    const action = target.getAttribute("action");
    if (name) return { name: `Form: "${name}"`, path };
    if (action) return { name: `Form → ${action.slice(0, 30)}`, path };
    return { name: "Form", path };
  }

  // Fieldset/Legend (form grouping)
  if (tag === "fieldset") {
    const legend = target.querySelector("legend")?.textContent?.trim().slice(0, 30);
    return { name: legend ? `Fieldset: "${legend}"` : "Fieldset", path };
  }
  if (tag === "legend") {
    const text = target.textContent?.trim().slice(0, 30);
    return { name: text ? `Legend: "${text}"` : "Legend", path };
  }

  // Video/Audio
  if (tag === "video") {
    const src = (target as HTMLVideoElement).src || target.querySelector("source")?.src;
    return { name: src ? `Video: ${src.split("/").pop()?.slice(0, 25) || "video"}` : "Video", path };
  }
  if (tag === "audio") {
    const src = (target as HTMLAudioElement).src || target.querySelector("source")?.src;
    return { name: src ? `Audio: ${src.split("/").pop()?.slice(0, 25) || "audio"}` : "Audio", path };
  }

  // Iframe
  if (tag === "iframe") {
    const title = target.getAttribute("title");
    const src = (target as HTMLIFrameElement).src;
    if (title) return { name: `Iframe: "${title}"`, path };
    if (src) {
      try {
        const hostname = new URL(src).hostname;
        return { name: `Iframe: ${hostname}`, path };
      } catch {
        return { name: "Iframe", path };
      }
    }
    return { name: "Iframe", path };
  }

  // Code blocks
  if (tag === "code") {
    const parent = target.parentElement;
    const isBlock = parent?.tagName.toLowerCase() === "pre";
    const text = target.textContent?.trim().slice(0, 30);
    return { name: isBlock ? "Code block" : (text ? `Code: "${text}"` : "Inline code"), path };
  }
  if (tag === "pre") {
    const hasCode = target.querySelector("code");
    return { name: hasCode ? "Code block" : "Preformatted text", path };
  }

  // Dialog/Modal
  if (tag === "dialog") {
    const ariaLabel = target.getAttribute("aria-label") || target.getAttribute("aria-labelledby");
    const isOpen = (target as HTMLDialogElement).open;
    const stateStr = isOpen ? " (open)" : "";
    return { name: ariaLabel ? `Dialog: "${ariaLabel}"${stateStr}` : `Dialog${stateStr}`, path };
  }

  // Progress/Meter
  if (tag === "progress") {
    const value = (target as HTMLProgressElement).value;
    const max = (target as HTMLProgressElement).max;
    return { name: `Progress: ${Math.round((value / max) * 100)}%`, path };
  }
  if (tag === "meter") {
    const value = (target as HTMLMeterElement).value;
    return { name: `Meter: ${value}`, path };
  }

  // Canvas
  if (tag === "canvas") {
    const ariaLabel = target.getAttribute("aria-label");
    return { name: ariaLabel ? `Canvas: "${ariaLabel}"` : "Canvas", path };
  }

  // Figure/Figcaption
  if (tag === "figure") {
    const caption = target.querySelector("figcaption")?.textContent?.trim().slice(0, 30);
    return { name: caption ? `Figure: "${caption}"` : "Figure", path };
  }
  if (tag === "figcaption") {
    const text = target.textContent?.trim().slice(0, 30);
    return { name: text ? `Caption: "${text}"` : "Figure caption", path };
  }

  // Blockquote/Cite
  if (tag === "blockquote") {
    const cite = target.getAttribute("cite");
    const text = target.textContent?.trim().slice(0, 30);
    if (cite) return { name: `Blockquote from ${cite}`, path };
    return { name: text ? `Blockquote: "${text}..."` : "Blockquote", path };
  }

  // Lists (ul, ol, li)
  if (tag === "ul") {
    const itemCount = target.querySelectorAll(":scope > li").length;
    return { name: `Unordered list (${itemCount} items)`, path };
  }
  if (tag === "ol") {
    const itemCount = target.querySelectorAll(":scope > li").length;
    const start = (target as HTMLOListElement).start || 1;
    return { name: `Ordered list (${itemCount} items, starts at ${start})`, path };
  }
  if (tag === "li") {
    const text = target.textContent?.trim().slice(0, 25);
    return { name: text ? `List item: "${text}"` : "List item", path };
  }
  if (tag === "dl") {
    return { name: "Definition list", path };
  }
  if (tag === "dt") {
    const text = target.textContent?.trim().slice(0, 25);
    return { name: text ? `Term: "${text}"` : "Definition term", path };
  }
  if (tag === "dd") {
    const text = target.textContent?.trim().slice(0, 25);
    return { name: text ? `Definition: "${text}"` : "Definition", path };
  }

  // Check for significant class for any element not caught above
  // (div, span, article, section, strong, etc.)
  if (target.classList.length > 0) {
    const significantClasses = Array.from(target.classList).filter((c) => {
        // Filter out CSS module hashes and common utility-like patterns if needed
        // For now, filtering hashes similar to getElementClasses
        if (c.match(/^_[a-zA-Z0-9]+$/)) return false;
        if (c.match(/[A-Za-z]+_[a-z0-9]{5,}$/)) return false;
        return true;
    });
    
    if (significantClasses.length > 0) {
        // Show up to 3 classes to look like a selector (e.g. div.flex.p-4.bg-red)
        const classesStr = significantClasses.slice(0, 3).join('.');
        return { name: `${tag}.${classesStr}`, path };
    }
  }

  // Nav, header, footer, main, section, article - check for aria-label
  if (["nav", "header", "footer", "main", "section", "article"].includes(tag)) {
    const ariaLabel = target.getAttribute("aria-label");
    if (ariaLabel) {
      return {
        name: `${tag}: "${ariaLabel}"`,
        path,
      };
    }
  }

  // Default fallback
  return {
    name: tag,
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
