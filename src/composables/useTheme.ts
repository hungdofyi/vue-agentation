/**
 * Vue Agentation - Theme Composable
 *
 * This is a Vue 3 port of Agentation by Benji Taylor
 * Original: https://github.com/benjitaylor/agentation
 * License: PolyForm Shield License 1.0.0
 */

import { ref, readonly, onMounted } from "vue";
import { loadTheme, saveTheme } from "../utils/storage";

export function useTheme() {
  const isDark = ref(false);

  /**
   * Initialize theme from localStorage or system preference
   */
  function initialize() {
    const stored = loadTheme();
    if (stored) {
      isDark.value = stored === "dark";
    } else if (typeof window !== "undefined") {
      // Check system preference
      isDark.value = window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
  }

  /**
   * Toggle between light and dark themes
   */
  function toggle() {
    isDark.value = !isDark.value;
    saveTheme(isDark.value ? "dark" : "light");
  }

  /**
   * Set theme explicitly
   */
  function set(dark: boolean) {
    isDark.value = dark;
    saveTheme(dark ? "dark" : "light");
  }

  // Initialize on mount
  onMounted(() => {
    initialize();
  });

  return {
    isDark: readonly(isDark),
    toggle,
    set,
    initialize,
  };
}
