<!--
  Vue Agentation - Annotation Marker Component

  This is a Vue 3 port of Agentation by Benji Taylor
  Original: https://github.com/benjitaylor/agentation
  License: PolyForm Shield License 1.0.0
-->
<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import type { Annotation } from "../types";

interface Props {
  /** The annotation data */
  annotation: Annotation;
  /** The index number to display */
  index: number;
  /** Dark mode */
  dark?: boolean;
  /** Accent color (hex) */
  accentColor?: string;
  /** Whether the marker is being hovered */
  isHovered?: boolean;
}

const {
  annotation,
  index,
  dark = false,
  accentColor = "#3b82f6",
  isHovered = false,
} = defineProps<Props>();

const emit = defineEmits<{
  click: [annotation: Annotation];
  delete: [annotation: Annotation];
  mouseenter: [annotation: Annotation];
  mouseleave: [annotation: Annotation];
}>();

const showTooltip = ref(false);
const animState = ref<"initial" | "enter" | "entered" | "exit">("initial");

// Position styles
const positionStyle = computed(() => {
  const style: Record<string, string> = {
    left: `${annotation.x}%`,
  };

  if (annotation.isFixed) {
    style.top = `${annotation.y}px`;
  } else {
    style.top = `${annotation.y}px`;
  }

  return style;
});

// Calculate tooltip position to stay within viewport
const tooltipPosition = computed(() => {
  const xPercent = annotation.x;
  // If marker is on the right side of screen, show tooltip to the left
  return xPercent > 70 ? "left" : "right";
});

function handleClick(event: MouseEvent) {
  event.stopPropagation();
  emit("click", annotation);
}

function handleDelete(event: MouseEvent) {
  event.stopPropagation();
  animState.value = "exit";
  setTimeout(() => {
    emit("delete", annotation);
  }, 200);
}

function handleMouseEnter() {
  showTooltip.value = true;
  emit("mouseenter", annotation);
}

function handleMouseLeave() {
  showTooltip.value = false;
  emit("mouseleave", annotation);
}

// Entrance animation
onMounted(() => {
  animState.value = "enter";
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      animState.value = "entered";
    });
  });
});
</script>

<template>
  <div
    class="agentation-marker"
    :class="[
      annotation.isFixed ? 'agentation-marker--fixed' : 'agentation-marker--absolute',
      animState === 'initial' && 'agentation-marker--entering',
      animState === 'enter' && 'agentation-marker--entering',
      animState === 'entered' && 'agentation-marker--entered',
      animState === 'exit' && 'agentation-marker--exiting',
    ]"
    :style="positionStyle"
    data-agentation-ignore
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click="handleClick"
  >
    <!-- Marker dot with number -->
    <div
      class="agentation-marker__dot"
      :class="[isHovered && 'agentation-marker__dot--hovered']"
      :style="{ backgroundColor: accentColor }"
    >
      {{ index + 1 }}

      <!-- Pulse animation ring -->
      <div
        class="agentation-marker__ping agentation-animate-ping"
        :style="{ backgroundColor: accentColor }"
      />
    </div>

    <!-- Tooltip on hover -->
    <Transition
      enter-active-class="agentation-transition-enter-active"
      enter-from-class="agentation-transition-enter"
      enter-to-class="agentation-transition-enter-to"
      leave-active-class="agentation-transition-leave-active"
      leave-from-class="agentation-transition-leave"
      leave-to-class="agentation-transition-leave-to"
    >
      <div
        v-if="showTooltip"
        class="agentation-marker__tooltip"
        :class="[
          dark ? 'agentation-marker__tooltip--dark' : '',
          tooltipPosition === 'left' ? 'agentation-marker__tooltip--left' : 'agentation-marker__tooltip--right',
        ]"
        @click.stop
      >
        <!-- Header -->
        <div class="agentation-marker__tooltip-header">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <span class="agentation-marker__tooltip-title">
              {{ annotation.element }}
            </span>
            <button
              type="button"
              class="agentation-marker__tooltip-delete"
              title="Delete annotation"
              @click="handleDelete"
            >
              <svg
                class="agentation-marker__tooltip-delete-icon"
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
          </div>
          <p class="agentation-marker__tooltip-path">
            {{ annotation.elementPath }}
          </p>
        </div>

        <!-- Comment -->
        <div class="agentation-marker__tooltip-body">
          <p class="agentation-marker__tooltip-comment">
            {{ annotation.comment }}
          </p>

          <!-- Selected text if present -->
          <p
            v-if="annotation.selectedText"
            class="agentation-marker__tooltip-selected-text"
          >
            "{{ annotation.selectedText }}"
          </p>
        </div>

        <!-- Footer with timestamp -->
        <div class="agentation-marker__tooltip-footer">
          {{ new Date(annotation.timestamp).toLocaleString() }}
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.agentation-marker__dot--hovered {
  transform: scale(1.1);
}
</style>
