<script setup lang="ts">
import { ref } from "vue";
import Agentation from "../src/components/Agentation.vue";

const variant = ref("primary");
const size = ref("default");
const disabled = ref(false);
const inputValue = ref("");
const checkboxValue = ref(false);
</script>

<template>
  <Agentation />

  <div class="dashboard">
    <!-- Header - tests top edge tooltip positioning -->
    <header class="header">
      <div class="logo">Dashboard</div>
      <nav class="nav">
        <a href="#" class="nav-link">Home</a>
        <a href="#" class="nav-link">Products</a>
        <a href="#" class="nav-link">Settings</a>
      </nav>
      <div class="header-actions">
        <button class="btn btn-ghost">Help</button>
        <button class="btn btn-primary">Sign Out</button>
      </div>
    </header>

    <div class="main-layout">
      <!-- Sidebar - tests left edge positioning -->
      <aside class="sidebar">
        <div class="sidebar-section">
          <h3 class="sidebar-title">Navigation</h3>
          <ul class="sidebar-menu">
            <li><a href="#" class="sidebar-link active">Dashboard</a></li>
            <li><a href="#" class="sidebar-link">Analytics</a></li>
            <li><a href="#" class="sidebar-link">Reports</a></li>
            <li><a href="#" class="sidebar-link">Settings</a></li>
          </ul>
        </div>
        <div class="sidebar-section">
          <h3 class="sidebar-title">Quick Actions</h3>
          <button class="btn btn-secondary btn-block">New Report</button>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="content">
        <h1 class="page-title">Component Showcase</h1>
        <p class="page-subtitle">
          Test tooltip positioning on various elements
        </p>

        <!-- Properties Panel - like in screenshots -->
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Properties</h2>
            <button class="btn btn-small">Reset</button>
          </div>
          <div class="card-body">
            <div class="form-group">
              <label class="form-label">variant</label>
              <select v-model="variant" class="form-select">
                <option value="primary">primary</option>
                <option value="secondary">secondary</option>
                <option value="danger">danger</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">size</label>
              <select v-model="size" class="form-select">
                <option value="small">small</option>
                <option value="default">default</option>
                <option value="large">large</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">disabled</label>
              <label class="toggle">
                <input type="checkbox" v-model="disabled" />
                <span class="toggle-slider"></span>
              </label>
            </div>

            <div class="form-group">
              <label class="form-label">ariaLabel</label>
              <input
                type="text"
                v-model="inputValue"
                class="form-input"
                placeholder="Enter label..."
              />
            </div>
          </div>
        </div>

        <!-- Button Grid - tests various positions -->
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Button Variants</h2>
          </div>
          <div class="card-body">
            <div class="button-grid">
              <button class="btn btn-primary" :disabled="disabled">
                Primary
              </button>
              <button class="btn btn-secondary" :disabled="disabled">
                Secondary
              </button>
              <button class="btn btn-success" :disabled="disabled">
                Success
              </button>
              <button class="btn btn-danger" :disabled="disabled">
                Danger
              </button>
              <button class="btn btn-warning" :disabled="disabled">
                Warning
              </button>
              <button class="btn btn-ghost" :disabled="disabled">Ghost</button>
            </div>
          </div>
        </div>

        <!-- Form Elements -->
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Form Elements</h2>
          </div>
          <div class="card-body">
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Email Address</label>
                <input
                  type="email"
                  class="form-input"
                  placeholder="you@example.com"
                />
              </div>
              <div class="form-group">
                <label class="form-label">Password</label>
                <input
                  type="password"
                  class="form-input"
                  placeholder="Enter password"
                />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Message</label>
              <textarea
                class="form-textarea"
                placeholder="Write your message here..."
              ></textarea>
            </div>
            <div class="form-actions">
              <button class="btn btn-primary">Submit</button>
              <button class="btn btn-ghost">Cancel</button>
            </div>
          </div>
        </div>

        <!-- Animation Demo Section -->
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">🎬 Animation Pause Demo</h2>
          </div>
          <div class="card-body">
            <p class="demo-description">
              These animations will pause when you use the <code>useAnimationPause</code> composable via the Agentation floating toolbar.
            </p>

            <!-- Animated Elements Grid -->
            <div class="animation-grid">
              <!-- Spinning Element -->
              <div class="animation-box">
                <div class="spinner"></div>
                <span class="animation-label">Spin</span>
              </div>

              <!-- Pulsing Element -->
              <div class="animation-box">
                <div class="pulser"></div>
                <span class="animation-label">Pulse</span>
              </div>

              <!-- Bouncing Element -->
              <div class="animation-box">
                <div class="bouncer"></div>
                <span class="animation-label">Bounce</span>
              </div>

              <!-- Sliding Element -->
              <div class="animation-box">
                <div class="slider"></div>
                <span class="animation-label">Slide</span>
              </div>

              <!-- Fading Element -->
              <div class="animation-box">
                <div class="fader">👋</div>
                <span class="animation-label">Fade</span>
              </div>

              <!-- Rotating Colors -->
              <div class="animation-box">
                <div class="color-rotator"></div>
                <span class="animation-label">Colors</span>
              </div>
            </div>

            <!-- Loading Indicators Demo -->
            <div class="loading-demo">
              <h4 class="demo-subtitle">Loading Indicators</h4>
              <div class="loading-row">
                <div class="loading-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div class="loading-bar">
                  <div class="loading-bar-fill"></div>
                </div>
                <div class="loading-ring"></div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <!-- Right Sidebar - tests right edge positioning -->
      <aside class="right-sidebar">
        <div class="widget">
          <h3 class="widget-title">Quick Stats</h3>
          <div class="stat-item">
            <span class="stat-label">Users</span>
            <span class="stat-value">1,234</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Revenue</span>
            <span class="stat-value">$45.2k</span>
          </div>
        </div>
        <div class="widget">
          <h3 class="widget-title">Actions</h3>
          <button class="btn btn-primary btn-block">Export Data</button>
          <button class="btn btn-secondary btn-block">Download Report</button>
          <button class="btn btn-ghost btn-block">View More</button>
        </div>
      </aside>
    </div>

    <!-- Footer - tests bottom edge positioning -->
    <footer class="footer">
      <span>Vue Agentation Playground</span>
      <div class="footer-links">
        <a href="#">Privacy</a>
        <a href="#">Terms</a>
        <a href="#">Contact</a>
      </div>
    </footer>
  </div>
