import { AgentationProps, Annotation } from '../types';
declare const _default: import('vue').DefineComponent<AgentationProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    copy: (markdown: string) => any;
    "annotation-add": (annotation: Annotation) => any;
    "annotation-delete": (annotation: Annotation) => any;
    "annotation-update": (annotation: Annotation) => any;
    "annotations-clear": () => any;
}, string, import('vue').PublicProps, Readonly<AgentationProps> & Readonly<{
    onCopy?: ((markdown: string) => any) | undefined;
    "onAnnotation-add"?: ((annotation: Annotation) => any) | undefined;
    "onAnnotation-delete"?: ((annotation: Annotation) => any) | undefined;
    "onAnnotation-update"?: ((annotation: Annotation) => any) | undefined;
    "onAnnotations-clear"?: (() => any) | undefined;
}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
