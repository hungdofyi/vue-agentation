# Marquee Group Selection Design

## Overview

Add marquee selection to select multiple elements at once and create a group annotation. This feature mirrors the original Agentation behavior with clear visual distinction between single and group selections.

## Behavior

### Selection Triggering

- **Click** (no drag): Single element selection (existing behavior)
- **Drag** (marquee touches element bounding boxes): Group selection mode

### Element Detection

When marquee rectangle intersects elements:
1. Collect all elements whose bounding box intersects the marquee
2. Filter to "leaf" elements (prefer children over parents)
3. Example: Sidenav with 10 items, marquee covers 4 → capture those 4 items, not the sidenav container

### Visual States

| State | Single Select | Group Select |
|-------|--------------|--------------|
| Hovering element | Solid blue highlight | N/A |
| Dragging marquee | N/A | **Solid orange** rectangle |
| Selected (before popup) | Solid blue highlight | **Dashed orange** outline |
| Marker | **Blue circle** | **Orange diamond** (rounded corners) |
| Marker hover | Blue border on element | Orange border on group area |
| Popup button | Blue primary | Orange primary |

## Theme System

```typescript
type SelectionTheme = {
  primary: string;
  markerShape: 'circle' | 'diamond';
  borderStyle: 'solid' | 'dashed';
}

const selectionThemes = {
  single: {
    primary: '#3b82f6',        // blue-500
    markerShape: 'circle',
    borderStyle: 'solid',
  },
  group: {
    primary: '#f97316',        // orange-500
    markerShape: 'diamond',
    borderStyle: 'dashed',
  }
}
```

## Data Structures

### Updated Annotation Type

```typescript
interface Annotation {
  id: string;
  x: number;                    // marker position (% of viewport)
  y: number;                    // marker position (px)
  comment: string;
  timestamp: number;
  isMultiSelect?: boolean;      // true for group annotations
  isFixed?: boolean;

  // Single select fields
  element?: string;
  elementPath?: string;
  boundingBox?: DOMRect;
  selectedText?: string;
  nearbyText?: string;
  cssClasses?: string;
  nearbyElements?: string;
  computedStyles?: string;
  fullPath?: string;
  accessibility?: string;

  // Group select fields
  elements?: Array<{
    name: string;               // e.g., 'link "Overview"'
    path: string;               // CSS selector
  }>;
  groupBoundingBox?: DOMRect;   // the marquee area
}
```

## Markdown Output

### Single Selection (unchanged)
```markdown
## 1. Button "Submit"
**Comment:** This needs to be blue
**Selector:** `button.submit-btn`
**Position:** x=50.0%, y=200px
```

### Group Selection
```markdown
## 1. 4 elements: link "Overview", link "Install", link "Features" +1 more
**Location:** multi-select
**Feedback:** I want this to change
```

- Count + first 3-4 element names + truncate with "+N more"
- Location always "multi-select"
- Uses "Feedback" instead of "Comment"

## Implementation Files

### 1. `src/types/index.ts`
- Add `elements` and `groupBoundingBox` fields to Annotation
- Add `SelectionTheme` type

### 2. `src/composables/useElementSelection.ts`
- Track `mouseDownPosition` and `isDragging` state
- New `marqueeBox` reactive for drag rectangle coordinates
- `getIntersectingLeafElements(rect)` - find leaf elements within marquee
- Return `marqueeBox`, `selectedElements`, `isMarqueeMode`

### 3. `src/components/Agentation.vue`
- Render marquee overlay (solid orange) while dragging
- Render group highlight (dashed orange) when group is selected
- Render element border on marker hover (blue/orange based on type)
- Pass `isMultiSelect` to popup for theming

### 4. `src/components/AnnotationMarker.vue`
- Derive shape from `annotation.isMultiSelect`
- Diamond shape: rotated square with `border-radius: 3px`
- Same shadow/pulse animation, orange color for groups
- Emit hover events for element highlight

### 5. `src/components/AnnotationPopup.vue`
- Accept `isMultiSelect` prop
- Apply orange button color for group annotations
- Show element count in header for groups

### 6. `src/utils/markdown-output.ts`
- Detect `isMultiSelect` annotations
- Format group output: count + names + "multi-select" + "Feedback"

### 7. `src/styles/`
- Add `--agentation-orange-*` CSS variables
- Diamond marker styles (`.agentation-marker--diamond`)
- Marquee rectangle styles (`.agentation-marquee`)
- Group highlight styles (`.agentation-group-highlight`)

## Technical Notes

- Marquee triggers on bounding box intersection, not pixel threshold
- Use `document.elementsFromPoint()` or bounding box intersection math
- Filter out elements with `data-agentation-ignore` attribute
- Prefer deepest intersecting elements (leaf nodes over containers)
- Marker position: center of marquee area for groups
