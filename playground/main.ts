import { createApp } from "vue";
import App from "./App.vue";

// Import all component styles (index.css imports all sub-stylesheets)
import "../src/styles/index.css";

createApp(App).mount("#app");
