// main.js

import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Assuming you have a router setup
import moment from 'moment';
import i18n from './i18n'; // Import the i18n instance
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import VueLazyload from 'vue-lazyload'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const app = createApp(App);

// Register moment as a global property
app.config.globalProperties.$moment = moment;

app.component('Swiper', Swiper);
app.component('SwiperSlide', SwiperSlide);
app.use(router); // Use Vue Router
app.use(i18n);
app.mount('#app');
app.use(VueLazyload, {
	preLoad: 1.3, // 预加载的高度比例
	attempt: 1, // 尝试加载次数
	lazyComponent: true, // 启用图片懒加载组件（当图片进入视窗时自动加载）
})
