<template>
	<div class="scroll-container">
		<!--Topbar 1-->
		<div>
			<TopBar @logo-clicked="handleLogoClick" @refreshData="refreshcurrentdata" />
		</div>

		<!--Topbar 2-->
		<div style="display: none; position: sticky; z-index: 999;" class="navbar">
			<div style="width: 30px; height: auto;" v-for="image in filteredImages" :key="image.key"
				:id="`image-container-${image.key}`"
				:class="['image-container', `image-container-${image.key}`, { active: activeIndex === image.key }]"
				@click="handleImageClick(image.key)">
				<img :src="image.src" class="round-image" />
			</div>
		</div>

		<div class="dashboard" ref="dashboard">
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
			<div class="draw-results">
				<div v-for="(drawObj, index) in data" :key="index" :id="`totoType${index}`"
					class="draw-section white-bg" style="min-height:500px">
					<div class="top-card-container" :style="{ backgroundColor: getBgColor(index) }">
						<div class="mobile-menu-page-button-container"
							style="color: white; position: absolute; left: 0;">
							<div class="menu-icon">
								<button class="navbar-toggler" type="button" data-bs-toggle="offcanvas"
									data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar"
									aria-label="Toggle navigation">
									<span class="navbar-toggler-icon"></span>
								</button>
							</div>
						</div>

						<div class="mobile-refresh-page-button-container"
							style="color: white; position: absolute; right: 0;">
							<div class="refresh-icon">
								<div style="position: absolute; top: -3px; right: 5px; transform: rotateZ(75deg);">
									<a class="refresh-arrow" @click="refreshPage(index)">
										&#8635;
									</a>
								</div>
							</div>
						</div>

						<div class="draw-header">
							<div class="logo-title-container">
								<div class="logo-white-container">
									<img :src="cardTheme[index].logoPath" class="draw-logo">
								</div>
								<h1 class="logo-name title-font-size mt-10"
									:style="{ color: cardTheme[index].sectionTitleTextColor }">
									{{ cardTheme[index].name }}
								</h1>
							</div>
						</div>

						<div class="draw-info">
							<div class="date-info" :class="{ 'time-info-fs-14px': !shouldHideTimeInfo(index) }">
								<span>{{ $t('Dashboard.Date') }}</span>
								<span>{{ drawObj.DD }}</span>
							</div>
							<hr aria-orientation="vertical" class="divider"
								:class="{ 'time-info-display-none': shouldHideTimeInfo(index) }">
							<div class="time-info"
								:class="{ 'time-info-display-none': shouldHideTimeInfo(index), 'time-info-fs-14px': !shouldHideTimeInfo(index) }">
								<span>{{ $t('Dashboard.Time') }}</span>
								<span>{{ currentTimeText }}</span>
							</div>
							<hr aria-orientation="vertical" class="divider">
							<div class="number-info" :class="{ 'time-info-fs-14px': !shouldHideTimeInfo(index) }">
								<span>{{ $t('Dashboard.Draw No') }}</span>
								<span>{{ drawObj.DN ? drawObj.DN : "----" }}</span>
							</div>
						</div>
					</div>

					<div class="prizes">
						<div style="margin-inline: 1.25rem;">
							<div class="prize-section">
								<div class="prize" style="width: 30%;"
									v-for="(prize, I) in [$t('Dashboard.1ST Prize'), $t('Dashboard.2ND Prize'), $t('Dashboard.3RD Prize')]"
									:key="prize">
									<h2 class="title-font-size small-title-top-bottom-padding b-r-10px"
										:style="getPrizeStyle(index)">
										<span style="font-weight: 700;">{{ prize }}</span> {{ $t('Dashboard.prize') }}
									</h2>
									<div class="prize-number">{{
										getDisplayResult(drawObj['P' + (I + 1)])
									}}
									</div>
								</div>
							</div>

							<div class="special special-section-min-height">
								<h2 class="title-font-size small-title-top-bottom-padding b-r-10px"
									:style="getSmallSectionStyle(index)">
									{{ $t('Dashboard.Special') }}
								</h2>
								<div class="special-numbers">
									<div v-for="(number, I) in getSpecialNumbers(drawObj)" :key="I" class="number">
										<div class="number-inner">
											{{ getDisplayResult(number) }}
										</div>
									</div>
								</div>
							</div>

							<div class="consolation">
								<h2 class="consolation-section-title title-font-size small-title-top-bottom-padding b-r-10px"
									:style="getSmallSectionStyle(index)">{{ $t('Dashboard.Consolation') }}</h2>
								<div class="consolation-numbers">
									<div v-for="(number, I) in getConsolationNumbers(drawObj)" :key="I" class="number">
										<div class="number-inner">
											{{ getDisplayResult(number) }}
										</div>
									</div>
								</div>
							</div>

							<div v-if="drawObj.JP1" class="jackpot">
								<div class="jackpot-prize">
									<h2 class="jackpot-section-title title-font-size small-title-top-bottom-padding jp-1-br-10px"
										:style="getSmallSectionStyle(index)">{{ $t('Dashboard.4D Jackpot 1 Prize') }}
									</h2>
									<h2 class="jackpot-section-title title-font-size small-title-top-bottom-padding jp-2-br-10px "
										:style="getSmallSectionStyle(index)">{{ $t('Dashboard.4D Jackpot 2 Prize') }}
									</h2>
								</div>
								<div class="jackpot-prize">
									<div class="amount">
										<div class="number-inner">
											{{ getDisplayResult(drawObj.JP1) }}
										</div>
									</div>
									<div class="amount">
										<div class="number-inner">
											{{ getDisplayResult(drawObj.JP2) }}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>

