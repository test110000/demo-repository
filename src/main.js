import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Assuming you have a router setup
import moment from 'moment';
import i18n from './i18n'; // Import the i18n instance
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import VueLazyload from 'vue-lazyload';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// Bootstrap JavaScript
import 'bootstrap-icons/font/bootstrap-icons.css';

const app = createApp(App);

// Register moment as a global property
app.config.globalProperties.$moment = moment;

// Register Swiper components globally
app.component('Swiper', Swiper);
app.component('SwiperSlide', SwiperSlide);

// Use Vue Router
app.use(router);

// Use i18n for internationalization
app.use(i18n);

// Use VueLazyload for lazy loading images
app.use(VueLazyload, {
	preLoad: 1.3, // Pre-load height ratio
	attempt: 1, // Number of attempts to load the image
	lazyComponent: true, // Enable lazy loading for components (images load when in viewport)
});

// Mount the Vue app
app.mount('#app');
