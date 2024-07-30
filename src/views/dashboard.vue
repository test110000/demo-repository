<template>
	<div>
		<MobileView v-if="isMobile" />
		<DesktopView v-else />
	</div>
</template>
<script>
import MobileView from '/src/components/dashboard_Mobile.vue';
import DesktopView from '/src/components/dashboard_Web.vue';
export default {
	data() {
		return {
			isMobile: false,
		};
	},
	components: {
		MobileView,
		DesktopView,
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
			this.isMobile = window.innerWidth <= 680;
		},
	},
};
</script>