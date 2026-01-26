/**
 * Vue Agentation - Theme Composable
 *
 * This is a Vue 3 port of Agentation by Benji Taylor
 * Original: https://github.com/benjitaylor/agentation
 * License: PolyForm Shield License 1.0.0
 */
export declare function useTheme(): {
    isDark: Readonly<import('vue').Ref<boolean, boolean>>;
    toggle: () => void;
    set: (dark: boolean) => void;
    initialize: () => void;
};
