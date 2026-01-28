<script setup>
import { onMounted } from 'vue';
import request from './utils/request';

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
  <router-view/>
  
</template>

<style scoped></style>
