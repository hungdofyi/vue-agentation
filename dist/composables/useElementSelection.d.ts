import { PendingAnnotation } from '../types';
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
    isActive: Readonly<import('vue').Ref<boolean>>;
    hoveredElement: Readonly<import('vue').Ref<HTMLElement | null>>;
    highlightBox: Readonly<import('vue').Ref<DOMRect | null>>;
    elementInfo: Readonly<import('vue').Ref<ElementInfo | null>>;
    start: () => void;
    stop: () => void;
    toggle: () => void;
}
export declare function useElementSelection(callbacks: SelectionCallbacks): UseElementSelectionReturn;
