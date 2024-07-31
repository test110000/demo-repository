<template>
	<div class="left-sidebar">
		<div class="container-fluid">
			<!--leftside-->
			<div class="sidebar" style="background-color: #CF2E2E;">
				<div style="background: white; height: 100%; border-top-right-radius: 50px;">
					<div class="logo_col">
						<img class="d_num_logo" src="/image/4D-lottery-wording.png">
					</div>
					<div class="sidebar-main">
						<p class="results_install_app_text">{{ $t('Sidebar.Result') }}</p>
						<div class="menu">
							<!--dashboard-->
							<div class="text_col">
								<router-link to="/" exact active-class="active-link">
									<img class="pic" :src="imageSrc.dashboard">
									<p :style="{ color: activeTab === 'dashboard' ? 'rgb(207, 46, 46)' : '' }"
										class="text_menu">{{ $t('Sidebar.Dashboard') }}</p>
								</router-link>
							</div>
						</div>
						<br>
						<p class="toolbox_text">{{ $t('Sidebar.ToolBox') }}</p>
						<!--Spin My Luck-->
						<div class="menu">
							<div class="text_col">
								<router-link to="/spin-my-luck" exact active-class="active-link">
									<img class="pic" :src="imageSrc.spin">
									<p :style="{ color: activeTab === 'spin' ? 'rgb(207, 46, 46)' : '' }"
										class="text_menu">{{ $t('Sidebar.Spin My Luck') }}</p>
								</router-link>
							</div>
						</div>
						<!--Lucky Book-->
						<div class="menu">
							<div class="text_col">
								<router-link to="/lucky-book" exact active-class="active-link">
									<img class="pic" :src="imageSrc.book">
									<p :style="{ color: activeTab === 'book' ? 'rgb(207, 46, 46)' : '' }"
										class="text_menu">{{ $t('Sidebar.Lucky Book') }}</p>
								</router-link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'LeftBar',
	data() {
		return {
			imageSrc: {
				dashboard: '/image/dashboard.webp',
				spin: '/image/spin.webp',
				book: '/image/book.webp'
			},
			activeTab: '' // Initially empty
		};
	},
	methods: {

	}
}
</script>

<style scoped>
/*4D Logo*/
.logo_col {
	display: flex;
	justify-content: center;
}

.d_num_logo {
	padding-top: 20px;
	width: 120px;
	height: auto;
}

/*sidebar*/
.sidebar {
	width: 206px;
	background-color: #ffffff;
	color: #fff;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	overflow-y: auto;
	z-index: 9999;
}

.sidebar-main {
	padding-top: 20px;
	padding-left: 25px;
	padding-right: 5px
}

.pic {
	width: 20px;
	height: 19px;
}

.text_menu {
	text-decoration: none;
	text-align: left;
	font-size: 17px;
	color: gray;
	margin-left: 10px;
	font-weight: 500;
	margin-bottom: 0 !important;
}

.menu {
	width: 100%;
	font-weight: 500;
	font-size: 28px;
	line-height: 19px;
	-webkit-box-align: center;
	align-items: center;
	color: rgb(38, 76, 170);
	border-radius: 4px;
	cursor: unset;
	align-content: center;
	height: 40px;
}

.menu:hover {
	background-color: rgb(243, 243, 243);
}

.sidebar ul li {
	padding: 8px;
	text-align: left;
	text-decoration: none;
}

.sidebar ul li a {
	color: rgb(248, 247, 247);
	text-decoration: none;
	display: block;
}

.sidebar ul li a :hover {
	background-color: #ffffff;
}

.toolbox_text {
	height: 16px;
	position: relative;
	font-weight: 700;
	font-size: 16px;
	line-height: 16px;
	-webkit-box-align: center;
	align-items: center;
	color: rgb(0, 0, 0);
	padding-bottom: 0 !important;
}

.results_install_app_text {
	height: 16px;
	position: relative;
	font-weight: 700;
	font-size: 16px;
	line-height: 16px;
	-webkit-box-align: center;
	align-items: center;
	padding-top: 40px;
	padding-bottom: 20px;
	color: rgb(0, 0, 0);
}

.text_col {
	display: ruby;
}

.active-link .text_menu {
	color: rgb(207, 46, 46);
	font-weight: 700;
}
</style>
