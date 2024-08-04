<template>
	<div>
		<!-- Loading Screen -->
		<div v-if="showLoadingScreen" class="loading-screen">
			<div class="Mobile-topbar">
				<TopBar />
			</div>
			<img :class="{ 'fade-out': !showLoadingScreen }" src="/image/4D_favicon.webp" alt="Loading" />
		</div>

		<!-- Main Content -->
		<div v-show="!showLoadingScreen">
			<MobileView v-if="isMobile" />
			<DesktopView v-else />
		</div>
	</div>
</template>

<script>
import MobileView from '/src/components/dashboard_Mobile.vue';
import DesktopView from '/src/components/dashboard_Web.vue';
import TopBar from '/src/components/topbar.vue';

export default {
	data() {
		return {
			isMobile: window.innerWidth <= 769, // Initial state based on window width
			showLoadingScreen: true, // Track loading screen visibility
		};
	},
	components: {
		MobileView,
		DesktopView,
		TopBar
	},
	mounted() {
		this.checkScreenSize();
		window.addEventListener('resize', this.checkScreenSize);

		// Hide the loading screen after initial load
		setTimeout(() => {
			this.showLoadingScreen = false;
		}, 1000);
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.checkScreenSize);
	},
	methods: {
		checkScreenSize() {
			const wasMobile = this.isMobile;
			this.isMobile = window.innerWidth <= 769;
			const isCrossingThreshold = wasMobile !== this.isMobile;

			// Trigger loading screen if crossing threshold
			if (isCrossingThreshold) {
				this.showLoadingScreen = true;

				// Hide loading screen after 0.5 seconds
				setTimeout(() => {
					this.showLoadingScreen = false;
				}, 500);
			}
		},
	},
};
</script>

<style>
@media screen and (max-width: 769px) {
	.Mobile-topbar {
		display: none;
	}
}

.loading-screen {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	/* background-color: white; */
	/* or any other background color */
	z-index: 9999;
	/* To ensure it is on top of other elements */
}

.loading-screen img {
	max-width: 100px;
	/* Adjust the image size as needed */
	transition: opacity 0.5s ease, transform 0.5s ease;
}

.loading-screen img.fade-out {
	opacity: 0;
	transform: scale(0.9);
}
</style>
