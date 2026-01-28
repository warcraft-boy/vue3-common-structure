# 项目结构
my-vue3-starter/
├── public/                 # 静态资源（不被构建）
│   └── favicon.ico
├── src/
│   ├── assets/             # 静态资源（会被构建，如图片、字体）
│   ├── components/         # 全局通用组件（Header, Footer, Card 等）
│   ├── composables/        # 自定义组合式函数（useXXX.ts）
│   ├── layouts/            # 布局组件（DefaultLayout.vue）
│   ├── router/             # 路由配置
│   │   └── index.ts
│   ├── stores/             # Pinia 状态模块
│   │   └── index.ts
│   ├── styles/             # 全局样式
│   │   ├── element-plus.scss  # 按需定制主题
│   │   └── global.scss
│   ├── utils/              # 工具函数
│   │   └── request.ts      # Axios 封装
│   ├── views/              # 页面级组件（按路由拆分）
│   │   ├── Home.vue
│   │   └── About.vue
│   ├── App.vue
│   └── main.ts
├── .env                    # 环境变量
├── .env.development
├── .env.production
├── index.html
├── vite.config.ts
├── tsconfig.json
├── package.json
└── README.md


# 安装 @types/node
npm install -D @types/node

# 安装 vue-router
npm install vue-router@4

# 安装 tailwindcss注意事项，第一步安装一定要指定版本，否则第二步不成功
1、npm  install  -D  tailwindcss@3.4.17
2、npx  tailwindcss  init  -p