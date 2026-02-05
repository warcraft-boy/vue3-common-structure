<script setup>
import { onMounted } from 'vue';
import request from './utils/request';

// 引入全局使用的组件
import Header from '@/components/header.vue'
import Sidebar from '@/components/sidebar.vue'

//测试连接springboot 代码开始
// async function invoke() {
//   const result = await request.get('/test/config');
//   console.log(result);
// }
// onMounted(() => {
//   invoke()
// });
//测试连接springboot 代码结束

</script>

<template>
  <!-- <div class="text-center p-6 bg-blue-500 text-white rounded-lg">You did it!</div>
  <p>
    Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
    documentation
  </p> -->
   <div class="flex flex-col min-h-screen">
    <!-- 顶部栏：固定在顶部 -->
    <Header/>

    <div class="flex flex-1">
      <!-- 左侧菜单栏：固定在左侧，从顶部栏下方开始 -->
      <Sidebar />

      <!-- 主内容区域：由路由决定渲染什么 -->
      <main class="ml-64 mt-10 pt-4 px-6 w-full bg-gray-50 min-h-[calc(100vh-64px)]">
        <router-view />
      </main>
    </div>
  </div>
  
</template>

<style scoped></style>
