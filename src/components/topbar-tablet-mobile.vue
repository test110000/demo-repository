<template>
	<div class="navbar">
		<div v-for="(image, index) in images" :key="index"
			:class="['image-container', { active: activeIndex === index }]" @click="handleClick(index)">
			<img :src="image" class="round-image" />
		</div>

	</div>
</template>

<script>
export default {
	data() {
		return {
			activeIndex: null,
			images: [
				'/public/image/magnum.svg',
				'/public/image/damacai2.svg',
				'/public/image/toto.svg',
				'/public/image/sg.svg',
				'/public/image/sandakan.svg',
				'/public/image/magnum.svg',
				'/public/image/damacai2.svg',
				'/public/image/toto.svg',
				'/public/image/sg.svg',
				'/public/image/sandakan.svg',
			],
		};
	},
	methods: {
		handleClick(index) {
			this.activeIndex = index;
		},
		refreshPage() {
			window.location.reload(); // Reloads the current page
		},
	},
};
</script>

<style scoped>
.navbar {
	display: flex;
	justify-content: space-around;
	align-items: center;
	height: 61px;
	background-color: white;
	z-index: 9999;
	border-bottom-left-radius: 20px;
	border-bottom-right-radius: 20px;
	position: fixed;
	width: 100%;
	top: 0;
	left: 0;
	box-shadow: 0 3px 5px #0000001a;
}

.image-container {
	width: 40px;
	height: 40px;
	border-radius: 50%;
	overflow: hidden;
	transition: border 0.3s ease;
	border: 2px solid transparent;
	display: flex;
	justify-content: center;
	align-items: center;
}

.image-container.active {
	border: 2px solid rgb(207, 46, 46);
}

.round-image {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.refresh-icon {
	font-size: 24px;
	background-color: gray;
	border: 2px solid #212529;
	border-radius: 50%;
	padding: 10px;
	width: 50px;
	height: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.refresh-arrow {
	display: contents;
	color: #000;
}
</style>
