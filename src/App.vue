<template>
	<!-- <div style="background-color: grey;"> -->
	<div style="background-color: #f8f9fa;">
		<div class="app-container">

			<div>
				<div class="screen1024">
					<div class="Leftside-bar">
						<LeftSidebar />
					</div>
				</div>
				<div class="screen-mobile">
					<div class="Topbar-laptop">
						<TopBar />
					</div>
					<div class="Topbar-TM" style="display: none;">
						<TopBarTM />
					</div>


					<router-view></router-view>
				</div>
				<div class="screen1024">
					<RightColumn />
				</div>
			</div>
		</div>
	</div>

</template>

<script>
import LeftSidebar from './components/LeftSidebar.vue'
import TopBar from './components/topbar.vue'
import RightColumn from './components/right.vue'
import TopBarTM from './components/topbar-tablet-mobile.vue'


export default {
	name: 'App',
	components: {
		LeftSidebar,
		TopBar,
		RightColumn,
		TopBarTM

	}
}
</script>

<style>
html,
body {
	height: 100%;
	margin: 0;
}

.app-container {
	display: flex;
	height: 100vh;
	width: 100%;
	justify-content: center;
}


.main-content {
	flex: 1;
	/* Space for sidebar */
	margin-top: 70px;
	/* Space for top bar */
	overflow-y: auto;
	text-align: center;
}

.content-view {
	padding: 20px;
}

.Leftside-bar {
	width: 206px;
	border-top-right-radius: 50px;
	border-bottom-right-radius: 50px;
}

@media screen and (max-width:1280px) {
	.screen1024 {
		display: none;
	}
}

@media screen and (max-width: 769px) {
	.Topbar-laptop {
		display: none;
	}

	.Topbar-TM {
		display: flex !important;
	}
}
</style>
