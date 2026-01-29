import { Annotation } from '../types';
interface Props {
    /** The annotation data */
    annotation: Annotation;
    /** The index number to display */
    index: number;
    /** Dark mode */
    dark?: boolean;
    /** Accent color (hex) - used for single selection, ignored for group */
    accentColor?: string;
    /** Whether the marker is being hovered */
    isHovered?: boolean;
}
declare const _default: import('vue').DefineComponent<Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    click: (annotation: Annotation) => any;
    mouseenter: (annotation: Annotation) => any;
    mouseleave: (annotation: Annotation) => any;
    delete: (annotation: Annotation) => any;
    edit: (annotation: Annotation) => any;
}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{
    onClick?: ((annotation: Annotation) => any) | undefined;
    onMouseenter?: ((annotation: Annotation) => any) | undefined;
    onMouseleave?: ((annotation: Annotation) => any) | undefined;
    onDelete?: ((annotation: Annotation) => any) | undefined;
    onEdit?: ((annotation: Annotation) => any) | undefined;
}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLDivElement>;
export default _default;
