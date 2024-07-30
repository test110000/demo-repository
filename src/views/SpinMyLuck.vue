<template>

	<div>
		<TopBar />
	</div>

	<div class="container">
		<div style="text-align: -webkit-center;" class="col-12 spincol">
			<div class="lucky_col">
				<div class="luckyspin_bg">
					<!--this is title-->
					<p>{{ $t('Sidebar.Spin My Luck') }}</p>
				</div>

				<div class="all_spincol">
					<!-- 4D number -->
					<div class="num4d_col">
						<div class="num4d_col_sm">
							<div class="num4d">
								<p>4D {{ $t('SpinMyLuck.NUMBER') }}</p>
							</div>
							<div class="spinner-column_bg">
								<div v-for="(column, columnIndex) in columns" :key="columnIndex" class="spinner-column">
									<div v-for="number in column" :key="number" class="spinner-number"
										:style="{ transform: 'translateY(' + spins[columnIndex] + 'px)' }">
										{{ number }}
									</div>
								</div>
							</div>
						</div>
					</div>
					<button class="btn_4d" @click="toggleSpinStop">{{ $t('SpinMyLuck.Spin') }}</button>

					<!-- 6D number -->
					<div class="num4d_col2">
						<div class="num4d_col">
							<div class="num4d_col_sm">
								<div class="num4d">
									<p>6D {{ $t('SpinMyLuck.NUMBER') }}</p>
								</div>
								<div class="spinner-column_bg">
									<div v-for="(column, columnIndex) in columns2" :key="columnIndex"
										class="spinner-column">
										<div v-for="number in column" :key="number" class="spinner-number "
											:style="{ transform: 'translateY(' + spins2[columnIndex] + 'px)' }">
											{{ number }}
										</div>
									</div>
								</div>
							</div>
						</div>
						<button class="btn_4d" @click="toggleSpinStop2">{{ $t('SpinMyLuck.Spin') }}</button>
					</div>


					<!-- jackpot number -->
					<div class="num4d_col2">
						<div class="num4d_col">
							<div class="num4d_col_sm">
								<div class="num4d">
									<p>{{ $t('SpinMyLuck.JACKPOT NUMBER') }}</p>
								</div>
								<div class="spinner-column_bg">
									<div v-for="(column, columnIndex) in columns3" :key="columnIndex"
										class="spinner-column">
										<div v-for="number in column" :key="number" class="spinner-number"
											:style="{ transform: 'translateY(' + spins3[columnIndex] + 'px)' }">
											{{ number }}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<button class="btn_4d" @click="toggleSpinStop3">{{ $t('SpinMyLuck.Spin') }}</button>
				</div>


			</div>
		</div>
		<div class="go_up_btn">
			<a @click.prevent="scrollToTop" :class="{ 'scroll-icon': true, 'show': showIcon, 'hide': !showIcon }"
				href="#">
				<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor"
					class="bi bi-arrow-up-circle-fill" viewBox="0 0 16 16">
					<path
						d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0m-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z" />
				</svg>
			</a>
		</div>
	</div>
</template>

<script>

import TopBar from '/src/components/topbar.vue';

