<template>
    <div class="p-6 bg-gray-50 min-h-screen">
        <!-- Top Row -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <!-- 累计金额 -->
            <div class="bg-white p-6 rounded-lg shadow border">
                <h3 class="text-sm font-medium text-gray-700">2026年累计报关金额</h3>
                <div class="mt-4 text-3xl font-bold">{{ formatCurrency(cumulativeAmount) }}</div>
                <div class="mt-4 w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div class="h-full bg-green-600" :style="{ width: `${progress}%` }"></div>
                </div>
                <div class="flex justify-between mt-1 text-xs text-gray-500">
                    <span>{{ progress.toFixed(2) }}%</span>
                    <span>$500M</span>
                </div>
            </div>

            <!-- 过去12个月报关金额 -->
            <div class="bg-white p-6 rounded-lg shadow border">
                <h3 class="text-sm font-medium text-gray-700">过去12个月报关金额</h3>
                <div class="mt-2 text-2xl font-bold text-gray-900">
                    {{ formatLast12Total }}
                </div>
                <div ref="topBarChartRef" class="mt-4 h-60"></div>
            </div>

            <!-- 口岸金额占比 -->
            <div class="bg-white p-6 rounded-lg shadow border flex flex-col">
                <h3 class="text-sm font-medium text-gray-700 mb-4">口岸金额占比</h3>
                <div class="flex items-center">
                    <div ref="pieChartRef" class="w-48 h-48"></div>
                    <div class="ml-4 space-y-2 text-sm">
                        <div v-for="(item, i) in pieData" :key="i" class="flex items-center">
                            <div class="w-3 h-3 rounded-full mr-2" :style="{ backgroundColor: item.color }"></div>
                            <span>{{ item.name }} ({{ item.percent }}%)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Bottom Section -->
        <div class="bg-white p-6 rounded-lg shadow border">
            <!-- 筛选栏 -->
            <div class="flex flex-wrap items-center gap-4 mb-6">
                <div class="flex items-center">
                    <label class="text-sm font-medium text-gray-700 mr-2">主体名称:</label>
                    <select v-model="selectedSubject" class="border rounded px-3 py-1 text-sm">
                        <option value="">全部</option>
                        <option v-for="sub in subjects" :key="sub" :value="sub">{{ sub }}</option>
                    </select>
                </div>

                <!-- 快捷按钮 + 自定义日期输入（带 × 清除） -->
                <div class="flex items-center gap-2 ml-auto">
                    <!-- 快捷按钮 -->
                    <button v-for="btn in quickButtons" :key="btn.value" @click="handleQuickFilter(btn.value)"
                        class="px-3 py-1 text-xs rounded"
                        :class="currentQuick === btn.value ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'">
                        {{ btn.label }}
                    </button>

                    <!-- 开始日期 -->
                    <div class="relative">
                        <input v-model="startDate" type="text" placeholder="YYYY-MM-DD" maxlength="10"
                            class="border rounded px-2 py-1 text-sm pr-6" />
                        <span v-if="startDate"
                            class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-gray-700 text-lg"
                            @click="startDate = ''">×</span>
                    </div>

                    <span class="text-gray-500">至</span>

                    <!-- 结束日期 -->
                    <div class="relative">
                        <input v-model="endDate" type="text" placeholder="YYYY-MM-DD" maxlength="10"
                            class="border rounded px-2 py-1 text-sm pr-6" />
                        <span v-if="endDate"
                            class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-gray-700 text-lg"
                            @click="endDate = ''">×</span>
                    </div>

                    <!-- 筛选按钮 -->
                    <button @click="applyDateFilter"
                        class="px-3 py-1 bg-blue-500 text-white text-sm rounded ml-2">筛选</button>
                </div>
            </div>

            <!-- 图表 + 排行榜 -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <!-- 主体报关金额趋势 -->
                <div class="h-80">
                    <h3 class="text-sm font-medium text-gray-700 mb-4">报关金额趋势（万美元）</h3>
                    <div ref="bottomBarChartRef" class="h-full"></div>
                </div>

                <!-- 排行榜 -->
                <div class="h-80">
                    <h3 class="text-sm font-medium text-gray-700 mb-4">主体报关金额排名（Top 9）</h3>
                    <ul class="space-y-3">
                        <li v-for="(item, index) in rankingList" :key="index" class="flex justify-between text-sm">
                            <span class="font-medium">{{ index + 1 }}. {{ item.name }}</span>
                            <span class="text-gray-700">${{ item.amount.toLocaleString() }}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick, computed } from 'vue';
