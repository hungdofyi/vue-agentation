<!--
  Vue Agentation - Main Component

  This is a Vue 3 port of Agentation by Benji Taylor
  Original: https://github.com/benjitaylor/agentation
  License: PolyForm Shield License 1.0.0
-->
<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import type { AgentationProps, Annotation, PendingAnnotation } from "../types";
import AnnotationPopup from "./AnnotationPopup.vue";
import AnnotationMarker from "./AnnotationMarker.vue";
import { useAnnotations } from "../composables/useAnnotations";
import { useElementSelection } from "../composables/useElementSelection";
import { useAnimationPause } from "../composables/useAnimationPause";
import { useTheme } from "../composables/useTheme";
import { generateMarkdown } from "../utils/markdown-output";
import { getCurrentRoutePath } from "../utils/storage";

defineProps<AgentationProps>();

const emit = defineEmits<{
  (e: "annotation-add", annotation: Annotation): void;
  (e: "annotation-delete", annotation: Annotation): void;
  (e: "annotation-update", annotation: Annotation): void;
  (e: "annotations-clear"): void;
  (e: "copy", markdown: string): void;
}>();

// Composables
const {
  annotations,
  pendingAnnotation,
  editingAnnotationId,
  count: annotationCount,
  isEmpty,
  initialize: initAnnotations,
  switchPath,
  add: addAnnotation,
  remove: removeAnnotation,
  update: updateAnnotation,
  clear: clearAnnotations,
  setPending,
  setEditing,
  getById: getAnnotationById,
} = useAnnotations();

const { isPaused, toggle: toggleAnimations } = useAnimationPause();
const { isDark, toggle: toggleTheme } = useTheme();

// Local state
const showPopup = ref(false);
const hoveredMarkerId = ref<string | null>(null);
const copySuccess = ref(false);
const accentColor = "#3b82f6"; // Blue-500

// Computed popup position (to avoid using window in template)
const popupX = computed(() => {
  if (pendingAnnotation.value) {
    return (
      (pendingAnnotation.value.x / 100) *
      (typeof window !== "undefined" ? window.innerWidth : 0)
    );
  } else if (editingAnnotationId.value) {
    // When editing, find the annotation and position popup near it
    const annotation = getAnnotationById(editingAnnotationId.value);
    if (!annotation) return 0;
    return (
      (annotation.x / 100) *
      (typeof window !== "undefined" ? window.innerWidth : 0)
    );
  }
  return 0;
});

const popupY = computed(() => {
  if (pendingAnnotation.value) {
    const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
    return pendingAnnotation.value.isFixed
      ? pendingAnnotation.value.y
      : pendingAnnotation.value.y - scrollY;
  } else if (editingAnnotationId.value) {
    const annotation = getAnnotationById(editingAnnotationId.value);
    if (!annotation) return 0;
    const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
    return annotation.isFixed ? annotation.y : annotation.y - scrollY;
  }
  return 0;
});

// Helper to get current annotation being edited or created
const currentAnnotationData = computed(() => {
  if (pendingAnnotation.value) {
    return {
      element: pendingAnnotation.value.element,
      selectedText: pendingAnnotation.value.selectedText,
      computedStyles: pendingAnnotation.value.computedStyles,
      initialValue: "",
      submitLabel: "Add",
    };
  } else if (editingAnnotationId.value) {
    const annotation = getAnnotationById(editingAnnotationId.value);
    if (annotation) {
      return {
        element: annotation.element,
        selectedText: annotation.selectedText,
        computedStyles: annotation.computedStyles,
        initialValue: annotation.comment,
        submitLabel: "Update",
      };
    }
  }
  return null;
});

// Tooltip position: determines optimal placement based on viewport boundaries
const tooltipPosition = computed(() => {
  if (!highlightBox.value) return { vertical: "top", horizontal: "left" };

  const TOOLTIP_HEIGHT = 32;
  const TOOLTIP_WIDTH_ESTIMATE = 150; // Estimated max tooltip width
  const PADDING = 8;
  const viewportWidth =
    typeof window !== "undefined" ? window.innerWidth : 1000;

  // Check vertical positioning
  const needsBelow = highlightBox.value.top < TOOLTIP_HEIGHT + PADDING;

  // Check horizontal positioning - tooltip extends from left edge of highlight
  // If the element's left + tooltip width exceeds viewport, align to right
  const tooltipWouldOverflowRight =
    highlightBox.value.left + TOOLTIP_WIDTH_ESTIMATE > viewportWidth - PADDING;

  // If element is near left edge and we want right alignment, check if that works
  const tooltipWouldOverflowLeft =
    highlightBox.value.left + highlightBox.value.width <
    TOOLTIP_WIDTH_ESTIMATE + PADDING;

  return {
    vertical: needsBelow ? "bottom" : "top",
    horizontal:
      tooltipWouldOverflowRight && !tooltipWouldOverflowLeft ? "right" : "left",
  };
});

