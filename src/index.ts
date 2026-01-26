/**
 * Vue Agentation - Main Entry Point
 *
 * This is a Vue 3 port of Agentation by Benji Taylor
 * Original: https://github.com/benjitaylor/agentation
 * License: PolyForm Shield License 1.0.0
 */

// CSS
import "./styles/index.css";

// Components
export { default as Agentation } from "./components/Agentation.vue";
export { default as AnnotationMarker } from "./components/AnnotationMarker.vue";
export { default as AnnotationPopup } from "./components/AnnotationPopup.vue";

// Composables
export * from "./composables";

// Utilities
export * from "./utils";

// Types
export * from "./types";
