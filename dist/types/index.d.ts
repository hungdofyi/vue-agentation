/**
 * Vue Agentation - Type Definitions
 *
 * This is a Vue 3 port of Agentation by Benji Taylor
 * Original: https://github.com/benjitaylor/agentation
 * License: PolyForm Shield License 1.0.0
 */
export interface GroupElement {
    readonly name: string;
    readonly path: string;
}
export interface Annotation {
    id: string;
    x: number;
    y: number;
    comment: string;
    element: string;
    elementPath: string;
    timestamp: number;
    selectedText?: string;
    boundingBox?: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    nearbyText?: string;
    cssClasses?: string;
    nearbyElements?: string;
    computedStyles?: string;
    fullPath?: string;
    accessibility?: string;
    isMultiSelect?: boolean;
    isFixed?: boolean;
    elements?: readonly GroupElement[];
    groupBoundingBox?: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    totalElementCount?: number;
}
export interface SelectionTheme {
    primary: string;
    primaryHover: string;
    markerShape: "circle" | "diamond";
    borderStyle: "solid" | "dashed";
}
export declare const selectionThemes: Record<"single" | "group", SelectionTheme>;
export interface AgentationProps {
}
export interface AgentationSettings {
    outputDetail: OutputDetailLevel;
    autoClearAfterCopy: boolean;
    annotationColor: string;
    blockInteractions: boolean;
}
export type OutputDetailLevel = "compact" | "standard" | "detailed" | "forensic";
export type AgentationMode = "idle" | "selecting" | "text-selecting";
export interface PendingAnnotation {
    x: number;
    y: number;
    element: string;
    elementPath: string;
    selectedText?: string;
    boundingBox?: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    nearbyText?: string;
    cssClasses?: string;
    nearbyElements?: string;
    computedStyles?: string;
    fullPath?: string;
    accessibility?: string;
    isFixed?: boolean;
    isMultiSelect?: boolean;
    elements?: readonly GroupElement[];
    groupBoundingBox?: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    totalElementCount?: number;
}
