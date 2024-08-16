<template>
	<div>
		<div class="Topbar-mobile-view">
			<TopBar />
		</div>
		<div class="container">
			<div style="position: relative;">
				<div class="Content-mobile-view">
					<ContentMenu />
				</div>
			</div>
			<div style="text-align: -webkit-center;">
				<div class="col-12 title_col">
					<div class="title">
						<div class="dictionary">
							<p>{{ $t('LuckyBook.Tua Pek Kong (Wan) Dictionary') }}</p>
						</div>

						<!--search-->
						<div class="search_col">
							<!-- Search Input and Dropdown -->
							<input v-model="searchText" type="text" placeholder="0000 to 9999" class="search-input" />
							<button @click="performSearch" class="search-button">{{ $t('LuckyBook.Search') }}</button>

							<div class="dropdown-container">
								<div class="dropdown" @click="toggleDropdown">
									<div class="dropdown-selected">{{ $t('LuckyBook.ALL') }}</div>
									<ul v-show="isDropdownOpen" class="dropdown-list">
										<li @click.stop="selectRange('all')">{{ $t('LuckyBook.ALL') }}</li>
										<li v-for="range in ranges" :key="range.value"
											@click.stop="selectRange(range.value)">
											{{ range.text }}
										</li>
									</ul>
								</div>
							</div>
						</div>

						<div class="no-result-container" v-if="paginatedItems.length === 0">
							{{ $t('LuckyBook.No_Result') }}
						</div>

						<div class="tuapekkong_col pekkong">
							<div v-for="(item) in paginatedItems" :key="item.number" class="item-container">
								<div class="number_col">
									<p>{{ item.number }}</p>
								</div>
								<div>
									<template v-if="item.loading">
										<span class="spinner-border spinner-border-sm" role="status"
											aria-hidden="true"></span>
									</template>
									<template v-else>
										<img :src="`/imgs/wzt_webp/${item.image}`" :alt="item.content[language]"
											loading="lazy" />
									</template>
								</div>
								<div class="item_content">
									<p>
										{{ item.content[language] }}
									</p>
								</div>

								<div v-if="filteredItems.length === 0 && !isLoadingItems && searchText.length > 0">No
									results
									found.
								</div>
							</div>
						</div>
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
	</div>
</template>

<script>
import ContentMenu from '@/components/content-menu.vue'
import TopBar from '/src/components/topbar.vue';
import { useI18n } from 'vue-i18n';

