<script setup lang="ts">
import {ref, reactive} from 'vue'
import mapImg from '../assets/img/zhejiang.png'
import mapPoint from '../assets/img/mapPoint.png'
import mapCenterPoint from '../assets/img/mapCenterPoint.png'


const config = reactive({
  data: [
    {
      name: '南阳',
      value: 167
    },
    {
      name: '周口',
      value: 123
    },
    {
      name: '漯河',
      value: 98
    },
    {
      name: '郑州',
      value: 75
    },
    {
      name: '西峡',
      value: 66
    },
  ],
  colors: ['#e062ae', '#fb7293', '#e690d1', '#32c5e9', '#96bfff'],
  unit: '万元',
  labelNum: 8,
  showValue: true,
  textColor: 'red'
})

const map = reactive({
  centerPoint: [0.48, 0.35],
  points: [
    {
      position: [0.46, 0.10],
      text: '湖州',
    },
    {
      position: [0.61, 0.14],
      text: '嘉兴',
    },
    {
      position: [0.50, 0.24],
      text: '杭州',
    },
    {
      position: [0.57, 0.30],
      text: '绍兴',
    },
    {
      position: [0.89, 0.29],
      text: '舟山',
    },
    {
      position: [0.77, 0.34],
      text: '宁波',
    },
    {
      position: [0.75, 0.62],
      text: '台州',
    },
    {
      position: [0.58, 0.78],
      text: '温州',
    },
    {
      position: [0.43, 0.67],
      text: '丽水',
    },
    {
      position: [0.36, 0.53],
      text: '金华',
    },
    {
      position: [0.19, 0.54],
      text: '衢州',
    },
  ],
  bgImgUrl: mapImg,
  centerPointImg: {
    url: mapCenterPoint,
  },
  pointsImg: {
    url: mapPoint,
  },
})
</script>

<template> 
    <div class="container">
        <dv-border-box9 style="width: 500px; height: 300px;" :color="['#4fd2dd', '#235fa7']">
            <div dv-bg>
                <dv-decoration5 :dur="2" style="width:500px;height:300px;" :color="['red','red']"/>
            </div>
        </dv-border-box9>

        <dv-border-box3 style="width: 1000px; height: 1000px;">
            <dv-flyline-chart :config="map" :dev="true" style="width:100%;height:100%;" />
        </dv-border-box3>

        <dv-border-box8 :dur="5" style="width: 500px; height: 300px;">
            <dv-capsule-chart :config="config" style="width:25rem;height:15rem" />
        </dv-border-box8>

        <dv-border-box11 title="边框标题" :title-width="400" :animate="false" style="width: 500px; height: 300px;">
            <div small-bg class="border-box-content">
                <dv-decoration-9 style="width:150px;height:150px;">
                    <div color-green font-600 class="content" bg="~ dark/0">
                        66%
                    </div>
                </dv-decoration-9>
            </div>
        </dv-border-box11>
    </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
}
.border-box-content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>