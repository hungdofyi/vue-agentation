/**
 * Vue Agentation - Type Definitions
 *
 * This is a Vue 3 port of Agentation by Benji Taylor
 * Original: https://github.com/benjitaylor/agentation
 * License: PolyForm Shield License 1.0.0
 */

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
}

export interface AgentationProps {
  /** Demo annotations to display on mount */
  demoAnnotations?: DemoAnnotation[];
  /** Delay before demo annotations appear (ms) */
  demoDelay?: number;
  /** Enable demo mode with pre-populated annotations */
  enableDemoMode?: boolean;
  /** Whether to copy markdown to clipboard on copy action */
  copyToClipboard?: boolean;
  /** Callback when annotation is added */
  onAnnotationAdd?: (annotation: Annotation) => void;
  /** Callback when annotation is deleted */
  onAnnotationDelete?: (annotation: Annotation) => void;
  /** Callback when annotation is updated */
  onAnnotationUpdate?: (annotation: Annotation) => void;
  /** Callback when all annotations are cleared */
  onAnnotationsClear?: () => void;
  /** Callback when markdown is copied */
  onCopy?: (markdown: string) => void;
}

export interface DemoAnnotation {
  x: number;
  y: number;
  comment: string;
  element: string;
  elementPath: string;
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
}
