/**
 * Vue Agentation - Animation Pause Composable
 *
 * This is a Vue 3 port of Agentation by Benji Taylor
 * Original: https://github.com/benjitaylor/agentation
 * License: PolyForm Shield License 1.0.0
 */

import { ref, readonly, onUnmounted } from "vue";

const STYLE_ID = "agentation-animation-freeze";
const CSS_VARIABLE = "--agentation-animation-state";

export function useAnimationPause() {
  const isPaused = ref(false);
  let styleElement: HTMLStyleElement | null = null;

  /**
   * Inject CSS to pause all animations
   */
  function pause() {
    if (isPaused.value) return;

    // Set CSS variable on root
    document.documentElement.style.setProperty(CSS_VARIABLE, "paused");

    // Create style element if not exists
    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = STYLE_ID;
      styleElement.textContent = `
        *,
        *::before,
        *::after {
          animation-play-state: var(${CSS_VARIABLE}, running) !important;
        }
      `;
      document.head.appendChild(styleElement);
    }

    // Pause all videos
    document.querySelectorAll("video").forEach((video) => {
      if (!video.paused) {
        video.dataset.agentationWasPlaying = "true";
        video.pause();
      }
    });

    isPaused.value = true;
  }

  /**
   * Remove CSS pause and resume animations
   */
  function resume() {
    if (!isPaused.value) return;

    // Remove CSS variable
    document.documentElement.style.removeProperty(CSS_VARIABLE);

    // Remove style element
    if (styleElement && styleElement.parentNode) {
      styleElement.parentNode.removeChild(styleElement);
      styleElement = null;
    }

    // Resume videos that were playing
    document
      .querySelectorAll("video[data-agentation-was-playing]")
      .forEach((video) => {
        delete (video as HTMLVideoElement).dataset.agentationWasPlaying;
        (video as HTMLVideoElement).play().catch(() => {
          // Ignore autoplay errors
        });
      });

    isPaused.value = false;
  }

  /**
   * Toggle animation pause state
   */
  function toggle() {
    if (isPaused.value) {
      resume();
    } else {
      pause();
    }
  }

  // Cleanup on unmount
  onUnmounted(() => {
    if (isPaused.value) {
      resume();
    }
  });

  return {
    isPaused: readonly(isPaused),
    pause,
    resume,
    toggle,
  };
}
