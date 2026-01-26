/**
 * Vue Agentation - Storage Utilities
 *
 * This is a Vue 3 port of Agentation by Benji Taylor
 * Original: https://github.com/benjitaylor/agentation
 * License: PolyForm Shield License 1.0.0
 */

import type { Annotation, AgentationSettings } from "../types";

const STORAGE_PREFIX = "agentation-annotations-";
const SETTINGS_KEY = "agentation-settings";
const DEFAULT_RETENTION_DAYS = 7;

/**
 * Get storage key for a specific pathname
 */
export function getStorageKey(pathname: string): string {
  return `${STORAGE_PREFIX}${pathname}`;
}

/**
 * Get current route path, supporting both hash routing and history routing
 * - Hash routing: /#/button -> /button
 * - History routing: /button -> /button
 */
export function getCurrentRoutePath(): string {
  if (typeof window === "undefined") return "/";
  const hash = window.location.hash;
  // Support hash routing (e.g., /#/button)
  if (hash && hash.startsWith("#/")) {
    return hash.slice(1); // Remove leading #, keep /button
  }
  return window.location.pathname;
}

/**
 * Load annotations from localStorage with automatic expiration
 */
export function loadAnnotations(pathname: string): Annotation[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(getStorageKey(pathname));
    if (!stored) return [];
    const data = JSON.parse(stored);
    const cutoff = Date.now() - DEFAULT_RETENTION_DAYS * 24 * 60 * 60 * 1000;
    return data.filter(
      (a: { timestamp?: number }) => !a.timestamp || a.timestamp > cutoff,
    );
  } catch {
    return [];
  }
}

/**
 * Save annotations to localStorage
 */
export function saveAnnotations(
  pathname: string,
  annotations: Annotation[],
): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(getStorageKey(pathname), JSON.stringify(annotations));
  } catch {
    // localStorage might be full or disabled
  }
}

/**
 * Clear annotations from localStorage
 */
export function clearAnnotations(pathname: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(getStorageKey(pathname));
  } catch {
    // ignore
  }
}

/**
 * Load settings from localStorage
 */
export function loadSettings(): AgentationSettings | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (!stored) return null;
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

/**
 * Save settings to localStorage
 */
export function saveSettings(settings: AgentationSettings): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    // ignore
  }
}

/**
 * Load theme preference from localStorage
 */
export function loadTheme(): "light" | "dark" | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem("agentation-theme");
    if (stored === "light" || stored === "dark") {
      return stored;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Save theme preference to localStorage
 */
export function saveTheme(theme: "light" | "dark"): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("agentation-theme", theme);
  } catch {
    // ignore
  }
}