// Element selection
const {
  isActive: isSelecting,
  highlightBox,
  elementInfo,
  toggle: toggleSelection,
} = useElementSelection({
  onSelect: (pending: PendingAnnotation) => {
    setPending(pending);
    setEditing(null);
    showPopup.value = true;
  },
  onHoverChange: () => {
    // Could update tooltip here
  },
});

// Track current route path for detecting navigation
const currentPath = ref(getCurrentRoutePath());
let rafId: number | null = null;

// Route change handler - called when URL changes
function handleRouteChange() {
  const newPath = getCurrentRoutePath();
  if (newPath !== currentPath.value) {
    currentPath.value = newPath;
    switchPath(newPath);
  }
}

// Continuous route check using requestAnimationFrame for instant detection
function checkRouteLoop() {
  handleRouteChange();
  rafId = requestAnimationFrame(checkRouteLoop);
}

// Initialize annotations on mount and set up route detection
onMounted(() => {
  if (typeof window !== "undefined") {
    const path = getCurrentRoutePath();
    currentPath.value = path;
    initAnnotations(path);

    // Use requestAnimationFrame for instant route change detection (~16ms)
    rafId = requestAnimationFrame(checkRouteLoop);
  }
});

// Clean up on unmount
onUnmounted(() => {
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
});

// Handlers
function handlePopupSubmit(comment: string) {
  if (pendingAnnotation.value) {
    const annotation = addAnnotation(pendingAnnotation.value, comment);
    showPopup.value = false;
    emit("annotation-add", annotation);
  } else if (editingAnnotationId.value) {
    const updated = updateAnnotation(editingAnnotationId.value, comment);
    showPopup.value = false;
    setEditing(null);
    if (updated) {
      emit("annotation-update", updated);
    }
  }
}

function handlePopupCancel() {
  showPopup.value = false;
  setPending(null);
  setEditing(null);
}

function handleMarkerDelete(annotation: Annotation) {
  const removed = removeAnnotation(annotation.id);
  if (removed) {
    emit("annotation-delete", removed);
  }
}

function handleMarkerEdit(annotation: Annotation) {
  setPending(null);
  setEditing(annotation.id);
  showPopup.value = true;
}

function handleClearAll() {
  if (annotations.value.length === 0) return;

  if (confirm("Clear all annotations?")) {
    clearAnnotations();
    emit("annotations-clear");
  }
}

async function handleCopy() {
  const markdown = generateMarkdown([...annotations.value]);

  try {
    await navigator.clipboard.writeText(markdown);
    copySuccess.value = true;
    setTimeout(() => {
      copySuccess.value = false;
    }, 2000);
  } catch {
    // Fallback: log to console
    console.log(markdown);
  }

  emit("copy", markdown);
}

function handleMarkerClick(annotation: Annotation) {
  // Marker click action - currently does nothing, but could focus the annotation
  console.log("Marker clicked:", annotation);
}
</script>