export default {
	components: {
		TopBar,
	},
	name: 'SpinMyLuck',
	data() {
		return {
			showIcon: false,
			scrollTimeout: null,
			columns: [
				Array.from({ length: 10 }, (_, i) => i),
				Array.from({ length: 10 }, (_, i) => i),
				Array.from({ length: 10 }, (_, i) => i),
				Array.from({ length: 10 }, (_, i) => i)
			],
			spins: [0, 0, 0, 0], // Track spin positions for each column

			columns2: [
				Array.from({ length: 10 }, (_, i) => i),
				Array.from({ length: 10 }, (_, i) => i),
				Array.from({ length: 10 }, (_, i) => i),
				Array.from({ length: 10 }, (_, i) => i),
				Array.from({ length: 10 }, (_, i) => i),
				Array.from({ length: 10 }, (_, i) => i)
			],
			spins2: [0, 0, 0, 0, 0, 0], // Track spin positions for each column

			columns3: [
				Array.from({ length: 100 }, (_, i) => ('0' + i).slice(-2)), // Generating two-digit numbers 00-99
				Array.from({ length: 100 }, (_, i) => ('0' + i).slice(-2)),
				Array.from({ length: 100 }, (_, i) => ('0' + i).slice(-2)),
				Array.from({ length: 100 }, (_, i) => ('0' + i).slice(-2)),
				Array.from({ length: 100 }, (_, i) => ('0' + i).slice(-2)),
				Array.from({ length: 100 }, (_, i) => ('0' + i).slice(-2))
			],
			spins3: [0, 0, 0, 0, 0, 0], // Track spin positions for each column

			columnHeight: 100, // Height of each number element
			spinning: false, // Flag to track if spinning or stopped
			spinTimeouts: [], // Array to store setTimeout IDs for stopping the spin
			stoppedColumns: [false, false, false, false], // Track stopped state of each column
			spinIntervals: [], // Array to store setInterval IDs for continuous spin

			spinning2: false, // Flag to track if spinning or stopped
			spinTimeouts2: [], // Array to store setTimeout IDs for stopping the spin
			stoppedColumns2: [false, false, false, false, false, false], // Track stopped state of each column
			spinIntervals2: [], // Array to store setInterval IDs for continuous spin

			spinning3: false, // Flag to track if spinning or stopped
			spinTimeouts3: [], // Array to store setTimeout IDs for stopping the spin
			stoppedColumns3: [false, false, false, false, false, false], // Track stopped state of each column
			spinIntervals3: [], // Array to store setInterval IDs for continuous spin
		};
	},
	computed: {
		buttonLabel() {
			return this.spinning ? 'Stop' : 'Spin';
		},
		buttonLabel2() {
			return this.spinning2 ? 'Stop' : 'Spin';
		},
		buttonLabel3() {
			return this.spinning3 ? 'Stop' : 'Spin';
		},
	},
	mounted() {
		// 监听滚动事件
		window.addEventListener('scroll', this.handleScroll);
		this.intervalId = setInterval(this.checkTime, 1000);
	},
	beforeDestroy() {
		// 移除滚动事件监听
		window.removeEventListener('scroll', this.handleScroll);
		clearInterval(this.intervalId);
	},
	methods: {
		handleScroll() {
			// 如果已经有计时器，清除它
			if (this.scrollTimeout) {
				clearTimeout(this.scrollTimeout);
			}

			// 显示图标
			this.showIcon = true;

			// 在5秒后隐藏图标
			this.scrollTimeout = setTimeout(() => {
				this.showIcon = false;
			}, 2000);
		},
		scrollToTop() {
			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			});
		},
		toggleSpinStop() {
			if (this.spinning) {
				this.stopRandomly();
			} else {
				this.spin();
			}
		},
		spin() {
			// Reset the spinner before spinning
			this.resetSpinner();

			const minSpin = 10 * this.columnHeight; // Minimum spin to ensure at least one full spin

			// Start the spin for each column
			this.columns.forEach((_, index) => {
				this.startSpin(index, minSpin);
			});

			// Update spinning flag
			this.spinning = true;
		},
		startSpin(index, minSpin) {
			this.spinIntervals[index] = setInterval(() => {
				this.spins[index] -= this.columnHeight; // Move to the next number quickly
				// Loop back to the start
				if (this.spins[index] <= -this.columnHeight * 9) {
					this.spins[index] = 0;
				}
			}, 100); // Spin speed: Adjust this interval for faster/slower spin

			// Schedule stopping the spin
			this.spinTimeouts[index] = setTimeout(() => {
				const randomSpin = Math.floor(Math.random() * 10) * this.columnHeight;
				clearInterval(this.spinIntervals[index]);
				this.stopColumn(index, randomSpin);
			}, (index + 1) * 1000); // Delay each column stop by 3 seconds

		},
		stopRandomly() {
			if (this.spinning) {
				// Immediately stop each column at its respective stop position if not already stopped
				this.columns.forEach((_, index) => {
					if (!this.stoppedColumns[index]) {
						const randomStopPos = Math.floor(Math.random() * 10) * this.columnHeight;
						clearInterval(this.spinIntervals[index]);
						this.stopColumn(index, randomStopPos);
					}
				});

				// Clear all timeouts to stop any scheduled stops
				this.spinTimeouts.forEach(timeout => clearTimeout(timeout));

				// Update spinning flag
				this.spinning = false;
			}

		},
		stopColumn(index, stopPos) {
			this.spins[index] = -stopPos;
			this.stoppedColumns[index] = true; // Mark the column as stopped

			// Check if all columns have stopped
			if (this.stoppedColumns.every(stopped => stopped)) {
				this.spinning = false;
			}
		},
		resetSpinner() {
			this.spins = [0, 0, 0, 0];
			this.stoppedColumns = [false, false, false, false];
			this.spinTimeouts.forEach(timeout => clearTimeout(timeout));
			this.spinIntervals.forEach(interval => clearInterval(interval));
		},

		toggleSpinStop2() {
			if (this.spinning2) {
				this.stopRandomly2();
			} else {
				this.spin2();
			}
		},
		spin2() {
			// Reset the spinner before spinning
			this.resetSpinner2();

			const minSpin = 10 * this.columnHeight; // Minimum spin to ensure at least one full spin

			// Start the spin for each column
			this.columns2.forEach((_, index) => {
				this.startSpin2(index, minSpin);
			});

			// Update spinning flag
			this.spinning2 = true;
		},
		startSpin2(index, minSpin) {
			this.spinIntervals2[index] = setInterval(() => {
				this.spins2[index] -= this.columnHeight; // Move to the next number quickly
				// Loop back to the start
				if (this.spins2[index] <= -this.columnHeight * 9) {
					this.spins2[index] = 0;
				}
			}, 100); // Spin speed: Adjust this interval for faster/slower spin

			// Schedule stopping the spin
			this.spinTimeouts2[index] = setTimeout(() => {
				const randomSpin = Math.floor(Math.random() * 10) * this.columnHeight;
				clearInterval(this.spinIntervals2[index]);
				this.stopColumn2(index, randomSpin);
			}, (index + 1) * 1000); // Delay each column stop by 3 seconds
		},
		stopRandomly2() {
			if (this.spinning2) {
				// Immediately stop each column at its respective stop position if not already stopped
				this.columns2.forEach((_, index) => {
					if (!this.stoppedColumns2[index]) {
						const randomStopPos = Math.floor(Math.random() * 10) * this.columnHeight;
						clearInterval(this.spinIntervals2[index]);
						this.stopColumn2(index, randomStopPos);
					}
				});

				// Clear all timeouts to stop any scheduled stops
				this.spinTimeouts2.forEach(timeout => clearTimeout(timeout));

				// Update spinning flag
				this.spinning2 = false;
			}
		},
		stopColumn2(index, stopPos) {
			this.spins2[index] = -stopPos;
			this.stoppedColumns2[index] = true; // Mark the column as stopped

			// Check if all columns have stopped
			if (this.stoppedColumns2.every(stopped => stopped)) {
				this.spinning2 = false;
			}
		},
		resetSpinner2() {
			this.spins2 = [0, 0, 0, 0, 0, 0];
			this.stoppedColumns2 = [false, false, false, false, false, false];
			this.spinTimeouts2.forEach(timeout => clearTimeout(timeout));
			this.spinIntervals2.forEach(interval => clearInterval(interval));
		},

		toggleSpinStop3() {
			if (this.spinning3) {
				this.stopRandomly3();
			} else {
				this.spin3();
			}
		},
		spin3() {
			// Reset the spinner before spinning
			this.resetSpinner3();

			const minSpin = 10 * this.columnHeight; // Minimum spin to ensure at least one full spin

			// Start the spin for each column
			this.columns3.forEach((_, index) => {
				this.startSpin3(index, minSpin);
			});

			// Update spinning flag
			this.spinning3 = true;
		},
		startSpin3(index, minSpin) {
			this.spinIntervals3[index] = setInterval(() => {
				this.spins3[index] -= this.columnHeight; // Move to the next number quickly
				// Loop back to the start
				if (this.spins3[index] <= -this.columnHeight * 99) {
					this.spins3[index] = 0;
				}
			}, 100); // Spin speed: Adjust this interval for faster/slower spin

			// Schedule stopping the spin
			this.spinTimeouts3[index] = setTimeout(() => {
				const randomSpin = Math.floor(Math.random() * 100) * this.columnHeight;
				clearInterval(this.spinIntervals3[index]);
				this.stopColumn3(index, randomSpin);
			}, (index + 1) * 1000); // Delay each column stop by 3 seconds
		},
		stopRandomly3() {
			if (this.spinning3) {
				// Immediately stop each column at its respective stop position if not already stopped
				this.columns3.forEach((_, index) => {
					if (!this.stoppedColumns3[index]) {
						const randomStopPos = Math.floor(Math.random() * 100) * this.columnHeight;
						clearInterval(this.spinIntervals3[index]);
						this.stopColumn3(index, randomStopPos);
					}
				});

				// Clear all timeouts to stop any scheduled stops
				this.spinTimeouts3.forEach(timeout => clearTimeout(timeout));

				// Update spinning flag
				this.spinning3 = false;
			}
		},
		stopColumn3(index, stopPos) {
			this.spins3[index] = -stopPos;
			this.stoppedColumns3[index] = true; // Mark the column as stopped

			// Check if all columns have stopped
			if (this.stoppedColumns3.every(stopped => stopped)) {
				this.spinning3 = false;
			}
		},
		resetSpinner3() {
			this.spins3 = [0, 0, 0, 0, 0, 0];
			this.stoppedColumns3 = [false, false, false, false, false, false];
			this.spinTimeouts3.forEach(timeout => clearTimeout(timeout));
			this.spinIntervals3.forEach(interval => clearInterval(interval));
		},
		goToDashboard() {
			this.$router.push('/');
		},
		goToSpinMyLuck() {
			this.$router.push('/spin-my-luck');
		},
		goToLuckyBook() {
			this.$router.push('/lucky-book');
		},
	}
}
</script>

