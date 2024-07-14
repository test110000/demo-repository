<template>
	<div ref="scrollContainer" class="scroll-container">
		<div ref="topBar">
			<TopBar @logo-clicked="handleLogoClick" />
		</div>

		<!--topbar-->
		<div style="display: none;" class="navbar">
			<div v-for="(image, index) in filteredImages" :key="image.key" :id="`image-container-${image.key}`"
				:class="['image-container', `image-container-${image.key}`, { active: activeIndex === index }]"
				@click="handleImageClick(image.key)">
				<img :src="image.src" class="round-image" />
			</div>
		</div>

		<div class="dashboard" ref="partToScroll">
			<div class="draw-results">
				<div v-for="(drawObj, index) in data" :key="index" :id="`Toto-type-${index}`"
					class="draw-section white-bg">
					<div class="top-card-container" :style="{ backgroundColor: getBgColor(index) }">
						<div class="mobile-refresh-page-button-container"
							style="color: white; position: absolute; right: 0;">
							<div class="refresh-icon" style="position: relative; ">
								<div style="position: absolute; right: 8.5px; top: 3px;">
									<a class="refresh-arrow" href="#" @click.prevent="refreshPage">
										&#8635;
									</a>
								</div>
							</div>
						</div>

						<div class="draw-header">
							<div class="logo-title-container">
								<div class="logo-white-container">
									<img :src="getLogo(index)" alt="Logo" class="draw-logo">
								</div>
								<h1 class="logo-name title-font-size mt-10"
									:style="{ color: getSectionTitleTextColor(index) }">{{
										getName(index) }}</h1>
							</div>
						</div>

						<div class="draw-info">
							<div class="date-info" :class="{ 'time-info-fs-14px': !shouldHideTimeInfo(index) }">
								<span>Date: </span>
								<span>{{ drawObj.DD }}</span>
							</div>
							<hr aria-orientation="vertical" class="divider"
								:class="{ 'time-info-display-none': shouldHideTimeInfo(index) }">
							<div class="time-info"
								:class="{ 'time-info-display-none': shouldHideTimeInfo(index), 'time-info-fs-14px': !shouldHideTimeInfo(index) }">
								<span>Time: </span>
								<span>{{ currentTimeText }}</span>
							</div>
							<hr aria-orientation="vertical" class="divider">
							<div class="number-info" :class="{ 'time-info-fs-14px': !shouldHideTimeInfo(index) }">
								<span>Draw No.: </span>
								<span>{{ drawObj.DN ? drawObj.DN : "----" }}</span>
							</div>
						</div>
					</div>
					<div class="prizes">
						<div style="margin-inline: 1.25rem;">
							<div class="prize-section">
								<div class="prize" v-for="(prize, I) in ['1ST Prize', '2ND Prize', '3RD Prize']"
									:key="prize">
									<h2 class="prize-title-container title-font-size small-title-top-bottom-padding b-r-10px"
										:style="getPrizeStyle(index)">{{ prize }}</h2>
									<div class="prize-number-container">
										<div class="prize-number">{{
											getDisplayResult(drawObj['P' + (I + 1)])
										}}
										</div>
									</div>
								</div>
							</div>

							<div class="special special-section-min-height">
								<h2 class="special-section-title title-font-size small-title-top-bottom-padding b-r-10px"
									:style="getSmallSectionStyle(index)">Special</h2>
								<div class="special-numbers">
									<div v-for="(number, I) in getSpecialNumbers(drawObj)" :key="I" class="number">
										{{
											getDisplayResult(number) }}</div>
								</div>
							</div>

							<div class="consolation">
								<h2 class="consolation-section-title title-font-size small-title-top-bottom-padding b-r-10px"
									:style="getSmallSectionStyle(index)">Consolation</h2>
								<div class="consolation-numbers">
									<div v-for="(number, I) in getConsolationNumbers(drawObj)" :key="I" class="number">
										{{ getDisplayResult(number) }}</div>
								</div>
							</div>

							<div v-if="drawObj.JP1" class="jackpot">
								<div class="jackpot-prize">
									<h2 class="jackpot-section-title title-font-size small-title-top-bottom-padding jp-1-br-10px"
										:style="getSmallSectionStyle(index)">4D Jackpot 1 Prize</h2>
									<h2 class="jackpot-section-title title-font-size small-title-top-bottom-padding jp-2-br-10px "
										:style="getSmallSectionStyle(index)">4D Jackpot 2 Prize</h2>
								</div>
								<div class="jackpot-prize">
									<div class="amount">{{ getDisplayResult(drawObj.JP1) }}
									</div>
									<div class="amount">{{ getDisplayResult(drawObj.JP2) }}
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
			currentTimeText: "",
			intervalId: null,
			scrolledPast: false,
			data: [],
			styles: {
				M: {
					name: "Magnum 4D",
					bgColor: 'black',
					logoPath: '/image/magnum.svg',
					prizeSectionColor: '#F5C500',
					prizeSectionTextColor: 'black',
					smallSectionColor: 'black', // Combine colors here
					sectionTitleTextColor: 'white'
				},
				D: {
					name: "DamaCai 1+3D",
					bgColor: '#1C377B',
					logoPath: '/image/damacai2.svg',
					prizeSectionColor: '#EC2024',
					prizeSectionTextColor: 'white',
					smallSectionColor: '#1C377B', // Combine colors here
					sectionTitleTextColor: 'white'
				},
				T: {
					name: "SportsToto 4D",
					bgColor: '#EC2024',
					logoPath: '/image/toto.svg',
					prizeSectionColor: 'black',
					prizeSectionTextColor: 'white',
					smallSectionColor: '#EC2024', // Combine colors here
					sectionTitleTextColor: 'white'
				},
				S: {
					name: "Singapore 4D",
					bgColor: '#0093D8',
					logoPath: '/image/sg.svg',
					prizeSectionColor: '#1C377B',
					prizeSectionTextColor: 'white',
					smallSectionColor: '#0093D8', // Combine colors here
					sectionTitleTextColor: 'white'
				},
				ST: {
					name: "Magnum 4D",
					bgColor: '#F5C500',
					logoPath: '/image/sandakan.svg',
					prizeSectionColor: '#007A37',
					prizeSectionTextColor: 'white',
					smallSectionColor: '#F5C500', // Combine colors here
					sectionTitleTextColor: '#007A37'
				},
				SB: {
					name: "Sabah 88 4D",
					bgColor: '#EC2024',
					logoPath: '/image/sabahtoto.svg',
					prizeSectionColor: '#1D68A2',
					prizeSectionTextColor: 'white',
					smallSectionColor: '#EC2024', // Combine colors here
					sectionTitleTextColor: 'white'
				},
				SW: {
					name: "Special CashSweap",
					bgColor: '#10A226',
					logoPath: '/image/cashsweeptoto.svg',
					prizeSectionColor: '#EC2024',
					prizeSectionTextColor: 'white',
					smallSectionColor: '#10A226', // Combine colors here
					sectionTitleTextColor: 'white'
				},
				H: {
					name: "Lucky Hari Hari",
					bgColor: '#1A81BB',
					logoPath: '/image/hariharitoto.svg',
					prizeSectionColor: '#1C377B',
					prizeSectionTextColor: 'white',
					smallSectionColor: '#1A81BB', // Combine colors here
					sectionTitleTextColor: 'white'
				},
				P: {
					name: "Perdana Lottery",
					bgColor: '#1A81BB',
					logoPath: '/image/pdntoto.svg',
					prizeSectionColor: '#EC2024',
					prizeSectionTextColor: 'white',
					smallSectionColor: '#1A81BB', // Combine colors here
					sectionTitleTextColor: 'white'
				},
				G: {
					name: "Grand Dragon 4D",
					bgColor: '#EC2024',
					logoPath: '/image/gdtoto.svg',
					prizeSectionColor: '#F5C500',
					prizeSectionTextColor: 'black',
					smallSectionColor: '#EC2024', // Combine colors here
					sectionTitleTextColor: 'white'
				}
			},
			activeIndex: null,
			images: [
				{ key: 'M', src: '/image/magnum.svg' },
				{ key: 'D', src: '/image/damacai2.svg' },
				{ key: 'T', src: '/image/toto.svg' },
				{ key: 'S', src: '/image/sg.svg' },
				{ key: 'ST', src: '/image/sandakan.svg' },
				{ key: 'SB', src: '/image/diriwan.svg' },
				{ key: 'SW', src: '/image/ssc.svg' },
				{ key: 'H', src: '/image/lhh.svg' },
				{ key: 'P', src: '/image/pdn.svg' },
				{ key: 'G', src: '/image/gd.svg' }
			],
		};
	},
	mounted() {
		// this.fetchData();
		this.fetchData2();
		this.$refs.scrollContainer.addEventListener('scroll', this.handleScroll);
		this.$refs.partToScroll.addEventListener('scroll', this.handleDashboardScroll);
		this.updateTimeText();
	},
	beforeDestroy() {
		this.$refs.scrollContainer.removeEventListener('scroll', this.handleScroll);
		this.$refs.partToScroll.removeEventListener('scroll', this.handleDashboardScroll);
		clearInterval(this.intervalId);
	},
	methods: {
		fetchData() {
			axios.get('/public/data-2.json')
				// axios.get('https://result2.song6.club/result')
				.then(response => {
					this.data = response.data;
					// console.log(this.data)
				})
				.catch(error => {
					console.error('Error fetching data:', error);
				});
		},
		fetchData2() {
			axios.get('https://result2.song6.club/result')
				.then(response => {
					// Extract only desired keys from response.data
					const keysToExtract = ['M', 'D', 'T', 'S', 'ST', 'SB', 'SW', 'G', 'H', 'P'];
					const extractedData = {};

					keysToExtract.forEach(key => {
						if (response.data.hasOwnProperty(key)) {
							extractedData[key] = response.data[key];
						}
					});

					this.data = extractedData;

					// Example of using the extracted data
					// console.log('Extracted Data:', this.data);
				})
				.catch(error => {
					console.error('There was an error fetching the data:', error);
				});
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
		getKey(drawObj) {
			const key = Object.keys(drawObj)[0];
			return key;
		},
		updateTimeText() {
			const current = new Date();
			const currentTime = current.toTimeString().split(' ')[0];

			// const currentTime = "16:30:00";

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
		handleScroll() {
			const topBarHeight = this.$refs.topBar.offsetHeight; // Get the height of the TopBar
			const scrollPosition = this.$refs.scrollContainer.scrollTop;

			if (scrollPosition >= topBarHeight && !this.scrolledPast) {
				this.scrolledPast = true;
				this.disableScrolling();
			} else if (scrollPosition < topBarHeight && this.scrolledPast) {
				this.scrolledPast = false;
				this.enableScrolling();
			}
		},
		handleDashboardScroll() {
			const dashboardScrollPosition = this.$refs.partToScroll.scrollTop;
			if (dashboardScrollPosition === 0) {
				this.enableScrolling();  // Enable scrolling actions when at the top
			} else {
				this.disableScrolling(); // Disable scrolling actions when not at the top
			}
		},
		disableScrolling() {
			this.$refs.scrollContainer.classList.add('no-scroll');
			this.$refs.partToScroll.classList.add('scrollable');
		},
		enableScrolling() {
			this.$refs.scrollContainer.classList.remove('no-scroll');
			this.$refs.partToScroll.classList.remove('scrollable');
		},
		formatDate(dateStr) {
			// Format date if necessary
			return dateStr;
		},
		getCurrentDate() {
			const today = new Date();
			const day = String(today.getDate()).padStart(2, '0');
			const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
			const year = today.getFullYear();
			return `${year}-${month}-${day}`;
		},
		getName(type) {
			return this.styles[type].name;
		},
		getLogo(type) {
			return this.styles[type].logoPath;
		},
		getBgColor(type) {
			return this.styles[type].bgColor;
		},
		getPrizeStyle(type) {
			return {
				backgroundColor: this.styles[type].prizeSectionColor,
				color: this.styles[type].prizeSectionTextColor
			};
		},
		getSectionTitleTextColor(type) {
			return this.styles[type].sectionTitleTextColor;
		},
		getSmallSectionStyle(type) {
			return {
				backgroundColor: this.styles[type].smallSectionColor,
				color: this.styles[type].sectionTitleTextColor
			};
		},
		getDisplayResult(number) {
			const now = new Date();
			const cutoffTime = new Date();
			cutoffTime.setHours(15, 30, 0, 0); // 3:30 PM
			now.setHours(16, 30, 0, 0);
			now.setHours(16, 30, 0, 0);
			if (now < cutoffTime) {
				return '----';
			} else {
				return number;
			}
		},
		getKey(drawObj) {
			return Object.keys(drawObj)[0];
		},
		getSpecialNumbers(draw) {
			return [
				draw.S1, draw.S2, draw.S3, draw.S4, draw.S5, draw.S6, draw.S7, draw.S8, draw.S9, draw.S10,
				draw.S11, draw.S12, draw.S13
			];
		},
		getConsolationNumbers(draw) {
			// Extract consolation numbers from the draw object
			return [draw.C1, draw.C2, draw.C3, draw.C4, draw.C5, draw.C6, draw.C7, draw.C8, draw.C9, draw.C10];
		},
		refreshPage() {
			window.location.reload(); // Reloads the current page
		},
		handleImageClick(index) {
			this.activeIndex = index;
			this.scrollToDrawSection(index);
		},
		handleLogoClick(id) {
			this.activeIndex = id; // Set activeIndex to the clicked logo index
			this.scrollToDrawSection(id); // Scroll to corresponding section
		},
		scrollToDrawSection(index) {
			const element = document.getElementById(`Toto-type-${index}`);
			if (element) {
				element.scrollIntoView({ behavior: 'smooth' });
			}
		},
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
	}

	.no-scroll {
		overflow: hidden !important;
	}

	.scrollable {
		overflow-y: auto !important;
		/* Allow vertical scrolling */
		/* max-height: calc(100vh - 65px); */
		/* Adjust as necessary */
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
	height: 61px;
	background-color: white;
	border-radius: 20px;
	width: 100%;
	left: 0;
	box-shadow: 0 3px 5px #0000001a;
	top: 0px;
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

@media screen and (min-width: 769px) {
	.mobile-refresh-page-button-container {
		display: none;
	}
}


.refresh-icon {
	font-size: 16px !important;
	background-color: white !important;
	opacity: 0.8 !important;
	border-radius: 50%;
	width: 30px !important;
	height: 30px !important;
}

.refresh-arrow {
	display: contents;
	color: #CF2E2E;
	align-self: center;
}

.image-container {
	width: 40px;
	height: 40px;
	border-radius: 50%;
	overflow: hidden;
	transition: border 0.3s ease;
	border: 2px solid transparent;
	display: flex;
	justify-content: center;
	align-items: center;
}

.image-container.active {
	border: 2px solid rgb(207, 46, 46);
}

.round-image {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.refresh-arrow {
	display: contents;
	color: #000;
}

.dashboard {
	margin-top: 80px;
	height: calc(-5rem + 100dvh);
	/* overflow-y: scroll; */
	/* overflow: auto; */
	overflow: hidden;
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
		height: 87dvh;
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

.top-card-container {
	display: flex;
	flex-direction: column;
	border-radius: 0 0 50px 50px;
	padding-top: 16px;
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
	margin: 10px;
}

.prize-number {
	font-size: 24px;
	font-weight: 700;
	width: 90px;
	margin: 5px;
	background: white;
	border-radius: 5px;
	box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 6px;
}

.amount {
	font-size: 18px;
	font-weight: 700;
	margin: 5px;
	background: white;
	border-radius: 5px;
	box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 6px;
	width: 150px;
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
	width: 60px;
	margin: 5px;
	background: white;
	border-radius: 5px;
	box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 6px;
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
</style>