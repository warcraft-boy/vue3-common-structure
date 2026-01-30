<template>
    <div class="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
        <!-- 顶部导航栏 -->
        <header class="bg-white shadow-sm">
            <div class="container mx-auto px-4 py-3 flex justify-between items-center">
                <div class="flex items-center space-x-2">
                    <div class="w-8 h-8 bg-blue-500 rounded-lg"></div>
                    <span class="text-xl font-bold text-gray-800">Coralglobal</span>
                    <span class="text-lg text-gray-400">|</span>
                    <span class="text-lg font-medium text-blue-600">瑞</span>
                </div>
                <div class="text-gray-600">
                    安全中心
                </div>
            </div>
        </header>

        <!-- 主要内容 -->
        <main class="flex-1 flex flex-col items-center justify-center py-8 px-4">
            <!-- 密码重置卡片 -->
            <div class="w-full max-w-md">
                <!-- 标题 -->
                <div class="text-center mb-8">
                    <h1 class="text-2xl font-bold text-gray-800 mb-2">修改密码</h1>
                    <p class="text-gray-600">
                        记起密码，
                        <a href="#" class="text-blue-500 hover:text-blue-600 hover:underline">前去登录</a>
                    </p>
                </div>

                <!-- 表单 -->
                <div class="bg-white rounded-xl shadow-lg p-6 md:p-8">
                    <form @submit.prevent="handleSubmit">
                        <!-- 手机号输入 -->
                        <div class="mb-6">
                            <label class="block text-gray-700 text-sm font-medium mb-2" for="phone">
                                请输入手机号
                            </label>
                            <div class="relative">
                                <span
                                    class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">+86</span>
                                <input id="phone" v-model="form.phone" type="tel"
                                    class="w-full pl-12 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    placeholder="请输入手机号" maxlength="11" />
                            </div>
                        </div>

                        <!-- 滑块验证 -->
                        <div class="mb-6">
                            <label class="block text-gray-700 text-sm font-medium mb-2">
                                请按住滑块，拖动到最右边
                            </label>
                            <div class="relative bg-gray-100 rounded-lg h-12">
                                <div ref="sliderTrack"
                                    class="absolute top-0 left-0 right-0 bottom-0 rounded-lg overflow-hidden"
                                    @click="handleTrackClick">
                                    <div class="absolute top-0 left-0 bottom-0 bg-gray-200 w-full"></div>
                                    <div class="absolute top-0 left-0 bottom-0 bg-blue-500 transition-all duration-300"
                                        :style="{ width: sliderPercentage + '%' }"></div>
                                    <div
                                        class="absolute top-0 left-0 bottom-0 flex items-center justify-center text-gray-700 font-medium select-none">
                                        拖动滑块验证
                                    </div>
                                </div>
                                <div ref="sliderThumb"
                                    class="absolute top-1 left-1 w-24 h-10 bg-white rounded-lg shadow cursor-grab active:cursor-grabbing flex items-center justify-center"
                                    :style="{ left: sliderPosition + 'px' }" @mousedown="startDrag"
                                    @touchstart="startDrag">
                                    <div class="text-blue-500 font-medium">
                                        <span v-if="!sliderVerified">→</span>
                                        <span v-else class="text-green-500">✓</span>
                                    </div>
                                </div>
                            </div>
                            <div v-if="sliderVerified" class="mt-2 text-green-500 text-sm flex items-center">
                                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd"></path>
                                </svg>
                                验证通过
                            </div>
                        </div>

                        <!-- 短信验证码 -->
                        <div class="mb-6">
                            <label class="block text-gray-700 text-sm font-medium mb-2" for="code">
                                请输入短信验证码
                            </label>
                            <div class="flex space-x-3">
                                <input id="code" v-model="form.code" type="text"
                                    class="flex-1 px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    placeholder="请输入短信验证码" maxlength="6" />
                                <button type="button" @click="sendCode" :disabled="codeCountdown > 0"
                                    class="px-4 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 transition disabled:opacity-50 disabled:cursor-not-allowed">
                                    {{ codeCountdown > 0 ? `${codeCountdown}s后重新获取` : '获取验证码' }}
                                </button>
                            </div>
                        </div>

                        <!-- 新密码 -->
                        <div class="mb-6">
                            <label class="block text-gray-700 text-sm font-medium mb-2" for="password">
                                请输入新密码
                            </label>
                            <input id="password" v-model="form.password" :type="showPassword ? 'text' : 'password'"
                                class="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition pr-10"
                                placeholder="请输入新密码" />
                            <button type="button"
                                class="absolute right-12 transform -translate-y-9 text-gray-400 hover:text-gray-600"
                                @click="showPassword = !showPassword">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path v-if="showPassword" d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                    <path v-else fill-rule="evenodd"
                                        d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                                        clip-rule="evenodd" />
                                    <path fill-rule="evenodd"
                                        d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"
                                        clip-rule="evenodd" />
                                </svg>
                            </button>
                        </div>

                        <!-- 确认密码 -->
                        <div class="mb-8">
                            <label class="block text-gray-700 text-sm font-medium mb-2" for="confirmPassword">
                                请再次输入新密码
                            </label>
                            <input id="confirmPassword" v-model="form.confirmPassword" type="password"
                                class="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                placeholder="请再次输入新密码" />
                        </div>

                        <!-- 提交按钮 -->
                        <button type="submit" :disabled="!isFormValid"
                            class="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 focus:ring-2 focus:ring-blue-300 transition disabled:opacity-50 disabled:cursor-not-allowed">
                            修改
                        </button>
                    </form>
                </div>

                <!-- 底部链接 -->
                <div class="mt-8 text-center text-gray-500 text-sm">
                    <div class="flex justify-center space-x-6 mb-4">
                        <a href="#" class="hover:text-gray-700 hover:underline">关于我们</a>
                        <a href="#" class="hover:text-gray-700 hover:underline">服务协议</a>
                        <a href="#" class="hover:text-gray-700 hover:underline">联系我们</a>
                    </div>
                    <div>
                        <p>版权归杭州姆琨网络科技有限公司所有</p>
                        <p>备案号浙ICP备17006119号</p>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onUnmounted, onMounted } from 'vue'

