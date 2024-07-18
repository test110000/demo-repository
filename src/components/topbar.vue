<template>
	<div>
		<div class="top-bar" style="background-color: #CF2E2E;">
			<div class="full-width plr-20">
				<div class="top">
					<div class="display-img" id="display-img">
						<img :src="getImageForRoute" />
					</div>

					<!--left-->
					<nav class="navbar desktop_navbar" style="display: none;">
						<div class="container-fluid">

							<button class="navbar-toggler" type="button" data-bs-toggle="offcanvas"
								data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar"
								aria-label="Toggle navigation">
								<span class="navbar-toggler-icon"></span>
							</button>


							<div class="offcanvas offcanvas-start border-top-bottom-right-80px width-sidebar"
								tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
								<div class="offcanvas-header">
									<button type="button" class="btn-close" data-bs-dismiss="offcanvas"
										aria-label="Close"></button>
								</div>

								<div class="offcanvas-body">
									<ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
										<li class="nav-item">
											<h5 class="nav-link" :class="{ 'active': activeTitle === 'Results' }"
												@click="setActiveTitle('Results')">Results</h5>
										</li>
										<li class="nav-item">
											<a class="nav-link" href="/"
												:class="{ 'active': activeTitle === 'Dashboard' }"
												@click="setActiveTitle('Dashboard')">
												<img src="/image/dashboard.png"
													style="width: 25px; margin-right: 13px;">
												Dashboard
											</a>
										</li>
										<li style="margin-top: 20px;" class="nav-item">
											<h5 class="nav-link" :class="{ 'active': activeTitle === 'ToolBox' }"
												@click="setActiveTitle('ToolBox')">ToolBox</h5>
										</li>
										<li class="nav-item">
											<a class="nav-link" href="/spin-my-luck"
												:class="{ 'active': activeTitle === 'Spin My Luck' }"
												@click="setActiveTitle('Spin My Luck')">
												<img src="/image/spin.png" style="width: 25px; margin-right: 13px;">
												Spin My Luck
											</a>
										</li>
										<li class="nav-item">
											<a class="nav-link" href="/lucky-book"
												:class="{ 'active': activeTitle === 'Lucky Book' }"
												@click="setActiveTitle('Lucky Book')">
												<img src="/image/book.png" style="width: 25px; margin-right: 13px;">
												Lucky Book
											</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</nav>
					<!--top-->



					<div class="Logo_4D">
						<img class="d_num_logo" style="width: 80px; margin-right: -15px;"
							src="/image/4D-lottery-single.png">
						<img class="d_num_title" width="100" src="/image/4D-lottery-wording.png">
					</div>
					<div class="logo_col">
						<div class="logo" v-for="logo in filteredLogos" :key="logo.key">
							<a :href="'#'" @click.prevent="handleLogoClick(logo.key)">
								<img :id="`4D-${logo.key}`" width="40px" height="40px" :src="logo.src">
							</a>
						</div>
					</div>
					<div class="refresh-icon" style="position: relative; ">
						<div style="position: absolute; right: 12px; top: 4px;">
							<a class="refresh-arrow" href="#" @click.prevent="refreshPage">
								&#8635;
							</a>
						</div>
					</div>
					<div class="language-button">
						<button>
							<div class="icon">
								&#x1F310; <!-- Earth Globe with Meridians -->
							</div>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'TopBar',
	data() {
		return {
			intervalId: null,
			activeTitle: 'Dashboard',
			currentDate: new Date(),
			showDatePicker: false,
			logos: [
				{ key: 'M', src: '/image/magnum.svg' },
				{ key: 'D', src: '/image/damacai2.svg' },
				{ key: 'T', src: '/image/toto.svg' },
				{ key: 'S', src: '/image/sg.svg' },
				{ key: 'ST', src: '/image/sandakan.svg' },
				{ key: 'SB', src: '/image/diriwan.svg' },
				{ key: 'SW', src: '/image/ssc.svg' },
				{ key: 'G', src: '/image/gd.svg' },
				{ key: 'H', src: '/image/lhh.svg' },
				{ key: 'P', src: '/image/pdn.svg' }
			],
			images: {
				'/': '/image/dashboard-topbar.svg',
				'/spin-my-luck': '/image/spin-topbar.svg',
				'/lucky-book': '/image/book-topbar.svg',
				// Add more routes and corresponding images
			},
		};
	},
	mounted() {
		this.intervalId = setInterval(this.checkTime, 1000);
	},
	beforeDestroy() {
		clearInterval(this.intervalId);
	},
	methods: {
		setActiveTitle(title) {
			this.activeTitle = title;
		},
		checkTime() {
			const now = new Date();
			const options = { hour12: false }; // 24-hour format
			const currentTime = now.toLocaleTimeString('en-GB', options);

			const targetTime = "19:30:00";
			if (currentTime < targetTime) {
				this.performAction();
			} else {
				this.performAction2();
			}
		},
		performAction() {

		},
		performAction2() {

		},
		openDatePicker() {
			this.showDatePicker = true;
		},
		selectDate(date) {
			this.currentDate = date;
			this.showDatePicker = false;
		},
		selectNewDate(event) {
			const selectedDate = new Date(event.target.value);
			this.currentDate = selectedDate;
		},
		refreshPage() {
			window.location.reload();
		},
		handleLogoClick(index) {
			this.$emit('logo-clicked', `${index}`);
		}
	},
	computed: {
		formattedDate() {
			const isoDate = this.currentDate.toISOString().split('T')[0];
			return isoDate;
		},
		currentLanguage() {
			return this.$store ? this.$store.state.currentLanguage : 'en';
		},
		filteredLogos() {
			const now = new Date();
			const currentTime = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();

			const targetTime1 = 15 * 3600 + 30 * 60; // 15:30:00 in seconds
			const targetTime2 = 19 * 3600 + 30 * 60; // 19:30:00 in seconds

			if (currentTime < targetTime1) {
				return this.logos.filter(logo => logo.key !== 'H1' && logo.key !== 'PL1');
			} else if (currentTime < targetTime2) {
				return this.logos.filter(logo => logo.key !== 'H2' && logo.key !== 'PL2');
			} else {
				return this.logos.filter(logo => logo.key !== 'H1' && logo.key !== 'PL1');
			}
		},
		currentRoute() {
			return this.$route.path;
		},
		getImageForRoute() {
			return this.images[this.currentRoute] || '/public/image/dashboard-topbar.svg'; // Default image path
		},
	}
};
</script>