import axios from 'axios';
import TopBar from '/src/components/topbar.vue';

export default {
	components: {
		TopBar
	},
	data() {
		return {
			showIcon: false,
			scrollTimeout: null,
			currentTimeText: "",
			intervalId: null,
			data: [],
			scrollPosition: 0,
			cardTheme: {
				M: {
					name: "Magnum 4D",
					bgColor: "black",
					logoPath: "/image/Magnum@3x.png",
					prizeSectionColor: "#F5C500",
					prizeSectionTextColor: "black",
					smallSectionColor: "black",
					sectionTitleTextColor: "white"
				},
				D: {
					name: "DamaCai 1+3D",
					bgColor: "#1C377B",
					logoPath: "/image/damacai@3x.png",
					prizeSectionColor: "#EC2024",
					prizeSectionTextColor: "white",
					smallSectionColor: "#1C377B",
					sectionTitleTextColor: "white"
				},
				T: {
					name: "SportsToto 4D",
					bgColor: "#EC2024",
					logoPath: "/image/toto@3x.png",
					prizeSectionColor: "black",
					prizeSectionTextColor: "white",
					smallSectionColor: "#EC2024",
					sectionTitleTextColor: "white"
				},
				S: {
					name: "Singapore 4D",
					bgColor: "#0093D8",
					logoPath: "/image/sgtoto@3x.png",
					prizeSectionColor: "#1C377B",
					prizeSectionTextColor: "white",
					smallSectionColor: "#0093D8",
					sectionTitleTextColor: "white"
				},
				ST: {
					name: "Sandakan 4D",
					bgColor: "#F5C500",
					logoPath: "/image/stc4d@3x.png",
					prizeSectionColor: "#007A37",
					prizeSectionTextColor: "white",
					smallSectionColor: "#F5C500",
					sectionTitleTextColor: "#007A37"
				},
				SB: {
					name: "Sabah 88 4D",
					bgColor: "#EC2024",
					logoPath: "/image/sabah88@3x.png",
					prizeSectionColor: "#1D68A2",
					prizeSectionTextColor: "white",
					smallSectionColor: "#EC2024",
					sectionTitleTextColor: "white"
				},
				SW: {
					name: "Special CashSweap",
					bgColor: "#10A226",
					logoPath: "/image/special cashsweep@3x.png",
					prizeSectionColor: "#EC2024",
					prizeSectionTextColor: "white",
					smallSectionColor: "#10A226",
					sectionTitleTextColor: "white"
				},
				H: {
					name: "Lucky Hari Hari",
					bgColor: "#1A81BB",
					logoPath: "/image/LHH@3x.png",
					prizeSectionColor: "#1C377B",
					prizeSectionTextColor: "white",
					smallSectionColor: "#1A81BB",
					sectionTitleTextColor: "white"
				},
				P: {
					name: "Perdana Lottery",
					bgColor: "#1A81BB",
					logoPath: "/image/Perdana Lottery @3x.png",
					prizeSectionColor: "#EC2024",
					prizeSectionTextColor: "white",
					smallSectionColor: "#1A81BB",
					sectionTitleTextColor: "white"
				},
				G: {
					name: "Grand Dragon 4D",
					bgColor: "#EC2024",
					logoPath: "/image/grand dragon 4d@3x.png",
					prizeSectionColor: "#F5C500",
					prizeSectionTextColor: "black",
					smallSectionColor: "#EC2024",
					sectionTitleTextColor: "white"
				}
			},
			activeIndex: null,
			images: [
				{ key: 'M', src: '/image/Magnum@3x.png' },
				{ key: 'D', src: '/image/damacai@3x.png' },
				{ key: 'T', src: '/image/toto@3x.png' },
				{ key: 'S', src: '/image/sgtoto@3x.png' },
				{ key: 'ST', src: '/image/stc4d@3x.png' },
				{ key: 'SB', src: '/image/sabah88@3x.png' },
				{ key: 'SW', src: '/image/special cashsweep@3x.png' },
				{ key: 'G', src: '/image/grand dragon 4d@3x.png' },
				{ key: 'H', src: '/image/LHH@3x.png' },
				{ key: 'P', src: '/image/Perdana Lottery @3x.png' }

			],
		};
	},
	mounted() {
		this.fetchData();
		this.updateTimeText();
		this.restoreScrollPosition();
		// 监听滚动事件
		this.$refs.dashboard.addEventListener('scroll', this.handleScroll);;
		this.intervalId = setInterval(this.checkTime, 1000);
	},
	beforeDestroy() {
		clearInterval(this.intervalId);
		// 移除滚动事件监听
		this.$refs.dashboard.removeEventListener('scroll', this.handleScroll);
		clearInterval(this.intervalId);
	},
	methods: {
		async fetchData() {
			// Capture the start time
			const startTime = Date.now();

			try {
				const response = await axios.get('https://result2.song6.club/result');
				// Extract only desired keys from response.data
				const keysToExtract = ['M', 'D', 'T', 'S', 'ST', 'SB', 'SW', 'G', 'H', 'P'];
				const extractedData = {};

				keysToExtract.forEach(key => {
					if (response.data.hasOwnProperty(key)) {
						extractedData[key] = response.data[key];
					}
				});

				// Delay returning the data by 0.5 seconds
				setTimeout(() => {
					this.data = extractedData;

					// Calculate the duration and emit it
					const endTime = Date.now();
					const durationInSeconds = (endTime - startTime) / 1000;
					this.$emit('data-fetched', durationInSeconds);
				}, 500); // Adjusted to 500ms to match the delay
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		},
		refreshcurrentdata() {
			this.fetchData();
		},
		shouldHideTimeInfo(key) {
			const validKeys = ["H", "P"];
			const allKeys = ["M", "D", "T", "S", "ST", "SB", "SW", "G", "H", "P"];
			const now = new Date();
			const cutoffTime = new Date();
			cutoffTime.setHours(15, 30, 0, 0);
			// now.setHours(16, 30, 0, 0);
			if (now < cutoffTime) {
				return allKeys.includes(key);
			} else {
				return !validKeys.includes(key);
			}
		},
		updateTimeText() {
			const current = new Date();
			const currentTime = current.toTimeString().split(' ')[0];

			const firstTargetTime = "15:30:00";
			const secondTargetTime = "19:30:00";

			if (currentTime < firstTargetTime) {
				this.currentTimeText = "7:30pm";
			} else if (currentTime >= firstTargetTime && currentTime < secondTargetTime) {
				this.currentTimeText = "3:30pm";
			} else {
				this.currentTimeText = "7:30pm";
			}
		},
		formatDate(dateStr) {
			return dateStr;
		},
		getBgColor(type) {
			return this.cardTheme[type].bgColor;
		},
		getPrizeStyle(type) {
			return {
				backgroundColor: this.cardTheme[type].prizeSectionColor,
				color: this.cardTheme[type].prizeSectionTextColor
			};
		},
		getSectionTitleTextColor(type) {
			return this.cardTheme[type].sectionTitleTextColor;
		},
		getSmallSectionStyle(type) {
			return {
				backgroundColor: this.cardTheme[type].smallSectionColor,
				color: this.cardTheme[type].sectionTitleTextColor
			};
		},
		getDisplayResult(number) {
			const now = new Date();
			const cutoffTime = new Date();
			cutoffTime.setHours(16, 39, 0, 0);
			// now.setHours(16, 30, 0, 0);
			if (now < cutoffTime) {
				return '----';
			} else {
				return number;
			}
		},
		getSpecialNumbers(draw) {
			const specialNumbers = [
				draw.S1, draw.S2, draw.S3, draw.S4, draw.S5, draw.S6,
				draw.S7, draw.S8, draw.S9, draw.S10, draw.S11, draw.S12, draw.S13
			];

			// Process each number or string in the array
			const filteredNumbers = specialNumbers.map(num => {
				if (num === null || num === undefined || num === '') {
					return "----"; // Display "----" for blank or undefined values
				} else if (!isNaN(num)) {
					let numAsString = num.toString();
					return numAsString;
				} else {
					return "----"; // Display "----" for non-number values or NaN
				}
			});

			return filteredNumbers;
		},
		getConsolationNumbers(draw) {
			const specialNumbers = [
				draw.C1, draw.C2, draw.C3, draw.C4, draw.C5,
				draw.C6, draw.C7, draw.C8, draw.C9, draw.C10
			];

			// Process each number or string in the array
			const filteredNumbers = specialNumbers.map(num => {
				if (num === null || num === undefined || num === '') {
					return "----"; // Display "----" for blank or undefined values
				} else if (!isNaN(num)) {
					let numAsString = num.toString();
					return numAsString;
				} else {
					return "----"; // Display "----" for non-number values or NaN
				}
			});

			return filteredNumbers;
		},
		refreshPage(index) {
			// Save the ID of the clicked refresh button to localStorage
			const cardId = `totoType${index}`;

			localStorage.setItem('cardId', cardId);
			// Reload the page
			window.location.reload();
		},
		restoreScrollPosition() {
			// Get the saved card ID from localStorage
			const cardId = localStorage.getItem('cardId');

			if (cardId) {
				this.$nextTick(() => {
					const checkElement = () => {
						const element = document.getElementById(cardId);
						if (element) {
							element.scrollIntoView({ behavior: 'smooth' });
							// Clear the card ID from localStorage
							localStorage.removeItem('cardId');
						} else {
							setTimeout(checkElement, 100); // Retry after 100ms
						}
					};
					setTimeout(checkElement, 100); // Initial delay to ensure full rendering
				});
			}
		},
		handleImageClick(index) {
			this.activeIndex = index;
			this.scrollToDrawSection(index);
		},
		handleLogoClick(id) {
			this.activeIndex = id;
			this.scrollToDrawSection(id);
		},
		scrollToDrawSection(index) {
			const element = document.getElementById(`totoType${index}`);
			if (element) {
				element.scrollIntoView({ behavior: 'smooth' });
			}
		},
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
			const dashboard = this.$refs.dashboard;
			if (dashboard) {
				dashboard.scrollTo({ top: 0, behavior: 'smooth' });
			}
		}
	},
	computed: {
		filteredImages() {
			const now = new Date();
			const currentTime = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();

			const targetTime1 = 15 * 3600 + 30 * 60; // 15:30:00 in seconds
			const targetTime2 = 19 * 3600 + 30 * 60; // 19:30:00 in seconds

			if (currentTime < targetTime1) {
				return this.images.filter(image => image.key !== 'H1' && image.key !== 'PL1');
			} else if (currentTime < targetTime2) {
				return this.images.filter(image => image.key !== 'H2' && image.key !== 'PL2');
			} else {
				return this.images.filter(image => image.key !== 'H1' && image.key !== 'PL1');
			}
		}
	}
};
</script>
<style scoped>
@media screen and (max-width: 769px) {
	.scroll-container {
		height: 100vh;
		overflow: auto;
		position: relative;
	}

	.no-scroll {
		overflow: hidden !important;
	}

	.scrollable {
		overflow-y: auto !important;
		scroll-behavior: smooth;
	}
}


