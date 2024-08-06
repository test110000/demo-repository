<template>

	<div class="scroll-container">
		<!--Topbar 1-->
		<div>
			<TopBar @logo-clicked="handleLogoClick" />
		</div>

		<div class="dashboard">
			<!--Topbar 2-->
			<div class="navbar">
				<div v-for="image in images" :key="image.key" :id="`image-container-${image.key}`"
					:class="['image-container', `image-container-${image.key}`, { active: activeIndex === image.key }]"
					@click="handleImageClick(image.key)">
					<img :src="image.src" class="round-image" />
				</div>
			</div>

			<div class="draw-results">
				<swiper ref="mySwiper" :slides-per-view="1" :space-between="10" :allowTouchMove="false"
					@slideChange="onSlideChange">
					<swiper-slide v-for="(drawObj, index) in data" :key="index" :id="`totoType${index}`">
						<div class="card">
							<div class="top-card-container" :style="{ background: cardTheme[index].bgColor }">

								<div class="mobile-refresh-page-button-container">
									<div class="refresh-icon">
										<div
											style="position: absolute; top: -3px; right: 5px; transform: rotateZ(5deg);">
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
										<h1 class="title-font-size mt-10"
											:style="{ color: cardTheme[index].sectionTitleTextColor }">
											{{ cardTheme[index].name }}
										</h1>
									</div>
								</div>

								<div class="draw-info">
									<div class="date-info">
										<span>{{ $t('Dashboard.Date') }}</span>
										<span>{{ drawObj.DD }}</span>
									</div>
									<hr aria-orientation="vertical" class="divider"
										:class="{ 'time-info-display-none': shouldHideTimeInfo(index) }">
									<div class="time-info"
										:class="{ 'time-info-display-none': shouldHideTimeInfo(index) }">
										<span>{{ $t('Dashboard.Time') }}</span>
										<span>{{ currentTimeText }}</span>
									</div>
									<hr aria-orientation="vertical" class="divider">
									<div class="number-info">
										<span>{{ $t('Dashboard.Draw No') }}</span>
										<span>{{ drawObj.DN ? drawObj.DN : "----" }}</span>
									</div>
								</div>
							</div>
							<div class="result-display-section">
								<div class="prize-section">
									<div class="prize"
										v-for="(prize, I) in [$t('Dashboard.1ST Prize'), $t('Dashboard.2ND Prize'), $t('Dashboard.3RD Prize')]"
										:key="prize">
										<h2 class="title-font-size small-title-top-bottom-padding b-r-10px"
											:style="getPrizeStyle(index)">
											<span style="font-weight: 700;">{{ prize }}</span> {{ $t('Dashboard.prize')
											}}
										</h2>
										<div class="prize-number">{{
											getDisplayResult(drawObj['P' + (I + 1)]) }}
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
									<h2 class="title-font-size small-title-top-bottom-padding b-r-10px"
										:style="getSmallSectionStyle(index)">{{ $t('Dashboard.Consolation') }}</h2>
									<div class="consolation-numbers">
										<div v-for="(number, I) in getConsolationNumbers(drawObj)" :key="I"
											class="number">
											<div class="number-inner">
												{{ getDisplayResult(number) }}
											</div>
										</div>
									</div>
								</div>

								<div v-if="drawObj.JP1" class="jackpot">
									<div class="jackpot-prize">
										<h2 class="jackpot-section-title title-font-size small-title-top-bottom-padding jp-1-br-10px"
											:style="getSmallSectionStyle(index)">{{ $t('Dashboard.4D Jackpot 1 Prize')
											}}</h2>
										<h2 class="jackpot-section-title title-font-size small-title-top-bottom-padding jp-2-br-10px "
											:style="getSmallSectionStyle(index)">{{ $t('Dashboard.4D Jackpot 2 Prize')
											}}</h2>
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
					</swiper-slide>
				</swiper>
			</div>
		</div>

	</div>
