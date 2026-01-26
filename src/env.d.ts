/// <reference types="vite/client" />

// CSS Modules
declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

// Vue Components
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
