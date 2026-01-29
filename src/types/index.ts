/**
 * Vue Agentation - Type Definitions
 *
 * This is a Vue 3 port of Agentation by Benji Taylor
 * Original: https://github.com/benjitaylor/agentation
 * License: PolyForm Shield License 1.0.0
 */

export interface GroupElement {
  readonly name: string; // e.g., 'link "Overview"'
  readonly path: string; // CSS selector
}

export interface Annotation {
  id: string;
  x: number; // % of viewport width
  y: number; // px from top of document (absolute) OR viewport (if isFixed)
  comment: string;
  element: string;
  elementPath: string;
  timestamp: number;
  selectedText?: string;
  boundingBox?: { x: number; y: number; width: number; height: number };
  nearbyText?: string;
  cssClasses?: string;
  nearbyElements?: string;
  computedStyles?: string;
  fullPath?: string;
  accessibility?: string;
  isMultiSelect?: boolean; // true if created via drag selection
  isFixed?: boolean; // true if element has fixed/sticky positioning (marker stays fixed)
  // Group selection fields
  elements?: readonly GroupElement[]; // all captured elements in group selection
  groupBoundingBox?: { x: number; y: number; width: number; height: number }; // marquee area
  totalElementCount?: number; // total nested elements within selection (for annotation summary)
}

export interface SelectionTheme {
  primary: string;
  primaryHover: string;
  markerShape: "circle" | "diamond";
  borderStyle: "solid" | "dashed";
}

export const selectionThemes: Record<"single" | "group", SelectionTheme> = {
  single: {
    primary: "#3b82f6", // blue-500
    primaryHover: "#2563eb", // blue-600
    markerShape: "circle",
    borderStyle: "solid",
  },
  group: {
    primary: "#f97316", // orange-500
    primaryHover: "#ea580c", // orange-600
    markerShape: "diamond",
    borderStyle: "dashed",
  },
};

export interface AgentationProps {
  // No props required for now as demo props and copyToClipboard were removed
}

export interface AgentationSettings {
  outputDetail: OutputDetailLevel;
  autoClearAfterCopy: boolean;
  annotationColor: string;
  blockInteractions: boolean;
}

export type OutputDetailLevel =
  | "compact"
  | "standard"
  | "detailed"
  | "forensic";

export type AgentationMode = "idle" | "selecting" | "text-selecting";

export interface PendingAnnotation {
  x: number;
  y: number;
  element: string;
  elementPath: string;
  selectedText?: string;
  boundingBox?: { x: number; y: number; width: number; height: number };
  nearbyText?: string;
  cssClasses?: string;
  nearbyElements?: string;
  computedStyles?: string;
  fullPath?: string;
  accessibility?: string;
  isFixed?: boolean;
  // Group selection fields
  isMultiSelect?: boolean;
  elements?: readonly GroupElement[];
  groupBoundingBox?: { x: number; y: number; width: number; height: number };
  totalElementCount?: number; // total nested elements within selection (for annotation summary)
}
