<template>
	<div>
		<swiper :modules="[Pagination]" :pagination="pagination">
			<swiper-slide>Slide 1</swiper-slide>
			<swiper-slide>Slide 2</swiper-slide>
			<swiper-slide>Slide 3</swiper-slide>
			<div class="swiper-pagination" slot="pagination"></div>
		</swiper>
	</div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper';

// Import Swiper styles
import 'swiper/swiper-bundle.css';

export default {
	components: {
		Swiper,
		SwiperSlide
	},
	data() {
		return {
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
		};
	},
};
</script>

<style>
/* You can add custom styles here */
</style>
