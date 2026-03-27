<template>
  <div class="dashboard">
    <!-- 左上角标题 -->
    <header class="title-area">浙江省产业带</header>

    <!-- 左下产业带块 (多个卡片) -->
    <section class="left-bottom">
      <!-- 这里放绍兴、宁波等城市的产业卡片 -->
    </section>

    <!-- 中央地图 -->
    <main class="map-area">
      <!-- 地图组件或占位图 -->
    </main>

    <!-- 右上产业带块 -->
    <section class="right-top">
      <!-- 这里放台州、嘉兴等城市的产业卡片 -->
    </section>

    <!-- 右侧中间 Tab 切换 -->
    <aside class="right-tab">
      <!-- Tab 切换组件 -->
    </aside>

    <!-- 右下角延伸条状 -->
    <footer class="right-strip">
      <!-- 标语或其他内容 -->
    </footer>
  </div>
</template>

<style scoped>
.dashboard {
  display: grid;
  grid-template-columns: 1.2fr 2fr 1fr;    /* 左窄、中宽、右适中 */
  grid-template-rows: auto 1fr auto;        /* 行高根据内容自适应 */
  gap: 16px;
  height: 100vh;                            /* 全屏高度示例 */
  padding: 20px;
  box-sizing: border-box;
}

/* 左上角标题 */
.title-area {
  grid-column: 1 / 2;        /* 第一列 */
  grid-row: 1 / 2;           /* 第一行 */
  background: #f0f0f0;
  padding: 16px;
}

/* 左下产业带块 (可能包含多个卡片，内部可用 Flex 或子 Grid) */
.left-bottom {
  grid-column: 1 / 2;
  grid-row: 2 / 4;           /* 从第二行跨到第四行 (假设下方还有内容) */
  background: #e0f7fa;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* 中央地图区域 */
.map-area {
  grid-column: 2 / 3;
  grid-row: 1 / 4;           /* 从第一行跨到最后一行，占据中间全部高度 */
  background: #c8e6c9;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 右上产业带块 */
.right-top {
  grid-column: 3 / 4;
  grid-row: 1 / 2;           /* 仅第一行 */
  background: #ffe0b2;
  padding: 16px;
}

/* 右侧中间 Tab 切换 */
.right-tab {
  grid-column: 3 / 4;
  grid-row: 2 / 3;           /* 第二行 */
  background: #d1c4e9;
  padding: 16px;
}

/* 右下角条状 (延伸到中间列) */
.right-strip {
  grid-column: 2 / 4;        /* 从第二列到第四列 (即占据中间列和右列) */
  grid-row: 3 / 4;           /* 第三行 */
  background: #b3e5fc;
  padding: 16px;
  /* 可以设置高度固定，或由内容撑开 */
}
</style>