/**
 * Vue Agentation - Annotations Composable
 *
 * This is a Vue 3 port of Agentation by Benji Taylor
 * Original: https://github.com/benjitaylor/agentation
 * License: PolyForm Shield License 1.0.0
 */

import { ref, readonly, computed } from "vue";
import type { Annotation, PendingAnnotation } from "../types";
import {
  loadAnnotations,
  saveAnnotations,
  clearAnnotations,
} from "../utils/storage";

let annotationsInstance: ReturnType<typeof createAnnotations> | null = null;

function createAnnotations() {
  const annotations = ref<Annotation[]>([]);
  const pendingAnnotation = ref<PendingAnnotation | null>(null);
  const editingAnnotationId = ref<string | null>(null);
  const pathname = ref<string>("");

  /**
   * Initialize annotations from localStorage
   */
  function initialize(path: string) {
    pathname.value = path;
    annotations.value = loadAnnotations(path);
  }

  /**
   * Switch to a new path and reload annotations
   * Used when navigating between routes in an SPA
   */
  function switchPath(newPath: string) {
    pathname.value = newPath;
    annotations.value = loadAnnotations(newPath);
    // Clear any pending state when switching pages
    pendingAnnotation.value = null;
    editingAnnotationId.value = null;
  }

  /**
   * Add a new annotation
   */
  function add(pending: PendingAnnotation, comment: string): Annotation {
    const annotation: Annotation = {
      id: crypto.randomUUID(),
      x: pending.x,
      y: pending.y,
      comment,
      element: pending.element,
      elementPath: pending.elementPath,
      timestamp: Date.now(),
      selectedText: pending.selectedText,
      boundingBox: pending.boundingBox,
      nearbyText: pending.nearbyText,
      cssClasses: pending.cssClasses,
      nearbyElements: pending.nearbyElements,
      computedStyles: pending.computedStyles,
      fullPath: pending.fullPath,
      accessibility: pending.accessibility,
      isFixed: pending.isFixed,
      // Group selection fields
      isMultiSelect: pending.isMultiSelect,
      elements: pending.elements,
      groupBoundingBox: pending.groupBoundingBox,
      totalElementCount: pending.totalElementCount,
    };

    annotations.value = [...annotations.value, annotation];
    saveAnnotations(pathname.value, annotations.value);
    pendingAnnotation.value = null;

    return annotation;
  }

  /**
   * Delete an annotation by ID
   */
  function remove(id: string): Annotation | null {
    const annotation = annotations.value.find((a) => a.id === id);
    if (!annotation) return null;

    annotations.value = annotations.value.filter((a) => a.id !== id);
    saveAnnotations(pathname.value, annotations.value);

    return annotation;
  }

  /**
   * Update an annotation's comment
   */
  function update(id: string, comment: string): Annotation | null {
    const index = annotations.value.findIndex((a) => a.id === id);
    if (index === -1) return null;

    const updated = { ...annotations.value[index], comment };
    annotations.value = [
      ...annotations.value.slice(0, index),
      updated,
      ...annotations.value.slice(index + 1),
    ];
    saveAnnotations(pathname.value, annotations.value);
    editingAnnotationId.value = null;

    return updated;
  }

  /**
   * Clear all annotations
   */
  function clear() {
    annotations.value = [];
    clearAnnotations(pathname.value);
  }

  /**
   * Set pending annotation (before comment entry)
   */
  function setPending(pending: PendingAnnotation | null) {
    pendingAnnotation.value = pending;
  }

  /**
   * Set annotation being edited
   */
  function setEditing(id: string | null) {
    editingAnnotationId.value = id;
  }

  /**
   * Get annotation by ID
   */
  function getById(id: string): Annotation | undefined {
    return annotations.value.find((a) => a.id === id);
  }

  /**
   * Get the index of an annotation (for numbering)
   */
  function getIndex(id: string): number {
    return annotations.value.findIndex((a) => a.id === id);
  }

  const count = computed(() => annotations.value.length);
  const isEmpty = computed(() => annotations.value.length === 0);

  return {
    annotations: readonly(annotations),
    pendingAnnotation: readonly(pendingAnnotation),
    editingAnnotationId: readonly(editingAnnotationId),
    count,
    isEmpty,
    initialize,
    switchPath,
    add,
    remove,
    update,
    clear,
    setPending,
    setEditing,
    getById,
    getIndex,
  };
}

/**
 * Composable for managing annotations
 * Uses a singleton pattern to share state across components
 */
export function useAnnotations() {
  if (!annotationsInstance) {
    annotationsInstance = createAnnotations();
  }
  return annotationsInstance;
}

/**
 * Reset the annotations instance (for testing)
 */
export function resetAnnotations() {
  annotationsInstance = null;
}
