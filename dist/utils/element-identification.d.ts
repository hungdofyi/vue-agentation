/**
 * Vue Agentation - Element Identification Utilities
 *
 * This is a Vue 3 port of Agentation by Benji Taylor
 * Original: https://github.com/benjitaylor/agentation
 * License: PolyForm Shield License 1.0.0
 */
/**
 * Gets a readable CSS selector path for an element (e.g., 'article > section > p')
 */
export declare function getElementPath(target: Element, maxDepth?: number): string;
/**
 * Gets a complete DOM ancestry path for forensic analysis
 */
export declare function getFullElementPath(target: Element): string;
/**
 * Returns a human-readable name for an element
 */
export declare function identifyElement(target: Element): {
    name: string;
    path: string;
};
/**
 * Simplified identifier for animation feedback (less verbose)
 */
export declare function identifyAnimationElement(target: Element): string;
/**
 * Collects text content from the target element and adjacent siblings
 */
export declare function getNearbyText(element: Element): string;
/**
 * Provides structural context by identifying sibling elements and parent
 */
export declare function getNearbyElements(element: Element): string;
/**
 * Extracts and cleans CSS class names, removing module hashes
 */
export declare function getElementClasses(target: Element): string;
/**
 * Returns relevant CSS properties based on element type
 */
export declare function getDetailedComputedStyles(target: Element): string;
/**
 * Provides comprehensive CSS properties for forensic analysis
 */
export declare function getForensicComputedStyles(target: Element): string;
/**
 * Extracts ARIA attributes, roles, and focusability data
 */
export declare function getAccessibilityInfo(target: Element): string;
/**
 * Check if an element has fixed or sticky positioning
 */
export declare function isElementFixed(element: Element): boolean;