</template>

<style>
.dashboard {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Header */
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.5rem;
  background: white;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 100;
}

.logo {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
}

.nav {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  color: #6b7280;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
}

.nav-link:hover {
  color: #3b82f6;
}

.header-actions {
  display: flex;
  gap: 0.5rem;
}

/* Main Layout */
.main-layout {
  display: flex;
  flex: 1;
}

/* Sidebar */
.sidebar {
  width: 220px;
  background: white;
  border-right: 1px solid #e5e7eb;
  padding: 1.5rem 1rem;
}

.sidebar-section {
  margin-bottom: 2rem;
}

.sidebar-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.75rem;
}

.sidebar-menu {
  list-style: none;
}

.sidebar-link {
  display: block;
  padding: 0.5rem 0.75rem;
  color: #4b5563;
  text-decoration: none;
  font-size: 0.875rem;
  border-radius: 0.375rem;
  margin-bottom: 0.25rem;
}

.sidebar-link:hover {
  background: #f3f4f6;
}

.sidebar-link.active {
  background: #eff6ff;
  color: #3b82f6;
  font-weight: 500;
}

/* Right Sidebar */
.right-sidebar {
  width: 240px;
  background: white;
  border-left: 1px solid #e5e7eb;
  padding: 1.5rem 1rem;
}

.widget {
  margin-bottom: 1.5rem;
}

.widget-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f3f4f6;
}

.stat-label {
  color: #6b7280;
  font-size: 0.875rem;
}

.stat-value {
  font-weight: 600;
  color: #1f2937;
}

/* Content */
.content {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.25rem;
}

.page-subtitle {
  color: #6b7280;
  margin-bottom: 1.5rem;
}

/* Cards */
.card {
  background: white;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  margin-bottom: 1.5rem;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #e5e7eb;
}

.card-title {
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
}

.card-body {
  padding: 1.25rem;
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 0.375rem;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.15s;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-small {
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
}

.btn-block {
  display: flex;
  width: 100%;
  margin-bottom: 0.5rem;
}

.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #2563eb;
}

.btn-secondary {
  background: #6b7280;
  color: white;
}

.btn-secondary:hover:not(:disabled) {
  background: #4b5563;
}

.btn-success {
  background: #10b981;
  color: white;
}

.btn-success:hover:not(:disabled) {
  background: #059669;
}

.btn-danger {
  background: #ef4444;
  color: white;
}

.btn-danger:hover:not(:disabled) {
  background: #dc2626;
}

.btn-warning {
  background: #f59e0b;
  color: white;
}

