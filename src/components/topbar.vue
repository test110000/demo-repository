<template>
	<div class="top-bar" style="background-color: #CF2E2E;">
		<div class="full-width plr-20">
			<div class="top">
				<a class="display-img" href="#">
					&#x2630;
				</a>
				<nav class="navbar" style="display: none;">
					<div class="container-fluid">
						<button class="navbar-toggler" type="button" data-bs-toggle="offcanvas"
							data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar"
							aria-label="Toggle navigation">
							<span class="navbar-toggler-icon"></span>
						</button>
						<div class="offcanvas offcanvas-start border-top-bottom-right-80px width-sidebar" tabindex="-1"
							id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
							<div class="offcanvas-header">
								<button type="button" class="btn-close" data-bs-dismiss="offcanvas"
									aria-label="Close"></button>
							</div>
							<div class="offcanvas-body">
								<ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
									<li class="nav-item">
										<h5 class="nav-link">Results</h5>
									</li>
									<li class="nav-item">
										<a class="nav-link" href="#">
											<img src="/public/image/dashboard.png"
												style="width: 25px; margin-right: 13px;">
											Dashboard
										</a>
									</li>
									<li style="margin-top: 20px;" class="nav-item">
										<h5 class="nav-link">ToolBox</h5>
									</li>
									<li class="nav-item">
										<a class="nav-link" href="#">
											<img src="/public/image/spin.png" style="width: 25px; margin-right: 13px;">
											Spin My Luck
										</a>
									</li>
									<li class="nav-item">
										<a class="nav-link" href="#">
											<img src="/public/image/book.png" style="width: 25px; margin-right: 13px;">
											Lucky Book
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</nav>

				<div class="Logo_4D" style="display: none;">
					<img class="d_num_logo" style="width: 80px; margin-right: -15px;"
						src="/public/image/4D-lottery-single.png">
					<img class="d_num_title" width="100" src="/public/image/4D-lottery-wording.png">
				</div>
				<div class="logo_col">
					<div class="logo">
						<a href="#"><img width="40px" height="40px" src="/public/image/magnum.svg"></a>
					</div>
					<div class="logo">
						<a href="#"><img width="40px" height="40px" src="/public/image/damacai2.svg"></a>
					</div>
					<div class="logo">
						<a href="#"><img width="40px" height="40px" src="/public/image/toto.svg"></a>
					</div>
					<div class="logo">
						<a href="#"><img width="40px" height="40px" src="/public/image/sg.svg"></a>
					</div>
					<div class="logo">
						<a href="#"><img width="40px" height="40px" src="/public/image/sandakan.svg"></a>
					</div>
					<div class="logo">
						<a href="#"><img width="40px" height="40px" src="/public/image/diriwan.svg"></a>
					</div>
					<div class="logo">
						<a href="#"><img width="40px" height="40px" src="/public/image/ssc.svg"></a>
					</div>
					<div class="logo">
						<a href="#"><img width="40px" height="40px" src="/public/image/lhh.svg"></a>
					</div>
					<div class="logo">
						<a href="#"><img width="40px" height="40px" src="/public/image/pdn.svg"></a>
					</div>
					<div class="logo">
						<a href="#"><img width="40px" height="40px" src="/public/image/gd.svg"></a>
					</div>
				</div>
				<input type="date" v-model="formattedDate" @input="selectNewDate" class="custom-date-input">
				<div class="refresh-icon" style="position: relative; ">
					<div style="position: absolute; right: 12px; top: 4px;">
						<a class="refresh-arrow" href="#" @click.prevent="refreshPage">
							&#x21BA;
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
</template>

<script>
export default {
	name: 'TopBar',
	data() {
		return {
			currentDate: new Date(),
			showDatePicker: false, // Flag to show/hide date picker
		};
	},
	methods: {
		openDatePicker() {
			this.showDatePicker = true;
		},
		selectDate(date) {
			this.currentDate = date;
			this.showDatePicker = false; // Hide the date picker after selection
		},
		selectNewDate(event) {
			const selectedDate = new Date(event.target.value);
			this.currentDate = selectedDate;
		},
		refreshPage() {
			window.location.reload(); // Reloads the current page
		},
	},
	computed: {
		formattedDate() {
			// Return formatted date for displaying in the input
			const isoDate = this.currentDate.toISOString().split('T')[0]; // Get yyyy-mm-dd format
			return isoDate;
		},
		currentLanguage() {
			return this.$store ? this.$store.state.currentLanguage : 'en'; // Default to 'en' if store is not available
		},
	},
};
</script>

<style scoped>
.Logo_4D {
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
	height: 65px;
	position: fixed;
	top: 0;
	width: 100%;
	align-content: center;
}

.top {
	left: 206px;
	width: calc(100% - 206px);
	display: flex;
	justify-content: space-between;
	align-items: center;
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
}



.display-img {
	color: white;
	display: contents;
	font-size: 30px;
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
	color: rgb(0, 0, 0) !important;
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
	/* Size of the icon */
	color: #CF2E2E;
	/* Arrow color */
	background-color: #ffffff;
	/* White background */
	border: 2px solid #CF2E2E;
	/* Border to define the circle */
	border-radius: 50%;
	/* Round shape */
	padding: 10px;
	width: 50px;
	height: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
	/* Optional shadow for better visibility */
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
</style>
