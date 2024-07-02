// main.js

import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Assuming you have a router setup
import moment from 'moment';
import i18n from './i18n'; // Import the i18n instance
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';

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