export default {
	name: 'TuaPekKongWan',
	components: {
		ContentMenu,
		TopBar
	},
	setup() {
		const { t, locale } = useI18n(); // Get the i18n instance

		return {
			t,
			locale,
		};
	},
	data() {
		return {
			items: [],
			searchText: '',
			selectedRange: 'all',
			isDropdownOpen: false,
			ranges: this.generateRanges(500, 9999),
			isLoadingItems: false,
			isLoadingMore: false, // Track loading more items
			loadedItemsCount: 10,
			initialLoadCount: 27,
			batchLoadCount: 5, // Adjust as needed
			showIcon: false,
			scrollTimeout: null,
		};
	},
	computed: {
		filteredItems() {
			let items = this.items;

			if (this.selectedRange !== 'all') {
				const [min, max] = this.selectedRange.split('-').map(Number);
				items = items.filter((item) => {
					const number = parseInt(item.number, 10);
					return number >= min && number <= max;
				});
			}

			if (this.searchText) {
				const query = this.searchText.toLowerCase();
				items = items.filter(
					(item) =>
						item.number.toLowerCase().includes(query) ||
						item.content.en.toLowerCase().includes(query)
				);
			}

			return items;
		},
		paginatedItems() {
			return this.filteredItems.slice(0, this.loadedItemsCount);
		},
		language() {
			return this.$i18n.locale;
		},
	},
	mounted() {
		this.fetchItems();

		window.addEventListener('scroll', this.handleScroll);
		this.intervalId = setInterval(this.checkTime, 1000);
	},
	beforeDestroy() {
		window.removeEventListener('scroll', this.handleScroll);
		clearInterval(this.intervalId);
	},
	methods: {
		handleScroll() {
			if (this.scrollTimeout) {
				clearTimeout(this.scrollTimeout);
			}

			this.showIcon = true;

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
		generateRanges(step, max) {
			const ranges = [];
			for (let i = 0; i <= max; i += step) {
				const end = i + step - 1;
				ranges.push({ text: `${i.toString().padStart(3, '0')}-${end.toString().padStart(3, '0')}`, value: `${i}-${end}` });
			}
			return ranges;
		},
		async fetchItems() {
			try {
				this.isLoadingItems = true;
				const response = await fetch('/src/assets/data/wzt.json'); // Adjust the path as needed
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				const data = await response.json();
				this.items = data;
				await this.delayedLoading();
			} catch (error) {
				console.error('Error fetching items:', error);
			} finally {
				this.isLoadingItems = false;
			}
		},
		async delayedLoading() {
			const totalItems = this.filteredItems.length;
			const startIndex = this.initialLoadCount;

			for (let i = startIndex; i < totalItems; i += this.batchLoadCount) {
				this.isLoadingMore = true; // Show spinner while loading more
				await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate delay
				this.loadedItemsCount += this.batchLoadCount;
				this.isLoadingMore = false; // Hide spinner after loading
			}
		},
		performSearch() {
			// Implement search logic as needed
		},
		selectRange(range) {
			this.selectedRange = range;
			this.isDropdownOpen = !this.isDropdownOpen;
		},
		toggleDropdown() {
			this.isDropdownOpen = !this.isDropdownOpen;
		},
		clearSearch() {
			this.searchText = '';
		},
	},
};
</script>

<style scoped>
/* Add loading animation styles */
.loading {
	opacity: 0;
	/* Hide initially */
	transition: opacity 0.3s ease-out;
}

.title_col {
	text-align: -webkit-center;
	margin-top: 73px;
	padding-left: 0px;
	padding-right: 0px;
}

@media screen and (max-width:768px) {
	.title_col {
		margin-top: 10px;
	}

	.dictionary {
		margin-top: 10px !important;
	}
}

.topbar_logo {
	-webkit-box-align: center;
	align-items: center;
	flex-direction: row;
	gap: 0.5rem;
}

.top-bar {
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: #cf2e2e;
	color: white;
	padding: 10px 20px;
}

.title {
	width: 100%;
	text-align: center;
	background: rgb(255, 255, 255);
	border-radius: 10px;
	text-align: -webkit-center;

}

@media (min-width: 1200px) {
	.title {
		width: 70%;
	}
}

.item-container {

	background-color: white;
	/* padding-bottom: 10px; */
	height: 100%;
	text-align: -webkit-center;
	width: 100%;
	place-self: center;
	border-radius: 5px;
	align-content: start;
	box-shadow: 0px 2px 2px 2px #989696;
	padding: 10px;
}

.number_col {
	color: rgb(0, 0, 0);
	border-style: solid;
	border-radius: 50px;
	width: 40%;
	text-align: -webkit-center;
	font-weight: bold;
	border-width: 1px;
	border-color: rgb(198, 198, 198);
}

@media screen and (max-width:426px) {
	.number_col {
		width: 80%;
	}

}

img {
	width: 100px;
	display: block;
	margin: 0px;
	padding-top: 10px;
}

p {
	margin: 0px;
}

.content {
	margin-top: 5px;
	font-size: 14px;
	text-align: left;
}

.pekkong {
	padding-top: 10px;
}

.tuapekkong_col {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	text-align-last: center;
	text-align: -webkit-center;
	place-content: center;
	gap: 1.0rem;
	border-radius: 10px;
	background-color: #ffffff;
	width: 95%;
	padding-bottom: 10px;
}


.dictionary {
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
	font-size: 18px;
	margin-top: 73px;
}


@media screen and (max-width: 321px) {
	.search-input {
		font-size: 10px;
	}
}

@media (min-width: 600px) {
	.tuapekkong_col {
		grid-template-columns: repeat(3, 1fr);
		gap: 1.0rem;
	}

	.number_col {
		width: 60%;
	}

	.search_container {
		width: 50%;
	}
}

@media (min-width: 1023px) {
	.tuapekkong_col {
		grid-template-columns: repeat(4, 1fr);
		gap: 0.8rem;
		width: 95% !important;
	}
}

@media screen and (min-width: 768px) {
	.search_col {
		width: 50%;
		justify-content: center;
		display: flex;

	}
}

.search_col {
	justify-content: center;
	display: flex;
	padding: 10px;
	gap: 0.5rem;
}

.search-input {
	width: 100%;
	padding: 10px;
	border: 1px solid #ddd;
	border-radius: 5px;
}

.search-button {
	padding: 10px 20px;
	border: none;
	background-color: #cf2e2e;
	color: white;
	border-radius: 5px;
	cursor: pointer;
	font-weight: bold;
	width: 40%;
}

.search-button:hover {
	background-color: #cf2e2e;
}

/* Custom Dropdown Styles */
.dropdown-container {
	position: relative;
	width: 220px;
}

.dropdown {
	position: relative;
	width: 100%;
	cursor: pointer;
	background-color: #cf2e2e;
	border-radius: 10px;
}

.dropdown-selected {
	background-color: #cf2e2e;
	padding: 10px;
	border-radius: 5px;
	color: white;
	font-weight: bolder;
}

.dropdown-list {
	position: absolute;
	top: 100%;
	left: 0;
	width: 100%;
	background-color: white;
	border: solid #cf2e2e;
	border-radius: 5px;
	max-height: 150px;
	overflow-y: auto;
	padding: 0;
	margin: 0;
	list-style: none;
	white-space: nowrap;
}

.dropdown-list::-webkit-scrollbar {
	display: none;
	/* For WebKit browsers (Chrome, Safari) */
}

.dropdown-list {
	-ms-overflow-style: none;
	/* For Internet Explorer and Edge */
	scrollbar-width: none;
	/* For Firefox */
}

.dropdown-list li {
	padding: 10px 0;
	border-bottom: 1px solid #ccc;
	cursor: pointer;
}

.dropdown-list li:hover {
	background: #bbb;
}

.placeholder {
	width: 100px;
	height: 100px;
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
	opacity: 0.5;
	visibility: visible;
	/* 设置为不可见 */
}

.scroll-icon.fade-out {
	opacity: 1;
}

.item_content {
	width: 85%;
	font-size: 14px;
	padding-top: 5px;
}

@media screen and (max-width:500px) {
	.item_content {
		font-size: 12px;
	}
}

@media screen and (max-width: 769px) {
	.Topbar-mobile-view {
		display: none;
	}
}

.Content-mobile-view {
	position: absolute;
	top: -50px;
}

@media screen and (min-width: 769px) {
	.Content-mobile-view {
		display: none;
	}
}

.no-result-container {
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 20px;
	font-weight: 400;
	color: black;
	padding: 20px;
	height: 200px;
}

@media screen and (max-width: 1000px) {
	.no-result-container {
		font-size: 18px;
	}
}
</style>
