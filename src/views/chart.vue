<script setup lang="ts">
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';

const chart1 = ref();
onMounted(() => {
    chartInit()
});

function chartInit(){
    var myChart = echarts.init(chart1.value);
    var option;

    option = {
    title: {
        text: 'Referer of a Website',
        subtext: 'Fake Data',
        left: 'center'
    },
    tooltip: {
        trigger: 'item'
    },
    legend: {
        orient: 'vertical',
        left: 'left'
    },
    series: [
        {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
        ],
        emphasis: {
            itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
        }
    ]
    };

    option && myChart.setOption(option);
    window.addEventListener('resize', function () {
        myChart.resize();
    });
}
</script>

<template>
    <div ref="chart1" style="width: 100%; height: 1000px;"></div>
</template>

<style scoped>
</style>