@media screen and (max-width: 769px) {
	.navbar {
		display: flex !important;
	}
}


.navbar {
	display: flex;
	justify-content: space-around;
	align-items: center;
	background-color: white;
	border-bottom-left-radius: 15px;
	border-bottom-right-radius: 15px;
	width: 100%;
	left: 0;
	box-shadow: 0 3px 5px #0000001a;
	top: -1px;
	height: 61px;
}

.mobile-sidebar-button-container {
	margin-left: 15px;
	font-size: 20px;
	background-color: white;
	color: black !important;
	border-radius: 50%;
	width: 30px;
	height: 30px;
	display: flex;
	justify-content: center;
	align-items: center;
	box-shadow: 0 2px 5px rgba(255, 0, 0, 0.1);
	opacity: 0.8;

}

.mobile-refresh-page-button-container {
	padding-right: 20px;
}

.mobile-menu-page-button-container {
	padding-left: 20px;
}

.navbar-toggler {
	color: #CF2E2E;
	border: none;
}

.navbar-toggler-icon {
	float: inline-start;
	background-image: url("/image/menu-sm.svg");
}

@media screen and (min-width: 769px) {
	.mobile-refresh-page-button-container {
		display: none;
	}

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

.refresh-icon {
	display: flex;
	align-items: flex-start;
	justify-content: center;
	font-size: 24px;
	background-color: white;
	opacity: 0.8;
	border-radius: 50%;
	width: 30px;
	height: 30px;
	position: relative;
}

.image-container {
	border-radius: 50%;
	overflow: hidden;
	transition: border 0.3s ease;
	border: 2px solid transparent;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 5% !important;
}

.image-container.active {
	border: 2px solid rgb(207, 46, 46);
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
}

.round-image {
	width: 100%;

}

.refresh-arrow {
	display: contents;
	color: #000;
}

.dashboard {
	margin-top: 80px;
	height: calc(-5rem + 100dvh);
	scrollbar-width: none;
	-ms-overflow-style: none;
}

@media screen and (min-width: 769px) {
	.dashboard {
		overflow: auto;
	}
}

@media screen and (max-width: 769px) {
	.dashboard {
		margin-top: 20px;
		height: 91vh;

	}
}

.dashboard::-webkit-scrollbar {
	display: none;
}

@media screen and (min-width: 1280px) {
	.dashboard {
		margin-inline: 206px;
	}
}

.draw-results {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 0.5rem;
	font-family: Arial, sans-serif;
	text-align: center;

}

@media screen and (max-width: 431px) {
	.draw-results {
		padding-bottom: 100px
	}
}

.top-card-container {
	display: flex;
	flex-direction: column;
	border-radius: 0 0 50px 50px;
	padding-top: 70px;
	position: relative;
}

@media (min-width: 768px) {
	.top-card-container {
		height: 170px;
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;
		padding-top: 16px;
	}
}

.prize-section {
	display: flex;
	justify-content: space-between;
}

.draw-section {
	margin-bottom: 40px;
	width: 100%;
	/* height: 100%; */
}

@media screen and (min-width: 320px) {
	.draw-section {
		border-radius: 20px;
	}

}

@media screen and (min-width: 960px) {
	.draw-section {
		width: 400px !important;
	}
}

@media screen and (min-width: 769px) {
	.draw-section {
		width: 370px;
		border-radius: 20px;
	}
}

.draw-header {
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	justify-content: center;
}

.logo-name {
	font-weight: 700;
}

.logo-title-container {
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
}

.logo-white-container {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 75px;
	width: 75px;
	background-color: white;
	border-radius: 50%;
}

.draw-logo {
	height: 65px;
	width: 65px;
	border-radius: 100%;
}

@media (min-width: 320px) {
	.draw-logo {
		height: 70px;
		width: 70px;
	}

	.logo-white-container {
		height: 80px;
		width: 80px;
	}
}

.draw-info {
	display: flex;
	justify-content: center;
	background-color: white;
	z-index: 997;
	margin-top: 2px;
	margin-inline: 20px;
	border-radius: 17px;
	box-shadow: rgba(0, 0, 0, 0.2) 2px 2px 6px;
}

.date-info {
	display: flex;
	flex-direction: column;
	width: 140px;
}

.number-info {
	display: flex;
	flex-direction: column;
	width: 140px;
}

.time-info {
	display: flex;
	flex-direction: column;
}

.divider {
	opacity: 0.6;
	border-width: 0px 0px 0px 1px;
	border-image: initial;
	border-style: solid;
	border-color: rgb(138, 138, 138);
	height: 30px;
	margin: auto 15px;
}

.special,
.consolation,
.jackpot {
	margin: 20px 0;
}

.jackpot {
	display: flex;
	justify-content: space-around;
	flex-direction: column;
}

.jackpot-section-title {
	width: 50%;
}

.jackpot-prize {
	display: flex;
	justify-content: space-around;
}

.prize {
	display: inline-block;
	margin: 10px 0;
}

.prize-number {
	font-size: 24px;
	font-weight: 700;
	margin: 5px 0;
	background: white;
	border-radius: 10px;
	box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 6px;
}

.amount {
	font-size: 18px;
	font-weight: 700;
	width: 50%;
}

.special-numbers,
.consolation-numbers {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
}

.number {
	font-size: 18px;
	font-weight: 700;
	width: 20%;
}

.number-inner {
	background: white;
	border-radius: 5px;
	box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 6px;
	margin: 3px;

}

@media screen and (max-width: 580px) {
	.number {
		width: 15% !important;
	}
}

@media screen and (max-width: 768px) {
	.number {
		width: 18%;
	}
}

.title-font-size {
	font-size: 18px;
}

.prizes {
	padding-top: 20px;
}

.white-bg {
	background-color: white;
}

.small-title-top-bottom-padding {
	padding-top: 10px;
	padding-bottom: 10px;
}

.b-r-10px {
	border-radius: 10px;
}

.jp-1-br-10px {
	border-top-left-radius: 10px;
	border-bottom-left-radius: 10px;
	border-right: 1px solid;
}

.jp-2-br-10px {
	border-top-right-radius: 10px;
	border-bottom-right-radius: 10px;
}

.special-section-min-height {
	min-height: 160px;
}

.time-info-display-none {
	display: none;
}

.mt-10 {
	margin-top: 10px;
}

.time-info-fs-14px {
	font-size: 14px;
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