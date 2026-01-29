# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Vue Agentation is a Vue 3 port of Agentation - a visual feedback tool for AI agents. It enables users to annotate web page elements with comments, capturing detailed element information and generating markdown documentation.

**License**: PolyForm Shield License 1.0.0 (allows personal/internal use, prohibits competing commercial products).

## Commands

```bash
pnpm install          # Install dependencies
pnpm build            # Build library (ES + UMD + CSS + types) to dist/
pnpm typecheck        # Run vue-tsc type checking
pnpm playground       # Run dev server with demo app at localhost:3000
pnpm dev              # Alternative: run Vite dev server
```

## Architecture

### Component Structure

```
Agentation.vue (main toolbar)
    ├── useAnnotations() ← singleton state manager
    ├── useElementSelection() ← interactive element picking
    ├── useAnimationPause() ← CSS animation control
    ├── useTheme() ← dark/light mode
    ├── AnnotationMarker.vue (numbered markers on page)
    └── AnnotationPopup.vue (comment input dialog)
```

### Key Design Patterns

- **Singleton State**: `useAnnotations()` maintains a single shared instance across all components
- **Teleport UI**: Toolbar, markers, and popups teleport to `<body>` to avoid z-index conflicts
- **Route Detection**: Uses `requestAnimationFrame` loop (~16ms) to detect route changes without router coupling
- **Per-Route Storage**: Annotations stored in localStorage with key `agentation-annotations-{pathname}`, auto-expire after 7 days

### Source Organization

| Path                                  | Purpose                                                                            |
| ------------------------------------- | ---------------------------------------------------------------------------------- |
| `src/components/`                     | Vue components (Agentation, AnnotationMarker, AnnotationPopup)                     |
| `src/composables/`                    | State and logic (useAnnotations, useElementSelection, useTheme, useAnimationPause) |
| `src/utils/element-identification.ts` | Smart element naming with context-aware detection                                  |
| `src/utils/markdown-output.ts`        | Export annotations in 4 detail levels: compact, standard, detailed, forensic       |
| `src/utils/storage.ts`                | localStorage persistence with route tracking                                       |
| `src/styles/`                         | CSS files (main, components, animations)                                           |
| `playground/`                         | Development demo app                                                               |

### Data Flow

1. User clicks element selection button in toolbar
2. `useElementSelection` highlights elements on hover, captures click
3. `Agentation.vue` creates pending annotation, shows popup
4. User enters comment, annotation saved to `useAnnotations` state
5. State persists to localStorage, emits events to parent

### Build Output

- `dist/vue-agentation.es.js` - ES module
- `dist/vue-agentation.umd.js` - UMD module
- `dist/vue-agentation.css` - Bundled styles
- `dist/index.d.ts` - Type definitions

## Key Implementation Details

- Elements with `data-agentation-ignore` attribute are skipped during selection
- Fixed/sticky positioned elements tracked separately for correct marker placement
- CSS theming via `--agentation-*` variables
- Peer dependency: Vue 3.0+