import * as echarts from 'echarts';

// ====== 模拟数据 ======
const cumulativeAmount = 202000000; // $202M
const progress = (cumulativeAmount / 500000000) * 100;

const subjects = [
    '杭州云滇数字科技贸易有限公司',
    '深圳智联进出口有限公司',
    '上海华信国际物流有限公司',
    '北京中通跨境供应链有限公司',
    '广州海达国际货运代理有限公司',
    '厦门远航国际贸易有限公司',
    '宁波港通外贸有限公司',
    '天津恒瑞进出口有限公司',
    '青岛盛合国际物流有限公司',
    '成都迅捷电子商务有限公司',
    '重庆天宇科技有限公司',
    '西安鼎力贸易有限公司',
    '长沙金源进出口有限公司',
    '武汉宏图国际物流有限公司',
    '哈尔滨龙腾贸易有限公司'
];

const mockData = {
    '杭州云滇数字科技贸易有限公司': [120, 130, 140, 160, 180, 200, 220, 210, 190, 180, 170, 160],
    '深圳智联进出口有限公司': [90, 95, 100, 110, 120, 130, 140, 135, 125, 120, 115, 110],
    '上海华信国际物流有限公司': [80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 130, 135],
    '北京中通跨境供应链有限公司': [70, 75, 80, 85, 90, 95, 100, 98, 95, 92, 88, 85],
    '广州海达国际货运代理有限公司': [60, 65, 70, 75, 80, 85, 90, 88, 85, 82, 80, 78],
    '厦门远航国际贸易有限公司': [50, 55, 60, 65, 70, 75, 80, 78, 75, 72, 70, 68],
    '宁波港通外贸有限公司': [45, 50, 55, 60, 65, 70, 75, 73, 70, 68, 65, 63],
    '天津恒瑞进出口有限公司': [40, 45, 50, 55, 60, 65, 70, 68, 65, 62, 60, 58],
    '青岛盛合国际物流有限公司': [35, 40, 45, 50, 55, 60, 65, 63, 60, 58, 55, 53],
    '成都迅捷电子商务有限公司': [30, 35, 40, 45, 50, 55, 60, 58, 55, 52, 50, 48],
    '重庆天宇科技有限公司': [25, 30, 35, 40, 45, 50, 55, 53, 50, 48, 45, 43],
    '西安鼎力贸易有限公司': [20, 25, 30, 35, 40, 45, 50, 48, 45, 42, 40, 38],
    '长沙金源进出口有限公司': [15, 20, 25, 30, 35, 40, 45, 43, 40, 38, 35, 33],
    '武汉宏图国际物流有限公司': [10, 15, 20, 25, 30, 35, 40, 38, 35, 32, 30, 28],
    '哈尔滨龙腾贸易有限公司': [5, 10, 15, 20, 25, 30, 35, 33, 30, 28, 25, 23]
};

const pieData = [
    { name: '杭州', percent: 24.87, color: '#3B82F6' },
    { name: '宁波', percent: 23.5, color: '#EC4899' },
    { name: '上海', percent: 21.2, color: '#10B981' },
    { name: '深圳', percent: 18.3, color: '#F59E0B' },
    { name: '厦门', percent: 12.13, color: '#8B5CF6' }
];

const rankingList = subjects.map(name => ({
    name,
    amount: mockData[name].reduce((a, b) => a + b, 0)
})).sort((a, b) => b.amount - a.amount).slice(0, 9);

// ====== 响应式状态 ======
const selectedSubject = ref('深圳智联进出口有限公司');
const startDate = ref('');
const endDate = ref('');
const currentQuick = ref('month');