// 表单数据
const form = reactive({
    phone: '',
    code: '',
    password: '',
    confirmPassword: ''
})

// 滑块验证
const sliderThumb = ref(null)
const sliderTrack = ref(null)
const sliderPosition = ref(1) // 初始位置
const sliderVerified = ref(false)
const isDragging = ref(false)
const maxSliderPosition = ref(0)

// 密码可见性
const showPassword = ref(false)

// 验证码倒计时
const codeCountdown = ref(0)
let countdownTimer = null

// 计算滑块百分比
const sliderPercentage = computed(() => {
    return (sliderPosition.value / maxSliderPosition.value) * 100
})

// 表单验证
const isFormValid = computed(() => {
    return (
        form.phone.length === 11 &&
        sliderVerified.value &&
        form.code.length === 6 &&
        form.password.length >= 6 &&
        form.password === form.confirmPassword
    )
})

// 发送验证码
const sendCode = () => {
    if (form.phone.length !== 11) {
        alert('请输入正确的手机号')
        return
    }

    // 模拟发送验证码
    codeCountdown.value = 60
    countdownTimer = setInterval(() => {
        if (codeCountdown.value > 0) {
            codeCountdown.value--
        } else {
            clearInterval(countdownTimer)
        }
    }, 1000)

    alert('验证码已发送到您的手机')
}

// 滑块验证逻辑
const startDrag = (e) => {
    if (sliderVerified.value) return

    isDragging.value = true
    document.addEventListener('mousemove', handleDrag)
    document.addEventListener('mouseup', stopDrag)
    document.addEventListener('touchmove', handleDrag)
    document.addEventListener('touchend', stopDrag)

    e.preventDefault()
}

const handleDrag = (e) => {
    if (!isDragging.value || sliderVerified.value) return

    const trackRect = sliderTrack.value.getBoundingClientRect()
    let clientX

    if (e.type.includes('touch')) {
        clientX = e.touches[0].clientX
    } else {
        clientX = e.clientX
    }

    let newPosition = clientX - trackRect.left - sliderThumb.value.offsetWidth / 2

    // 限制滑块在轨道范围内
    newPosition = Math.max(1, Math.min(newPosition, maxSliderPosition.value))

    sliderPosition.value = newPosition

    // 验证成功条件
    if (newPosition >= maxSliderPosition.value - 10) {
        sliderVerified.value = true
        stopDrag()
    }
}

const handleTrackClick = (e) => {
    if (sliderVerified.value) return

    const trackRect = sliderTrack.value.getBoundingClientRect()
    const clickX = e.clientX - trackRect.left
    const thumbCenter = sliderThumb.value.offsetWidth / 2

    sliderPosition.value = Math.max(1, Math.min(clickX - thumbCenter, maxSliderPosition.value))

    // 如果点击接近最右侧，直接验证成功
    if (sliderPosition.value >= maxSliderPosition.value - 10) {
        sliderVerified.value = true
    }
}

const stopDrag = () => {
    isDragging.value = false
    document.removeEventListener('mousemove', handleDrag)
    document.removeEventListener('mouseup', stopDrag)
    document.removeEventListener('touchmove', handleDrag)
    document.removeEventListener('touchend', stopDrag)
}

// 表单提交
const handleSubmit = () => {
    if (!isFormValid.value) {
        alert('请填写完整信息并完成验证')
        return
    }

    // 这里可以添加实际的API调用
    console.log('表单提交:', form)
    alert('密码修改成功！')

    // 重置表单
    Object.keys(form).forEach(key => form[key] = '')
    sliderPosition.value = 1
    sliderVerified.value = false
    codeCountdown.value = 0
    showPassword.value = false
}

// 初始化
onMounted(() => {
    // 计算滑块最大位置
    const trackWidth = sliderTrack.value.offsetWidth
    const thumbWidth = sliderThumb.value.offsetWidth
    maxSliderPosition.value = trackWidth - thumbWidth - 2 // 减去margin
})

onUnmounted(() => {
    if (countdownTimer) {
        clearInterval(countdownTimer)
    }
})
</script>

<style scoped>
/* 防止文本被选中影响拖动 */
::selection {
    background: transparent;
}

/* 滑块轨道 */
#slider-track {
    user-select: none;
}

/* 滑块拖拽样式 */
.dragging {
    cursor: grabbing;
}
</style>