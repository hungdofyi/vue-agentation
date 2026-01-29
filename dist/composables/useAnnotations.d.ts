import { Annotation, PendingAnnotation } from '../types';
/**
 * Composable for managing annotations
 * Uses a singleton pattern to share state across components
 */
export declare function useAnnotations(): {
    annotations: Readonly<import('vue').Ref<readonly {
        readonly id: string;
        readonly x: number;
        readonly y: number;
        readonly comment: string;
        readonly element: string;
        readonly elementPath: string;
        readonly timestamp: number;
        readonly selectedText?: string | undefined;
        readonly boundingBox?: {
            readonly x: number;
            readonly y: number;
            readonly width: number;
            readonly height: number;
        } | undefined;
        readonly nearbyText?: string | undefined;
        readonly cssClasses?: string | undefined;
        readonly nearbyElements?: string | undefined;
        readonly computedStyles?: string | undefined;
        readonly fullPath?: string | undefined;
        readonly accessibility?: string | undefined;
        readonly isMultiSelect?: boolean | undefined;
        readonly isFixed?: boolean | undefined;
        readonly elements?: readonly {
            readonly name: string;
            readonly path: string;
        }[] | undefined;
        readonly groupBoundingBox?: {
            readonly x: number;
            readonly y: number;
            readonly width: number;
            readonly height: number;
        } | undefined;
        readonly totalElementCount?: number | undefined;
    }[], readonly {
        readonly id: string;
        readonly x: number;
        readonly y: number;
        readonly comment: string;
        readonly element: string;
        readonly elementPath: string;
        readonly timestamp: number;
        readonly selectedText?: string | undefined;
        readonly boundingBox?: {
            readonly x: number;
            readonly y: number;
            readonly width: number;
            readonly height: number;
        } | undefined;
        readonly nearbyText?: string | undefined;
        readonly cssClasses?: string | undefined;
        readonly nearbyElements?: string | undefined;
        readonly computedStyles?: string | undefined;
        readonly fullPath?: string | undefined;
        readonly accessibility?: string | undefined;
        readonly isMultiSelect?: boolean | undefined;
        readonly isFixed?: boolean | undefined;
        readonly elements?: readonly {
            readonly name: string;
            readonly path: string;
        }[] | undefined;
        readonly groupBoundingBox?: {
            readonly x: number;
            readonly y: number;
            readonly width: number;
            readonly height: number;
        } | undefined;
        readonly totalElementCount?: number | undefined;
    }[]>>;
    pendingAnnotation: Readonly<import('vue').Ref<{
        readonly x: number;
        readonly y: number;
        readonly element: string;
        readonly elementPath: string;
        readonly selectedText?: string | undefined;
        readonly boundingBox?: {
            readonly x: number;
            readonly y: number;
            readonly width: number;
            readonly height: number;
        } | undefined;
        readonly nearbyText?: string | undefined;
        readonly cssClasses?: string | undefined;
        readonly nearbyElements?: string | undefined;
        readonly computedStyles?: string | undefined;
        readonly fullPath?: string | undefined;
        readonly accessibility?: string | undefined;
        readonly isFixed?: boolean | undefined;
        readonly isMultiSelect?: boolean | undefined;
        readonly elements?: readonly {
            readonly name: string;
            readonly path: string;
        }[] | undefined;
        readonly groupBoundingBox?: {
            readonly x: number;
            readonly y: number;
            readonly width: number;
            readonly height: number;
        } | undefined;
        readonly totalElementCount?: number | undefined;
    } | null, {
        readonly x: number;
        readonly y: number;
        readonly element: string;
        readonly elementPath: string;
        readonly selectedText?: string | undefined;
        readonly boundingBox?: {
            readonly x: number;
            readonly y: number;
            readonly width: number;
            readonly height: number;
        } | undefined;
        readonly nearbyText?: string | undefined;
        readonly cssClasses?: string | undefined;
        readonly nearbyElements?: string | undefined;
        readonly computedStyles?: string | undefined;
        readonly fullPath?: string | undefined;
        readonly accessibility?: string | undefined;
        readonly isFixed?: boolean | undefined;
        readonly isMultiSelect?: boolean | undefined;
        readonly elements?: readonly {
            readonly name: string;
            readonly path: string;
        }[] | undefined;
        readonly groupBoundingBox?: {
            readonly x: number;
            readonly y: number;
            readonly width: number;
            readonly height: number;
        } | undefined;
        readonly totalElementCount?: number | undefined;
    } | null>>;
    editingAnnotationId: Readonly<import('vue').Ref<string | null, string | null>>;
    count: import('vue').ComputedRef<number>;
    isEmpty: import('vue').ComputedRef<boolean>;
    initialize: (path: string) => void;
    switchPath: (newPath: string) => void;
    add: (pending: PendingAnnotation, comment: string) => Annotation;
    remove: (id: string) => Annotation | null;
    update: (id: string, comment: string) => Annotation | null;
    clear: () => void;
    setPending: (pending: PendingAnnotation | null) => void;
    setEditing: (id: string | null) => void;
    getById: (id: string) => Annotation | undefined;
    getIndex: (id: string) => number;
};
/**
 * Reset the annotations instance (for testing)
 */
export declare function resetAnnotations(): void;
