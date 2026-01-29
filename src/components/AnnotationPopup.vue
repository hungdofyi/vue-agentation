<!--
  Vue Agentation - Annotation Popup Component

  This is a Vue 3 port of Agentation by Benji Taylor
  Original: https://github.com/benjitaylor/agentation
  License: PolyForm Shield License 1.0.0
-->
<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from "vue";
import { selectionThemes } from "../types";

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
  /** Whether this is a group/multi-select annotation */
  isMultiSelect?: boolean;
}

const {
  element,
  x,
  y,
  selectedText,
  initialValue = "",
  submitLabel = "Add",
  accentColor = "#3b82f6",
  dark = false,
  computedStyles,
  isMultiSelect = false,
} = defineProps<Props>();

// Get the appropriate color based on selection type
const themeColor = computed(() => {
  return isMultiSelect ? selectionThemes.group.primary : accentColor;
});

const emit = defineEmits<{
  submit: [comment: string];
  cancel: [];
}>();

const comment = ref(initialValue);
const textareaRef = ref<HTMLTextAreaElement | null>(null);
const isShaking = ref(false);
const isStylesExpanded = ref(false);
const animState = ref<"initial" | "enter" | "entered" | "exit">("initial");

// Calculate popup position to stay within viewport
const popupStyle = computed(() => {
  const padding = 16;
  const popupWidth = 320;
  const popupHeight = 200;

  let left = x;
  let top = y + 20; // Offset below click point

  // Keep within viewport horizontally
  if (typeof window !== "undefined") {
    if (left + popupWidth > window.innerWidth - padding) {
      left = window.innerWidth - popupWidth - padding;
    }
    if (left < padding) {
      left = padding;
    }

    // Keep within viewport vertically
    if (top + popupHeight > window.innerHeight - padding) {
      top = y - popupHeight - 10; // Show above click point
    }
    if (top < padding) {
      top = padding;
    }
  }

  return {
    left: `${left}px`,
    top: `${top}px`,
  };
});

function handleSubmit() {
  const trimmed = comment.value.trim();
  if (!trimmed) {
    shake();
    return;
  }
  emit("submit", trimmed);
}

function handleCancel() {
  animState.value = "exit";
  setTimeout(() => {
    emit("cancel");
  }, 150);
}

function shake() {
  isShaking.value = true;
  setTimeout(() => {
    isShaking.value = false;
  }, 500);
}

function handleKeyDown(event: KeyboardEvent) {
  if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
    event.preventDefault();
    handleSubmit();
  } else if (event.key === "Escape") {
    event.preventDefault();
    handleCancel();
  }
}

// Focus textarea on mount
onMounted(() => {
  animState.value = "enter";
  nextTick(() => {
    animState.value = "entered";
    textareaRef.value?.focus();
  });
});

// Global escape key handler
function handleGlobalKeyDown(event: KeyboardEvent) {
  if (event.key === "Escape") {
    handleCancel();
  }
}

onMounted(() => {
  document.addEventListener("keydown", handleGlobalKeyDown);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleGlobalKeyDown);
});

// Expose shake method for parent
defineExpose({ shake });
</script>

<template>
  <div
    class="agentation-popup"
    :class="[
      dark ? 'agentation-popup--dark' : '',
      isShaking && 'agentation-animate-shake',
      animState === 'initial' && 'agentation-popup--entering',
      animState === 'enter' && 'agentation-popup--entering',
      animState === 'entered' && 'agentation-popup--entered',
      animState === 'exit' && 'agentation-popup--exiting',
    ]"
    :style="popupStyle"
    data-agentation-ignore
    role="dialog"
    aria-modal="true"
    :aria-label="`Add annotation for ${element}`"
  >
    <!-- Header -->
    <div class="agentation-popup__header">
      <div class="agentation-popup__header-content">
        <div
          class="agentation-popup__header-dot"
          :class="isMultiSelect && 'agentation-popup__header-dot--diamond'"
          :style="{ backgroundColor: themeColor }"
        />
        <span class="agentation-popup__header-title">
          {{ element }}
        </span>
      </div>
      <p v-if="selectedText" class="agentation-popup__header-selected">
        "{{ selectedText }}"
      </p>
    </div>

    <!-- Body -->
    <div class="agentation-popup__body">
      <textarea
        ref="textareaRef"
        v-model="comment"
        class="agentation-popup__textarea"
        placeholder="Add your comment..."
        @keydown="handleKeyDown"
      />

      <!-- Computed Styles (collapsible) -->
      <div v-if="computedStyles" style="margin-top: 0.5rem;">
        <button
          type="button"
          class="agentation-popup__styles-toggle"
          @click="isStylesExpanded = !isStylesExpanded"
        >
          <svg
            class="agentation-popup__styles-icon"
            :class="isStylesExpanded && 'agentation-popup__styles-icon--open'"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
          Computed styles
        </button>
        <pre
          v-if="isStylesExpanded"
          class="agentation-popup__styles-pre"
        >{{ computedStyles }}</pre>
      </div>
    </div>

    <!-- Footer -->
    <div class="agentation-popup__footer">
      <span class="agentation-popup__shortcut">
        <kbd class="agentation-popup__kbd">⌘</kbd>
        +
        <kbd class="agentation-popup__kbd">Enter</kbd>
        to submit
      </span>
      <div class="agentation-popup__actions">
        <button
          type="button"
          class="agentation-popup__btn agentation-popup__btn--cancel"
          @click="handleCancel"
        >
          Cancel
        </button>
        <button
          type="button"
          class="agentation-popup__btn agentation-popup__btn--submit"
          :style="{ backgroundColor: themeColor }"
          @click="handleSubmit"
        >
          {{ submitLabel }}
        </button>
      </div>
    </div>
  </div>
</template>
