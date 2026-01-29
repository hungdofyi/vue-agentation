/**
 * Vue Agentation - Markdown Output Generation
 *
 * This is a Vue 3 port of Agentation by Benji Taylor
 * Original: https://github.com/benjitaylor/agentation
 * License: PolyForm Shield License 1.0.0
 */

import type { Annotation, OutputDetailLevel } from "../types";

/**
 * Generate markdown output from annotations
 */
export function generateMarkdown(
  annotations: Annotation[],
  level: OutputDetailLevel = "standard",
): string {
  if (annotations.length === 0) {
    return "No annotations to display.";
  }

  const lines: string[] = [
    "# Page Annotations",
    "",
    `Generated: ${new Date().toISOString()}`,
    `URL: ${typeof window !== "undefined" ? window.location.href : "N/A"}`,
    "",
    "---",
    "",
  ];

  annotations.forEach((annotation, index) => {
    // Handle group annotations differently
    if (annotation.isMultiSelect && annotation.elements && annotation.elements.length > 0) {
      // Group annotation format (matches original Agentation)
      // Use totalElementCount if available (counts all nested elements), otherwise use elements.length
      const totalCount = annotation.totalElementCount ?? annotation.elements.length;
      const maxDisplay = 4;
      const displayElements = annotation.elements.slice(0, maxDisplay);
      const remaining = annotation.elements.length - maxDisplay;

      const elementList = displayElements.map((e) => e.name).join(", ");
      const suffix = remaining > 0 ? ` +${remaining} more` : "";

      // Show total nested element count in the header
      lines.push(`## ${index + 1}. ${totalCount} elements: ${elementList}${suffix}`);
      lines.push("");

      lines.push(`**Location:** multi-select`);
      lines.push("");

      lines.push(`**Feedback:** ${annotation.comment}`);
      lines.push("");

      lines.push("---");
      lines.push("");
      return;
    }

    // Single element annotation (original format)
    lines.push(`## ${index + 1}. ${annotation.element}`);
    lines.push("");

    // Comment (always included)
    lines.push(`**Comment:** ${annotation.comment}`);
    lines.push("");

    // Element path (always included)
    lines.push(`**Selector:** \`${annotation.elementPath}\``);
    lines.push("");

    // Position
    lines.push(
      `**Position:** x=${annotation.x.toFixed(1)}%, y=${annotation.y.toFixed(0)}px`,
    );
    lines.push("");

    // Selected text if present
    if (annotation.selectedText) {
      lines.push(`**Selected Text:** "${annotation.selectedText}"`);
      lines.push("");
    }

    // Bounding box for compact and above
    if (annotation.boundingBox) {
      const bb = annotation.boundingBox;
      lines.push(
        `**Bounding Box:** x=${bb.x.toFixed(0)}, y=${bb.y.toFixed(0)}, w=${bb.width.toFixed(0)}, h=${bb.height.toFixed(0)}`,
      );
      lines.push("");
    }

    // Standard level and above
    if (level !== "compact") {
      if (annotation.nearbyText) {
        lines.push(`**Nearby Text:** ${annotation.nearbyText}`);
        lines.push("");
      }

      if (annotation.cssClasses) {
        lines.push(`**CSS Classes:** \`${annotation.cssClasses}\``);
        lines.push("");
      }
    }

    // Detailed level and above
    if (level === "detailed" || level === "forensic") {
      if (annotation.nearbyElements) {
        lines.push(`**Nearby Elements:** ${annotation.nearbyElements}`);
        lines.push("");
      }

      if (annotation.accessibility) {
        lines.push(`**Accessibility:** ${annotation.accessibility}`);
        lines.push("");
      }
    }

    // Forensic level only
    if (level === "forensic") {
      if (annotation.fullPath) {
        lines.push(`**Full Path:** \`${annotation.fullPath}\``);
        lines.push("");
      }

      if (annotation.computedStyles) {
        lines.push("**Computed Styles:**");
        lines.push("```css");
        lines.push(annotation.computedStyles);
        lines.push("```");
        lines.push("");
      }
    }

    lines.push("---");
    lines.push("");
  });

  return lines.join("\n");
}

/**
 * Generate a compact single-line summary for an annotation
 */
export function generateAnnotationSummary(annotation: Annotation): string {
  const parts = [
    `[${annotation.element}]`,
    annotation.comment,
    `(${annotation.elementPath})`,
  ];
  return parts.join(" ");
}
