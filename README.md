# Vue Agentation

A Vue 3 port of [Agentation](https://github.com/benjitaylor/agentation) by Benji Taylor - a visual feedback tool for AI agents.

> **License**: This project is licensed under PolyForm Shield License 1.0.0 (same as the original).
> This license allows personal and internal use but prohibits creating competing commercial products.

## Original Project

- **Original Author**: Benji Taylor
- **Original Repository**: https://github.com/benjitaylor/agentation
- **Original Website**: https://agentation.dev
- **License**: PolyForm Shield License 1.0.0

## Installation

Install from GitHub (public repository, no authentication required):

```bash
# Install from GitHub
pnpm add git+https://github.com/hungdofyi/vue-agentation.git

# Or install from specific branch
pnpm add git+https://github.com/hungdofyi/vue-agentation.git#main

# Or install from specific tag/version
pnpm add git+https://github.com/hungdofyi/vue-agentation.git#v1.0.0
```

Or add to your `package.json`:

```json
{
  "dependencies": {
    "vue-agentation": "git+https://github.com/hungdofyi/vue-agentation.git#main"
  }
}
```

**Works for all team members - no authentication needed!**

## Basic Usage

```vue
<script setup>
import { Agentation } from 'vue-agentation'
import 'vue-agentation/style.css'
</script>

<template>
  <div>
    <YourAppContent />
    <Agentation />
  </div>
</template>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `enableDemoMode` | `boolean` | `false` | Enable demo mode with pre-populated annotations |
| `demoAnnotations` | `DemoAnnotation[]` | `[]` | Demo annotations to display on mount |
| `demoDelay` | `number` | `1000` | Delay before demo annotations appear (ms) |
| `copyToClipboard` | `boolean` | `true` | Whether to copy markdown to clipboard on copy action |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `@annotation-add` | `Annotation` | Fired when an annotation is added |
| `@annotation-delete` | `Annotation` | Fired when an annotation is deleted |
| `@annotation-update` | `Annotation` | Fired when an annotation is updated |
| `@annotations-clear` | - | Fired when all annotations are cleared |
| `@copy` | `string` | Fired when markdown is copied |

## Customization

Customize the appearance using CSS variables:

```css
:root {
  /* Colors */
  --agentation-accent-color: #3b82f6;
  --agentation-accent-hover: #2563eb;
  
  /* Light theme */
  --agentation-bg-light: #ffffff;
  --agentation-border-light: #e5e7eb;
  --agentation-text-light: #374151;
  --agentation-text-muted-light: #6b7280;
  --agentation-hover-light: #f3f4f6;
  
  /* Dark theme */
  --agentation-bg-dark: #1f2937;
  --agentation-border-dark: #374151;
  --agentation-text-dark: #f3f4f6;
  --agentation-text-muted-dark: #9ca3af;
  --agentation-hover-dark: #374151;
}
```

## Advanced Usage

### Using Composables Directly

```vue
<script setup>
import { useAnnotations, useTheme } from 'vue-agentation'

const { annotations, add, remove, clear } = useAnnotations()
const { isDark, toggle } = useTheme()
</script>
```

### Using Utilities

```ts
import { generateMarkdown, identifyElement } from 'vue-agentation'

// Generate markdown from annotations
const markdown = generateMarkdown(annotations, 'detailed')

// Identify an element
const { name, path } = identifyElement(element)
```

## Browser Compatibility

- Chrome/Edge 88+
- Firefox 78+
- Safari 14+

## Development

```bash
# Install dependencies
pnpm install

# Build the library
pnpm build

# Type check
pnpm typecheck
```

## License

This project is licensed under PolyForm Shield License 1.0.0. See [LICENSE](./LICENSE) for details.

This is a Vue 3 port of the original [Agentation](https://github.com/benjitaylor/agentation) project by Benji Taylor.
