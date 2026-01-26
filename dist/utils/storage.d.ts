import { Annotation, AgentationSettings } from '../types';
/**
 * Get storage key for a specific pathname
 */
export declare function getStorageKey(pathname: string): string;
/**
 * Get current route path, supporting both hash routing and history routing
 * - Hash routing: /#/button -> /button
 * - History routing: /button -> /button
 */
export declare function getCurrentRoutePath(): string;
/**
 * Load annotations from localStorage with automatic expiration
 */
export declare function loadAnnotations(pathname: string): Annotation[];
/**
 * Save annotations to localStorage
 */
export declare function saveAnnotations(pathname: string, annotations: Annotation[]): void;
/**
 * Clear annotations from localStorage
 */
export declare function clearAnnotations(pathname: string): void;
/**
 * Load settings from localStorage
 */
export declare function loadSettings(): AgentationSettings | null;
/**
 * Save settings to localStorage
 */
export declare function saveSettings(settings: AgentationSettings): void;
/**
 * Load theme preference from localStorage
 */
export declare function loadTheme(): "light" | "dark" | null;
/**
 * Save theme preference to localStorage
 */
export declare function saveTheme(theme: "light" | "dark"): void;
