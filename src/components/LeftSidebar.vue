<template>
	<div class="left-sidebar">
		<div class="container-fluid">
			<!--leftside-->
			<div class="sidebar" style="background-color: #CF2E2E;">
				<div style="background: white; height: 100%; border-top-right-radius: 50px;">
					<div class="logo_col">
						<img class="d_num_logo" src="/public/image/4D-lottery-wording.png">
					</div>
					<div class="sidebar-main">
						<p class="results_install_app_text">Results</p>
						<br>
						<div class="menu">
							<!--dashboard-->
							<div class="text_col">
								<router-link to="/" exact active-class="active-link"
									@click.native="updateImage('dashboard', '/public/image/DashboardActive.svg')">
									<img class="pic" :src="imageSrc.dashboard">
									<p :style="{ color: activeTab === 'dashboard' ? 'rgb(38, 76, 170)' : '' }"
										class="text_menu">Dashboard</p>
								</router-link>
							</div>
						</div>
						<br><br>
						<p class="toolbox_text">Toolbox</p>
						<br>
						<!--Spin My Luck-->
						<div class="menu">
							<div class="text_col">
								<router-link to="/spin-my-luck" exact active-class="active-link"
									@click.native="updateImage('spin', '/public/image/SpinLuckActive.png')">
									<img class="pic" :src="imageSrc.spin">
									<p :style="{ color: activeTab === 'spin' ? 'rgb(38, 76, 170)' : '' }"
										class="text_menu">Spin My Luck</p>
								</router-link>
							</div>
						</div>
						<br>
						<!--Lucky Book-->
						<div class="menu">
							<div class="text_col">
								<router-link to="/lucky-book" exact active-class="active-link"
									@click.native="updateImage('book', '/public/image/LuckyBookActive.png')">
									<img class="pic" :src="imageSrc.book">
									<p :style="{ color: activeTab === 'book' ? 'rgb(38, 76, 170)' : '' }"
										class="text_menu">Lucky Book</p>
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
				dashboard: '/public/image/DashboardActive.svg',
				spin: '/public/image/spin.png',
				book: '/public/image/book.png'
			},
			activeTab: 'dashboard' // Default active tab is 'dashboard'
		};
	},
	methods: {
		updateImage(type) {
			if (type === 'dashboard') {
				this.imageSrc.dashboard = '/public/image/DashboardActive.svg';
				this.imageSrc.spin = '/public/image/spin.png';
				this.imageSrc.book = '/public/image/book.png';
			} else if (type === 'spin') {
				this.imageSrc.dashboard = '/public/image/dashboard.png';
				this.imageSrc.spin = '/public/image/SpinLuckActive.png';
				this.imageSrc.book = '/public/image/book.png';
			} else if (type === 'book') {
				this.imageSrc.dashboard = '/public/image/dashboard.png';
				this.imageSrc.spin = '/public/image/spin.png';
				this.imageSrc.book = '/public/image/LuckyBookActive.png';
			}
			this.activeTab = type; // Update active tab
		}
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
	/* padding-top: 20px;
	padding-left: 25px;
	padding-right: 5px; */
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	overflow-y: auto;
	border-bottom-right-radius: 50px;
}

.sidebar-main {
	padding-top: 20px;
	padding-left: 25px;
	padding-right: 5px
}

.pic {
	width: 20px;
}

.text_menu {
	text-decoration: none;
	text-align: left;
	font-size: 17px;
	color: gray;
	margin-left: 10px;
	font-weight: 500;
}

.menu {
	width: 100%;
	height: 17px;
	font-weight: 500;
	font-size: 28px;
	line-height: 19px;
	-webkit-box-align: center;
	align-items: center;
	color: rgb(38, 76, 170);
	border-radius: 4px;
	cursor: unset;
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
	/* padding-bottom: 20px; */
	color: rgb(0, 0, 0);
}

.text_col {
	display: ruby;
}

.active-link .text_menu {
	color: rgb(38, 76, 170);
	/* Change text color when active */
}
</style>