.btn-warning:hover:not(:disabled) {
  background: #d97706;
}

.btn-ghost {
  background: transparent;
  color: #4b5563;
  border-color: #e5e7eb;
}

.btn-ghost:hover:not(:disabled) {
  background: #f3f4f6;
}

.button-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

/* Forms */
.form-group {
  margin-bottom: 1rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.375rem;
}

.form-input,
.form-select,
.form-textarea {
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background: white;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-textarea {
  min-height: 100px;
  resize: vertical;
}

.form-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
}

/* Toggle */
.toggle {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
}

.toggle input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  inset: 0;
  background: #e5e7eb;
  border-radius: 24px;
  transition: 0.2s;
}

.toggle-slider::before {
  content: "";
  position: absolute;
  width: 18px;
  height: 18px;
  left: 3px;
  bottom: 3px;
  background: white;
  border-radius: 50%;
  transition: 0.2s;
}

.toggle input:checked + .toggle-slider {
  background: #3b82f6;
}

.toggle input:checked + .toggle-slider::before {
  transform: translateX(20px);
}

/* Footer */
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: white;
  border-top: 1px solid #e5e7eb;
  font-size: 0.875rem;
  color: #6b7280;
}

.footer-links {
  display: flex;
  gap: 1.5rem;
}

.footer-links a {
  color: #6b7280;
  text-decoration: none;
}

.footer-links a:hover {
  color: #3b82f6;
}

/* Animation Demo Styles */
.demo-description {
  color: #6b7280;
  margin-bottom: 1.5rem;
}

.demo-description code {
  background: #f3f4f6;
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-family: monospace;
  color: #3b82f6;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.status-playing {
  background: #d1fae5;
  color: #059669;
}

.status-paused {
  background: #fef3c7;
  color: #d97706;
}

.animation-controls {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.animation-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.animation-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 0.75rem;
  border: 1px solid #e2e8f0;
}

.animation-label {
  margin-top: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Spinner Animation */
.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e2e8f0;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Pulser Animation */
.pulser {
  width: 40px;
  height: 40px;
  background: #8b5cf6;
  border-radius: 50%;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.3);
    opacity: 0.6;
  }
}

/* Bouncer Animation */
.bouncer {
  width: 30px;
  height: 30px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border-radius: 50%;
  animation: bounce 0.6s ease-in-out infinite alternate;
}

@keyframes bounce {
  from {
    transform: translateY(-15px);
  }
  to {
    transform: translateY(15px);
  }
}

/* Slider Animation */
.slider {
  width: 20px;
  height: 20px;
  background: #f59e0b;
  border-radius: 4px;
  animation: slide 2s ease-in-out infinite;
}

@keyframes slide {
  0%, 100% {
    transform: translateX(-30px);
  }
  50% {
    transform: translateX(30px);
  }
}

/* Fader Animation */
.fader {
  font-size: 2rem;
  animation: fade 2s ease-in-out infinite;
}

@keyframes fade {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.2;
  }
}

/* Color Rotator Animation */
.color-rotator {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  animation: colorRotate 3s linear infinite;
}

@keyframes colorRotate {
  0% {
    background: #ef4444;
  }
  25% {
    background: #f59e0b;
  }
  50% {
    background: #10b981;
  }
  75% {
    background: #3b82f6;
  }
  100% {
    background: #ef4444;
  }
}

/* Loading Demo Styles */
.loading-demo {
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
}

.demo-subtitle {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 1rem;
}

.loading-row {
  display: flex;
  align-items: center;
  gap: 3rem;
}

/* Loading Dots */
.loading-dots {
  display: flex;
  gap: 6px;
}

.loading-dots span {
  width: 10px;
  height: 10px;
  background: #3b82f6;
  border-radius: 50%;
  animation: loadingDot 1.4s ease-in-out infinite;
}

.loading-dots span:nth-child(1) {
  animation-delay: 0s;
}

.loading-dots span:nth-child(2) {
  animation-delay: 0.2s;
}

.loading-dots span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes loadingDot {
  0%, 80%, 100% {
    transform: scale(0.6);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Loading Bar */
.loading-bar {
  width: 120px;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
}

.loading-bar-fill {
  width: 40%;
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  border-radius: 4px;
  animation: loadingBar 1.5s ease-in-out infinite;
}

@keyframes loadingBar {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(400%);
  }
}

/* Loading Ring */
.loading-ring {
  width: 30px;
  height: 30px;
  border: 3px solid #e5e7eb;
  border-top-color: #8b5cf6;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
</style>
