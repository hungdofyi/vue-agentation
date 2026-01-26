/**
 * Vue Agentation - Animation Pause Composable
 *
 * This is a Vue 3 port of Agentation by Benji Taylor
 * Original: https://github.com/benjitaylor/agentation
 * License: PolyForm Shield License 1.0.0
 */
export declare function useAnimationPause(): {
    isPaused: Readonly<import('vue').Ref<boolean, boolean>>;
    pause: () => void;
    resume: () => void;
    toggle: () => void;
};
