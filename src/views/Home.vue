<template>
  <div class="home-page">
    <header class="page-header">
      <h1>Welcome to Your Vue 3 App</h1>
      <p>A clean and reusable starter template</p>
    </header>

    <main class="page-content">
      <section class="card">
        <h2>✨ Features</h2>
        <ul>
          <li>Vue 3 + Composition API</li>
          <li>TypeScript support</li>
          <li>Pinia for state management</li>
          <li>Vue Router for navigation</li>
          <li>No UI library dependency (fully customizable)</li>
        </ul>
      </section>

      <section class="card">
        <h2>🚀 Get Started</h2>
        <p>Edit <code>src/views/Home.vue</code> to build your app!</p>
        <button @click="handleClick" class="btn-primary">
          Click Me
        </button>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
const handleClick = () => {
  alert('Hello from Vue 3!')
}
</script>

<style scoped>
.home-page {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.page-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.page-header h1 {
  font-size: 2.2rem;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
}

.page-header p {
  color: #666;
  font-size: 1.1rem;
}

.card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.card h2 {
  margin-top: 0;
  color: #333;
  font-size: 1.4rem;
}

.card ul {
  padding-left: 1.2rem;
  color: #444;
  line-height: 1.6;
}

.card code {
  background: #f0f0f0;
  padding: 0.2em 0.4em;
  border-radius: 4px;
  font-family: monospace;
}

.btn-primary {
  margin-top: 1rem;
  padding: 0.5rem 1.2rem;
  background: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-primary:hover {
  background: #2b85e4;
}

/* 响应式优化 */
@media (max-width: 600px) {
  .home-page {
    padding: 1rem;
  }

  .page-header h1 {
    font-size: 1.8rem;
  }
}
</style>