<style scoped>
.spincol {
	margin-top: 73px;
}

@media screen and (max-width:768px) {
	.spincol {
		margin-top: 10px;
	}
}

.mobile-menu-page-button-container {
	padding-left: 20px;
}

@media screen and (min-width: 769px) {
	.mobile-menu-page-button-container {
		display: none;
	}
}

.menu-icon {
	font-size: 20px !important;
	background-color: white !important;
	opacity: 0.8 !important;
	border-radius: 50%;
	width: 30px !important;
	height: 30px !important;
}



.luckyspin_bg {
	background-color: #CF2E2E;
	color: white;
	height: 130px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-top-right-radius: 15px;
	border-top-left-radius: 15px;
	border-bottom-left-radius: 35px;
	border-bottom-right-radius: 35px;
	font-weight: bold;
	font-size: 42px;
}

.lucky_col {
	width: 100%;
	text-align: center;
	text-align: -webkit-center;
	background: rgb(255, 255, 255);
	border-top-right-radius: 25px;
	border-top-left-radius: 25px;
}

@media (min-width: 1024px) {
	.lucky_col {
		width: 70%;
	}
}

@media screen and (max-width: 770px) {
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

.num4d_col {
	display: flex;
	justify-content: center;
	width: 100%;
	margin-top: -10px;
}

.num4d_col2 {
	margin-top: -100px;
	margin-bottom: 40px;
}

.num4d_col_sm {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	border-radius: 50px;
	width: 90%;

}

.navbar-toggler {
	color: #CF2E2E;
	border: none;
}

.navbar-toggler-icon {
	float: inline-start;
	background-image: url("/image/menu-sm.svg");
}

.navbar-toggler {
	color: #CF2E2E;
	border: none;
}

.navbar-nav .nav-link img {
	vertical-align: middle;
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

.num4d {
	background-color: #CF2E2E;
	color: white;
	height: 48px;
	width: 50%;
	padding: 0 20px;
	border-radius: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	top: 25px;
	font-weight: bold;
	font-size: 20px;
}

.spinner-column_bg {
	display: flex;
	justify-content: center;
	background-color: #ffffff;
	border: 2px solid #CF2E2E;
	height: 250px;
	align-items: center;
	width: 90%;
	border-radius: 35px;
	overflow: hidden;
}

@media screen and (max-width:768px) {
	.spinner-column_bg {
		height: 175px;
	}
}

.spinner-column {
	position: relative;
	width: 10%;
	height: 29%;
	overflow: hidden;
	border: 2px solid #CF2E2E;
	margin: 0 3px;
	border-radius: 10px;
}


.spinner-number {
	width: 100%;
	height: 100px;
	display: flex;
	justify-content: center;
	font-size: 48px;
	transition: transform 0.1s linear;
	font-weight: bold;
}

.btn_4d {
	margin-bottom: 15px;
	margin-top: 20px;
	padding: 10px 20px;
	background-color: #CF2E2E;
	color: white;
	border: 2px solid white;
	border-radius: 109px;
	cursor: pointer;
	transition: background-color 0.3s ease;
	position: relative;
	top: -71px;
	font-weight: bold;
	height: 130px;
	width: 15%;
	font-size: 27px;
	display: flex;
	justify-content: center;
	align-items: center;
}

button:hover {
	background-color: #CF2E2E;
}

button:disabled {
	background-color: #ccc;
	cursor: not-allowed;
}

p {
	margin: 0;
}

/* Media Queries for responsiveness */
@media (max-width: 1200px) {
	.btn_4d {
		width: 16%;
		font-size: 24px;
		height: 127px;
	}

	.spinner-number {
		font-size: 40px;
	}
}

@media (max-width: 992px) {
	.btn_4d {
		width: 18%;
		font-size: 20px;
		height: 107px;
	}

	.num4d {
		font-size: 18px;
	}

	.spinner-number {
		font-size: 36px;
	}

	.spinner-column {
		width: 80px;
		height: 80px;
	}

}

@media (max-width: 768px) {
	.btn_4d {
		width: 22%;
		font-size: 18px;
		height: 95px;
	}

	.num4d {
		font-size: 16px;
	}

	.spinner-number {
		font-size: 32px;
	}

	.spinner-column {
		width: 60px;
		height: 60px;
	}

}

@media (max-width: 576px) {
	.btn_4d {
		width: 96px;
		font-size: 16px;
	}

	.num4d {
		font-size: 14px;
	}

	.spinner-number {
		font-size: 28px;
	}

	.spinner-column {
		width: 40px;
		height: 40px;
	}
}

.go_up_btn {
	position: fixed;
	right: 60px;
	bottom: 15px;
	background-color: #ffffff;
	border-radius: 50px;
	z-index: 999;
	opacity: 0.8;

}

.go_up_btn :hover {
	color: #CF2E2E;
	opacity: 1;
}

.go_up_btn a {
	color: #CF2E2E;
}

@media screen and (min-width:1440px) {
	.go_up_btn {
		right: 253px;
	}
}

@media screen and (min-width:2560px) {
	.go_up_btn {
		right: 800px;
	}
}

.scroll-icon {
	position: fixed;
	bottom: 20px;
	opacity: 0;
	transition: opacity 0.5s ease-in-out;
}

.scroll-icon.show {
	opacity: 1;
	visibility: visible;
	/* 设置为可见 */
}

.scroll-icon.hide {
	opacity: 0.3;
	visibility: visible;
	/* 设置为不可见 */
}

.scroll-icon.fade-out {
	opacity: 0;
}
</style>