<style scoped>
@media screen and (min-width:770px) {
	.hide {
		display: none;
	}
}

.Logo_4D {
	display: flex;
	-webkit-box-align: center;
	align-items: center;
	flex-direction: row;
	gap: 0.5rem;
}

.d_num_logo {
	width: 35px;
	height: auto;
	border-radius: 50%;
}

.top-bar {
	height: 70px;
	position: fixed;
	top: 0;
	right: 0;
	width: 100%;
	align-content: center;
	z-index: 9999;
}

@media screen and (min-width: 1281px) {
	.top-bar {
		width: calc(100% - 206px);
	}
}

@media screen and (max-width: 769px) {
	.top-bar {
		position: unset;
	}
}

.top {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.display-img {
	width: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
}

@media screen and (max-width: 1280px) {
	.top {
		width: 100%;
	}

	.navbar {
		display: block !important;
	}

	.Logo_4D {
		display: flex !important;
	}

	.display-img {
		display: none !important;
	}

	.logo_col {
		width: auto !important;
	}

	.logo img {
		width: 35px;
		height: 35px;
	}
}

@media screen and (max-width: 1020px) {
	.d_num_title {
		display: none;
	}

	.refresh-icon {
		display: none !important;
	}
}

@media screen and (max-width:769px) {
	.logo_col {
		display: none !important;
	}

	.d_num_title {
		display: block !important;
	}
}

.logo_col {
	width: 50%;
	width: 600px;
	gap: 0.75rem;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: white;
	padding: 8px 4px;
	border-radius: 20px;
	box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 6px;
}

.logo {
	background-color: white !important;
	border-radius: 50%;
	box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 2px;
	cursor: pointer;
}

@media screen and (max-width: 955px) {
	.logo img {
		width: 30px;
		height: 30px;
	}

	.logo_col {
		gap: 0.25rem;
	}
}

@media screen and (max-width:545px) {
	.custom-date-input {
		display: none !important;
	}
}

.custom-date-input {
	display: flex;
	box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 6px;
	border: 0;
	background-color: white;
	height: 40px;
	padding: 0 20px;
	border-radius: 10px;
}

.full-width {
	width: 100%;
}

.plr-20 {
	padding: 0 20px;
}

.language-button button {
	background: none;
	border: none;
	cursor: pointer;
}

.navbar-brand img {
	vertical-align: middle;
}

.navbar-brand {
	display: flex;
	align-items: center;
}

.navbar-brand span {
	margin-left: 10px;
}

.nav-item h5 {
	font-size: 14px;
	padding-bottom: 6px;
	padding-top: 6px;
	color: rgb(0, 0, 0) !important;
	font-weight: 700;
}

.nav-link {
	display: flex;
}

.nav-link h5 {
	margin: 0;
	font-size: 1.25rem;
	padding-bottom: 20px;
	padding-top: 6px;
	color: rgb(243, 6, 6) !important;
	font-weight: 700;
}

.navbar-nav .nav-link img {
	vertical-align: middle;
}

.offcanvas-header .btn-close {
	margin-top: 25px;
	margin-left: 80%;
}

.width-sidebar {
	width: 320px !important;
}

.border-top-bottom-right-80px {
	border-bottom-right-radius: 50px;
	border-top-right-radius: 50px;
}

.refresh-icon {
	font-size: 24px;
	color: #CF2E2E;
	background-color: #FFFFFF;
	border: 2px solid #CF2E2E;
	border-radius: 50%;
	padding: 10px;
	width: 50px;
	height: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	box-shadow: 0 2px 5px rgba(255, 0, 0, 0.1);
}

.refresh-arrow {
	display: contents;
	color: #CF2E2E;
	align-self: center;
}

.icon {
	font-size: 24px;
	mix-blend-mode: color-dodge;
	width: 50px;
	height: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
}

.navbar-toggler-icon {
	background-image: url("data:image/svg+xml;charset=UTF8,%3csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3e%3cpath stroke='rgba%28255, 255, 255, 1%29' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}

.navbar-toggler {
	color: #CF2E2E;
	border: none;
}

.active {
	color: rgb(38, 76, 170);
	/* Define your active text color */
}
</style>