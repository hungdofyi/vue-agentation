interface Props {
    /** Element name to display in header */
    element: string;
    /** Position X (viewport pixels) */
    x: number;
    /** Position Y (viewport pixels) */
    y: number;
    /** Selected text preview */
    selectedText?: string;
    /** Initial comment value (for edit mode) */
    initialValue?: string;
    /** Submit button label */
    submitLabel?: string;
    /** Accent color (hex) */
    accentColor?: string;
    /** Dark mode */
    dark?: boolean;
    /** Computed styles to show (collapsible) */
    computedStyles?: string;
}
declare function shake(): void;
declare const _default: import('vue').DefineComponent<Props, {
    shake: typeof shake;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    submit: (comment: string) => any;
    cancel: () => any;
}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{
    onSubmit?: ((comment: string) => any) | undefined;
    onCancel?: (() => any) | undefined;
}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {
    textareaRef: HTMLTextAreaElement;
}, HTMLDivElement>;
export default _default;