<template>
  <Teleport to="body">
    <!-- Floating Toolbar -->
    <div
      class="agentation-toolbar"
      :class="isDark ? 'agentation-toolbar--dark' : ''"
      data-agentation-ignore
      role="toolbar"
      aria-label="Agentation annotation tools"
    >
      <!-- Element Selection Toggle -->
      <button
        type="button"
        class="agentation-toolbar__button"
        :class="isSelecting && 'agentation-toolbar__button--active'"
        :aria-pressed="isSelecting"
        title="Select element to annotate"
        @click="toggleSelection"
      >
        <svg
          class="agentation-toolbar__icon"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M4 4l7.07 17 2.51-7.39L21 11.07 4 4zm9.33 8.33l-1.62 4.79L6.27 6.27l10.85 5.06-3.79 1z"
          />
        </svg>
      </button>

      <!-- Animation Pause Toggle -->
      <button
        type="button"
        class="agentation-toolbar__button"
        :class="isPaused && 'agentation-toolbar__button--paused'"
        :aria-pressed="isPaused"
        :title="isPaused ? 'Resume animations' : 'Pause animations'"
        @click="toggleAnimations"
      >
        <svg
          v-if="isPaused"
          class="agentation-toolbar__icon"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
        <svg
          v-else
          class="agentation-toolbar__icon"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
        </svg>
      </button>

      <!-- Divider -->
      <div class="agentation-toolbar__divider" />

      <!-- Copy to Clipboard -->
      <button
        type="button"
        class="agentation-toolbar__button"
        :class="copySuccess && 'agentation-toolbar__button--success'"
        :disabled="isEmpty"
        :title="`Copy ${annotationCount} annotation(s) as markdown`"
        @click="handleCopy"
      >
        <svg
          v-if="copySuccess"
          class="agentation-toolbar__icon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <svg
          v-else
          class="agentation-toolbar__icon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
        <!-- Badge showing count -->
        <span v-if="annotationCount > 0" class="agentation-toolbar__badge">
          {{ annotationCount }}
        </span>
      </button>

      <!-- Clear All -->
      <button
        type="button"
        class="agentation-toolbar__button"
        :disabled="isEmpty"
        title="Clear all annotations"
        @click="handleClearAll"
      >
        <svg
          class="agentation-toolbar__icon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>

      <!-- Divider -->
      <div class="agentation-toolbar__divider" />

      <!-- Theme Toggle -->
      <button
        type="button"
        class="agentation-toolbar__button"
        :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        @click="toggleTheme"
      >
        <svg
          v-if="isDark"
          class="agentation-toolbar__icon"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 3a9 9 0 109 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 01-4.4 2.26 5.403 5.403 0 01-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"
          />
        </svg>
        <svg
          v-else
          class="agentation-toolbar__icon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      </button>
    </div>

    <!-- Element Highlight Overlay -->
    <div
      v-if="isSelecting && highlightBox"
      class="agentation-highlight"
      :style="{
        left: `${highlightBox.left}px`,
        top: `${highlightBox.top}px`,
        width: `${highlightBox.width}px`,
        height: `${highlightBox.height}px`,
      }"
      data-agentation-ignore
    >
      <!-- Element name tooltip with edge detection -->
      <div
        v-if="elementInfo"
        class="agentation-highlight__tooltip"
        :class="`agentation-highlight__tooltip--${tooltipPosition.vertical}-${tooltipPosition.horizontal}`"
      >
        {{ elementInfo.name }}
      </div>
    </div>

    <!-- Annotation Markers Container (for scrolling elements) -->
    <div
      style="position: absolute; inset: 0; z-index: 99998; pointer-events: none"
      data-agentation-ignore
    >
      <AnnotationMarker
        v-for="(annotation, index) in annotations.filter((a) => !a.isFixed)"
        :key="annotation.id"
        :annotation="annotation"
        :index="index"
        :dark="isDark"
        :accent-color="accentColor"
        :is-hovered="hoveredMarkerId === annotation.id"
        style="pointer-events: auto"
        @click="handleMarkerClick"
        @edit="handleMarkerEdit"
        @delete="handleMarkerDelete"
        @mouseenter="hoveredMarkerId = annotation.id"
        @mouseleave="hoveredMarkerId = null"
      />
    </div>

    <!-- Fixed Annotation Markers (for fixed/sticky elements) -->
    <AnnotationMarker
      v-for="annotation in annotations.filter((a) => a.isFixed)"
      :key="annotation.id"
      :annotation="annotation"
      :index="annotations.findIndex((a) => a.id === annotation.id)"
      :dark="isDark"
      :accent-color="accentColor"
      :is-hovered="hoveredMarkerId === annotation.id"
      @click="handleMarkerClick"
      @edit="handleMarkerEdit"
      @delete="handleMarkerDelete"
      @mouseenter="hoveredMarkerId = annotation.id"
      @mouseleave="hoveredMarkerId = null"
    />

    <!-- Annotation Popup -->
    <AnnotationPopup
      v-if="showPopup && currentAnnotationData"
      :element="currentAnnotationData.element"
      :x="popupX"
      :y="popupY"
      :selected-text="currentAnnotationData.selectedText"
      :computed-styles="currentAnnotationData.computedStyles"
      :initial-value="currentAnnotationData.initialValue"
      :submit-label="currentAnnotationData.submitLabel"
      :dark="isDark"
      :accent-color="accentColor"
      @submit="handlePopupSubmit"
      @cancel="handlePopupCancel"
    />
  </Teleport>
</template>