</template>
<script>

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css'; // Import Swiper styles
import axios from 'axios';
import TopBar from '/src/components/topbar.vue';
// import { BCarousel, BCarouselSlide } from 'bootstrap-vue';

export default {
	components: {
		TopBar,
		Swiper,
		SwiperSlide
	},
	data() {
		return {
			currentTimeText: "",
			intervalId: null,
			data: [],
			cards: [
				{ title: 'Card 1', content: 'Content for card 1' },
				{ title: 'Card 2', content: 'Content for card 2' },
				{ title: 'Card 3', content: 'Content for card 3' },
				{ title: 'Card 4', content: 'Content for card 4' },
				{ title: 'Card 5', content: 'Content for card 5' },
				{ title: 'Card 6', content: 'Content for card 6' },
				{ title: 'Card 7', content: 'Content for card 7' },
				{ title: 'Card 8', content: 'Content for card 8' },
				{ title: 'Card 9', content: 'Content for card 9' },
				{ title: 'Card 10', content: 'Content for card 10' }
			],
			scrollPosition: 0,
			cardTheme: {
				M: {
					name: "Magnum 4D", bgColor: "black",
					logoPath: "/image/Magnum@3x.png", prizeSectionColor: "#F5C500",
					prizeSectionTextColor: "black", smallSectionColor: "black",
					sectionTitleTextColor: "white"
				},
				D: {
					name: "DamaCai 1+3D", bgColor: "#1C377B",
					logoPath: "/image/damacai@3x.png", prizeSectionColor: "#EC2024",
					prizeSectionTextColor: "white", smallSectionColor: "#1C377B",
					sectionTitleTextColor: "white"
				},
				T: {
					name: "SportsToto 4D", bgColor: "#EC2024",
					logoPath: "/image/toto@3x.png", prizeSectionColor: "black",
					prizeSectionTextColor: "white", smallSectionColor: "#EC2024",
					sectionTitleTextColor: "white"
				},
				S: {
					name: "Singapore 4D", bgColor: "#0093D8",
					logoPath: "/image/sgtoto@3x.png", prizeSectionColor: "#1C377B",
					prizeSectionTextColor: "white", smallSectionColor: "#0093D8",
					sectionTitleTextColor: "white"
				},
				ST: {
					name: "Sandakan 4D", bgColor: "#F5C500",
					logoPath: "/image/stc4d@3x.png", prizeSectionColor: "#007A37",
					prizeSectionTextColor: "white", smallSectionColor: "#F5C500",
					sectionTitleTextColor: "#007A37"
				},
				SB: {
					name: "Sabah 88 4D", bgColor: "#EC2024",
					logoPath: "/image/sabah88@3x.png", prizeSectionColor: "#1D68A2",
					prizeSectionTextColor: "white", smallSectionColor: "#EC2024",
					sectionTitleTextColor: "white"
				},
				SW: {
					name: "Special CashSweap", bgColor: "#10A226",
					logoPath: "/image/special cashsweep@3x.png", prizeSectionColor: "#EC2024",
					prizeSectionTextColor: "white", smallSectionColor: "#10A226",
					sectionTitleTextColor: "white"
				},
				H: {
					name: "Lucky Hari Hari", bgColor: "#1A81BB",
					logoPath: "/image/LHH@3x.png", prizeSectionColor: "#1C377B",
					prizeSectionTextColor: "white", smallSectionColor: "#1A81BB",
					sectionTitleTextColor: "white"
				},
				P: {
					name: "Perdana Lottery", bgColor: "#1A81BB",
					logoPath: "/image/Perdana Lottery @3x.png", prizeSectionColor: "#EC2024",
					prizeSectionTextColor: "white", smallSectionColor: "#1A81BB",
					sectionTitleTextColor: "white"
				},
				G: {
					name: "Grand Dragon 4D", bgColor: "#EC2024",
					logoPath: "/image/grand dragon 4d@3x.png", prizeSectionColor: "#F5C500",
					prizeSectionTextColor: "black", smallSectionColor: "#EC2024",
					sectionTitleTextColor: "white"
				}
			},
			activeIndex: 'M',
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
	},
	beforeDestroy() {
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
		shouldHideTimeInfo(key) {
			const validKeys = ["H", "P"];
			const allKeys = ["M", "D", "T", "S", "ST", "SB", "SW", "G", "H", "P"];
			const now = new Date();
			const cutoffTime = new Date();
			cutoffTime.setHours(15, 30, 0, 0);
			now.setHours(16, 30, 0, 0);
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
		getName(type) {
			return this.cardTheme[type].name;
		},
		getLogo(type) {
			return this.cardTheme[type].logoPath;
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
			const cutoffTime = new Date();
			cutoffTime.setHours(15, 30, 0, 0);
			return number;
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
					// Remove any underscores (or underlines) from the string
					// numAsString = numAsString.replace(/_/g, '').replace(/[\u0332\u2017]/g, ''); // Remove both underscores and underline characters
					return numAsString;
				} else {
					return "----"; // Display "----" for non-number values or NaN
				}
			});
			return filteredNumbers;
		},
		getConsolationNumbers(draw) {
			// Extract consolation numbers from the draw object
			return [draw.C1, draw.C2, draw.C3, draw.C4, draw.C5, draw.C6, draw.C7, draw.C8, draw.C9, draw.C10];
		},
		refreshPage(index) {
			this.fetchData()
			// Save the ID of the clicked refresh button to localStorage
			// const cardId = `totoType${index}`;

			// localStorage.setItem('cardId', cardId);
			// Reload the page
			// window.location.reload();
		},
		restoreScrollPosition() {
			// Get the saved card ID from localStorage
			const cardId = localStorage.getItem('cardId');

			if (cardId) {
				this.$nextTick(() => {
					const checkElement = () => {
						const element = document.getElementById(cardId);
						if (element) {
							element.scrollIntoView();
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
			// this.$refs.mySwiper.swiper.slideTo(index);
		},
		onSlideChange() {
			// Get the active index from the swiper instance
			this.activeIndex = this.$refs.mySwiper.swiper.realIndex;
		},
		handleLogoClick(id) {
			this.activeIndex = id;
			this.scrollToDrawSection(id);
		},
		scrollToDrawSection(index) {
			const element = document.getElementById(`totoType${index}`);
			if (element) {
				element.scrollIntoView();
			}
		},

	},
};
</script>
<style scoped>
.card {
	background: #fff;
	text-align: center;
	border: 0;
}

.top-card-container {
	display: flex;
	flex-direction: column;
	border-radius: 0 0 50px 50px;
	position: relative;
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

.refresh-arrow {
	display: contents;
	color: #000;
}

.draw-header {
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	justify-content: center;
	margin-top: 70px;
	/* margin-bottom: 50px; */
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

@media screen and (max-width: 769px) {
	.scroll-container {
		/* height: 100vh; */
		overflow: auto;
		position: relative;
	}
}

@media screen and (max-width: 769px) {
	.navbar {
		display: flex !important;
	}
}

.scroll-container::-webkit-scrollbar {
	display: none;
}

.navbar {
	display: none;
	position: sticky;
	z-index: 999;
	top: -1px;
	justify-content: space-around;
	align-items: center;
	background-color: white;
	border-bottom-left-radius: 15px;
	border-bottom-right-radius: 15px;
	width: 100%;
	left: 0;
	box-shadow: 0 3px 5px #0000001a;
	height: 61px;
	margin-bottom: -60px;
}

.image-container {
	/* border-radius: 50%; */
	border-top-right-radius: 50px;
	border-top-left-radius: 50px;
	border-bottom-right-radius: 50px;
	border-bottom-left-radius: 50px;
	overflow: hidden;
	transition: border 0.3s ease;
	border: 2px solid transparent;
	position: relative;
	display: inline-block;
	justify-content: center;
	align-items: center;
	width: 10%;
	max-width: 40px;
	height: auto;
}

.image-container img {
	border-radius: 50%;
	/* This ensures the image itself remains round */
	background-color: white;
}

.image-container.active {
	/* border: 2px solid rgb(207, 46, 46); */
	/* box-shadow: 0 0 10px rgba(0, 0, 0, 0.4); */
	background-color: #d2d2d2 !important;
	/* Background color for the oval effect */
	padding: 5px 0px;
	/* Adjust padding to create space around the image */
	/* border-radius: 50%; */
	/* Initially round background */
	transition: background-color 0.3s, border-radius 0.3s;
}

.image-container.active::before {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: gray;
	/* Same background color as .active */
	/* border-radius: 50%; */
	/* Start as circle */
	transform: scale(1, 1.3);
	/* Scale to create the oval effect */
	z-index: -1;
	/* Position behind the image */
}

.round-image {
	width: 100%;
	/* height: auto; */
}

.dashboard {
	height: calc(-5rem + 100dvh);
	scrollbar-width: none;
	-ms-overflow-style: none;
	position: relative;
}

@media screen and (min-width: 769px) {
	.dashboard {
		overflow: auto;
	}
}

/* @media screen and (max-width: 769px) {
	.dashboard {
		height: 91vh;
	}
} */

.dashboard::-webkit-scrollbar {
	display: none;
}

@media screen and (min-width: 1280px) {
	.dashboard {
		margin-inline: 206px;
	}
}

.draw-card {
	width: 100vw;
	height: 100vh;
	/* Adjust the height as needed */
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: white !important;
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

.mobile-refresh-page-button-container {
	padding-right: 20px;
	color: white;
	position: absolute;
	top: 70px;
	right: 0;
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

.draw-info span {
	white-space: nowrap;
	font-size: 14px;
	font-weight: 700;
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

.time-info-display-none {
	display: none !important;
}

.date-info {
	display: flex;
	flex-direction: column;
	width: 40%;
}

.time-info {
	display: flex;
	flex-direction: column;
}

.number-info {
	display: flex;
	flex-direction: column;
	width: 40%;
}

.result-display-section {
	/* display: flex;
	justify-content: center; */
	padding-top: 20px;
	margin-inline: 1.25rem;
}

.prize-section {
	display: flex;
	justify-content: space-between;
	width: 100%;
}

.prize-section h2 {
	width: 100%;
}

@media screen and (max-width: 380px) {
	.prize-section h2 {
		white-space: nowrap;
		font-size: 16px;
	}

	.prize {
		width: 90px;
	}
}

@media screen and (max-width: 321px) {
	.prize {
		margin: 0 !important;
	}
}

.prize {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 30%;
}

.prize-number {
	font-size: 18px;
	font-weight: 700;
	width: 100%;
	margin: 5px;
	background: white;
	border-radius: 10px;
	box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 6px;
}

.jackpot-prize {
	display: flex;
	justify-content: space-around;
}

.jackpot-section-title {
	width: 50%;
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

.amount {
	font-size: 18px;
	font-weight: 700;
	background: white;
	border-radius: 5px;
	/* box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 6px; */
	width: 50%;
	white-space: nowrap;
}

@media screen and (max-width: 321px) {
	.amount {
		font-size: 16px;
	}
}

.title-font-size {
	font-size: 18px;
}

.small-title-top-bottom-padding {
	padding-top: 10px;
	padding-bottom: 10px;
}

.b-r-10px {
	border-radius: 10px;
}

.special-section-min-height {
	min-height: 160px;
}

.special,
.consolation,
.jackpot {
	margin: 20px 0;
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
	/* margin: 5px; */

}

.number-inner {
	background: white;
	border-radius: 5px;
	box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 6px;
	margin: 3px;

}
</style>
