<template>
	<div>
		<TopBar />
	</div>
	<div style="text-align: -webkit-center;" class="container">
		<div class="col-12 title_col">
			<div class="title">
				<div class="dictionary">
					<p>Guan Yin Ma Dictionary</p>
				</div>
				<div class="search_col">
					<!-- Search Input and Dropdown -->
					<input v-model="searchText" type="text" placeholder="Search..." class="search-input" />
					<button @click="performSearch" class="search-button">Search</button>

					<div class="dropdown-container">
						<div class="dropdown" @click="toggleDropdown">
							<div class="dropdown-selected">{{ selectedRangeText }}</div>
							<ul v-show="isDropdownOpen" class="dropdown-list">
								<li @click="selectRange('all')">All</li>
								<li v-for="range in ranges" :key="range.value" @click="selectRange(range.value)">
									{{ range.text }}
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="tuapekkong_col pekkong">
			<div v-for="(item) in paginatedItems" :key="item.number" class="item-container">
				<div class="number_col">
					<p>{{ item.number }}</p>
				</div>
				<div>
					<template v-if="item.loading">
						<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
					</template>
					<template v-else>
						<img :src="`public/imgs/qzt_webp/${item.image}`" :alt="item.content.en" />
					</template>
				</div>
				<p style="font-weight: bold; font-size: 14px;">{{ item.content.en }}</p>
			</div>
			<div v-if="isLoadingItems && filteredItems.length === 0 && searchText.length > 0">Loading...</div>
			<div v-if="filteredItems.length === 0 && !isLoadingItems && searchText.length > 0">No results found.</div>

			<!-- Bootstrap Spinner -->
			<div v-if="isLoadingMore" class="text-center">
				<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
				Loading...
			</div>
		</div>
	</div>
</template>

<script>
import TopBar from '/src/components/topbar.vue';
export default {
	name: 'GuanYin',
	components: {
		TopBar
	},
	data() {
		return {
			items: [],
			searchText: '',
			selectedRange: 'all',
			isDropdownOpen: false,
			ranges: this.generateRanges(50, 999),
			isLoadingItems: false,
			isLoadingMore: false, // Track loading more items
			loadedItemsCount: 10,
			initialLoadCount: 27,
			batchLoadCount: 5, // Adjust as needed
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
		selectedRangeText() {
			if (this.selectedRange === 'all') {
				return 'All';
			}
			const range = this.ranges.find(range => range.value === this.selectedRange);
			return range ? range.text : 'Select Range';
		},
		paginatedItems() {
			return this.filteredItems.slice(0, this.loadedItemsCount);
		}
	},
	mounted() {
		this.fetchItems();
	},
	methods: {
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
				const response = await fetch('/src/assets/data/qzt.json');
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
				await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
				this.loadedItemsCount += this.batchLoadCount;
				this.isLoadingMore = false; // Hide spinner after loading
			}
		},
		performSearch() {
			// Implement search logic as needed
		},
		selectRange(range) {
			this.selectedRange = range;
			this.isDropdownOpen = false;
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
}

@media screen and (max-width:768px) {
	.title_col {
		margin-top: 10px;
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
	border-top-right-radius: 25px;
	border-top-left-radius: 25px;
	text-align: -webkit-center;
}

@media (min-width: 1024px) {
	.title {
		width: 70%;
	}
}

.item-container {
	padding-top: 10px;
	background-color: white;
	/* padding-bottom: 10px; */
	height: 200px;
	text-align: -webkit-center;
	width: 90%;
	align-content: center;
	place-self: center;
	border-radius: 50px;
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
	grid-template-columns: repeat(1, 1fr);
	text-align-last: center;
	width: 70%;
	text-align: -webkit-center;
	place-content: center;
	gap: 0.5rem;
}

.dictionary {
	background-color: #CF2E2E;
	color: white;
	height: 150px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-top-right-radius: 15px;
	border-top-left-radius: 15px;
	border-bottom-left-radius: 35px;
	border-bottom-right-radius: 35px;
	font-weight: bold;
	font-size: 40px;
}

@media (min-width: 600px) {
	.tuapekkong_col {
		grid-template-columns: repeat(2, 1fr);
		gap: 0.5rem;
	}

	.search_container {
		width: 50%;
	}
}

@media (min-width: 1023px) {
	.tuapekkong_col {
		grid-template-columns: repeat(3, 1fr);
		gap: 0.8rem;
	}
}

@media screen and (min-width: 768px) {
	.search_col {
		width: 50%;
		justify-content: center;
		display: flex;
		padding-top: 10px;
		padding-bottom: 10px;
	}
}

.search_col {
	justify-content: center;
	display: flex;
	padding-top: 10px;
	padding-bottom: 10px;
	gap: 0.5rem;
}

.search-input {
	width: 70%;
	padding: 10px;
	margin-right: 10px;
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
}

.search-button:hover {
	background-color: #cf2e2e;
}

/* Custom Dropdown Styles */
.dropdown-container {
	position: relative;
	width: 200px;
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
	border-radius: 10px;
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
	border-radius: 15px;
	max-height: 140px;
	/* Show 7 options */
	overflow-y: auto;
	padding: 0;
	margin: 0;
	list-style: none;
}

.dropdown-list li {
	padding: 10px;
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
</style>
