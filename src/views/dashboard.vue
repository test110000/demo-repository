<template>
	<div>
		<!-- Loading Screen -->
		<div v-if="showLoadingScreen" class="loading-screen">
			<div class="Mobile-topbar">
				<TopBar />
			</div>
			<div class="popUp">
				<img :class="{ 'popUp': !showLoadingScreen }" src="/image/4D_favicon.webp" alt="Loading" />
			</div>
		</div>

		<!-- Main Content -->
		<div v-show="!showLoadingScreen">
			<MobileView v-if="isMobile" @data-fetched="handleDataFetched" />
			<DesktopView v-else @data-fetched="handleDataFetched" />
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
			fetchDuration: 0 // Store the duration for hiding the loading screen
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

				// Hide loading screen after the maximum of 0.5 seconds or fetchDuration
				setTimeout(() => {
					this.showLoadingScreen = false;
				}, Math.max(this.fetchDuration * 1000)); // Convert seconds to milliseconds
			}
		},
		handleDataFetched(duration) {
			// Store the duration to be used in checkScreenSize
			this.fetchDuration = duration;

			// Hide loading screen after the data fetching duration
			setTimeout(() => {
				this.showLoadingScreen = false;
			}, duration * 1000); // Convert seconds to milliseconds
		}
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

.popUp img {
	animation: bounceUpDown 1s ease-out infinite;
	/* Increased duration to 1s */
}

@keyframes bounceUpDown {
	0% {
		transform: translateY(0);
	}

	50% {
		transform: translateY(-10px);
	}

	100% {
		transform: translateY(0);
	}
}
</style>
