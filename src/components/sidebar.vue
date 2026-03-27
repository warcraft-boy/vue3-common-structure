<!-- src/components/Sidebar.vue -->
<template>
  <aside class="w-64 bg-gray-800 text-white fixed left-0 top-0 h-screen z-20 overflow-hidden">
    <!-- 模拟 Header 高度的占位区（与真实 Header 完全一致） -->
    <div class="h-16 flex items-center px-6 text-white">
      <!-- 可选：隐藏 logo 或留空 -->
    </div>

    <!-- 菜单区域 -->
    <nav class="h-[calc(100vh-64px)] overflow-y-auto">
      <ul class="p-4 space-y-2">
        <li>
          <router-link to="/" class="block p-3 rounded hover:bg-gray-700 transition">首页</router-link>
        </li>
        <li>
          <router-link to="/chart" class="block p-3 rounded hover:bg-gray-700 transition">用户管理</router-link>
        </li>
        <li>
          <router-link to="/test" class="block p-3 rounded hover:bg-gray-700 transition">设置</router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>