import { PendingAnnotation, GroupElement } from '../types';
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
    isActive: Readonly<import('vue').Ref<boolean>>;
    isMarqueeMode: Readonly<import('vue').Ref<boolean>>;
    hoveredElement: Readonly<import('vue').Ref<HTMLElement | null>>;
    highlightBox: Readonly<import('vue').Ref<DOMRect | null>>;
    elementInfo: Readonly<import('vue').Ref<ElementInfo | null>>;
    cursorPosition: Readonly<import('vue').Ref<CursorPosition | null>>;
    marqueeBox: Readonly<import('vue').Ref<MarqueeBox | null>>;
    selectedElements: Readonly<import('vue').Ref<readonly GroupElement[]>>;
    start: () => void;
    stop: () => void;
    toggle: () => void;
}
export declare function useElementSelection(callbacks: SelectionCallbacks): UseElementSelectionReturn;