const quickButtons = [
    { label: '本月', value: 'month' },
    { label: '本季度', value: 'quarter' },
    { label: '本年', value: 'year' }
];

// ====== 工具函数 ======
const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(num);
};

const last12MonthsTotal = computed(() => {
    const data = mockData['杭州云滇数字科技贸易有限公司'];
    return data.reduce((sum, val) => sum + val, 0); // 单位：万美元
});

const formatLast12Total = computed(() => {
    return formatCurrency(last12MonthsTotal.value * 10000);
});

// 自动填充日期范围
const handleQuickFilter = (type) => {
    currentQuick.value = type;
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth(); // 0-based

    let start, end;

    if (type === 'month') {
        start = new Date(year, month, 1);
        end = new Date(year, month + 1, 0);
    } else if (type === 'quarter') {
        const quarterStart = Math.floor(month / 3) * 3;
        start = new Date(year, quarterStart, 1);
        end = new Date(year, quarterStart + 3, 0);
    } else if (type === 'year') {
        start = new Date(year, 0, 1);
        end = new Date(year, 11, 31);
    }

    const formatDate = (d) => d.toISOString().split('T')[0];
    startDate.value = formatDate(start);
    endDate.value = formatDate(end);
};

const applyDateFilter = () => {
    initBottomBarChart();
};

// ====== 图表引用 ======
const topBarChartRef = ref(null);
const pieChartRef = ref(null);
const bottomBarChartRef = ref(null);

// ====== 图表初始化 ======
const initTopBarChart = () => {
    const chart = echarts.init(topBarChartRef.value);
    chart.setOption({
        tooltip: { trigger: 'axis', formatter: '{b}: ${c}万美金' },
        xAxis: {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisLabel: { rotate: 45, fontSize: 11 }
        },
        yAxis: {
            type: 'value',
            name: '金额 (万美元)',
            axisLabel: { fontSize: 11 }
        },
        series: [{
            type: 'bar',
            data: mockData['杭州云滇数字科技贸易有限公司'],
            itemStyle: { color: '#3B82F6' },
            barWidth: '20px'
        }]
    });
};

const initPieChart = () => {
    const chart = echarts.init(pieChartRef.value);
    chart.setOption({
        series: [{
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: { show: false },
            emphasis: { label: { show: true } },
            data: pieData.map(item => ({ name: item.name, value: item.percent }))
        }]
    });
};

const getFilteredData = () => {
    const data = mockData[selectedSubject.value] || [];
    const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
    let values = [...data];

    if (startDate.value && endDate.value) {
        const startMonth = parseInt(startDate.value.split('-')[1]);
        const endMonth = parseInt(endDate.value.split('-')[1]);
        const filteredValues = [];
        for (let i = startMonth - 1; i < endMonth; i++) {
            if (i >= 0 && i < values.length) {
                filteredValues.push(values[i]);
            }
        }
        return {
            months: months.slice(startMonth - 1, endMonth),
            values: filteredValues
        };
    }

    return { months, values };
};

const initBottomBarChart = () => {
    const { months, values } = getFilteredData();
    const chart = echarts.init(bottomBarChartRef.value);
    chart.setOption({
        tooltip: { trigger: 'axis', formatter: '{b}: ${c}万美金' },
        xAxis: {
            type: 'category',
            data: months,
            axisLabel: { rotate: 45, fontSize: 11 }
        },
        yAxis: {
            type: 'value',
            name: '金额 (万美元)',
            axisLabel: { fontSize: 11 }
        },
        series: [{
            type: 'bar',
            data: values,
            itemStyle: { color: '#3B82F6' },
            barWidth: '25px'
        }]
    });
};

// ====== 生命周期 ======
onMounted(() => {
    handleQuickFilter('month'); // 默认本月
    initTopBarChart();
    initPieChart();
    initBottomBarChart();
});

watch([selectedSubject, startDate, endDate], async () => {
    if (echarts.getInstanceByDom(bottomBarChartRef.value)) {
        echarts.dispose(bottomBarChartRef.value);
    }
    await nextTick();
    initBottomBarChart();
});
</script>