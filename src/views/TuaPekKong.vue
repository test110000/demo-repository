<template>


	<div style="margin-top: 75px; background-color: #f8f9fa;" class="container">
		<div class="row">
			<div style=" text-align: -webkit-center;" class="col-12">
				<div class="title">
					<p>Tua Pek Kong (Wan) Dictionary</p>
				</div>
			</div>
			<!-- search -->
			<div class="col-12" style="text-align: -webkit-center;">
				<div class="search_col">
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

				<div class="tuapekkong_col pekkong">
					<div v-for="item in filteredItems" :key="item.number" class="item-container">
						<div class="number_col">
							<p>{{ item.number }}</p>
						</div>
						<div>
							<img :src="`/imgs/wzt_webp/${item.image}`" :alt="item.content.en" />
						</div>
						<p style="font-weight: bolder; font-size: 14px;">{{ item.content.en }}</p>
					</div>
					<div v-if="filteredItems.length === 0 && searchText.length > 0">No results found.</div>
				</div>
			</div>
		</div>
	</div>
</template>


<script>
export default {
	name: 'TuaPekKong',
	data() {
		return {
			items: [],
			searchText: '',
			selectedRange: 'all',
			isDropdownOpen: false,
			ranges: this.generateRanges(500, 9999),
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
				ranges.push({ text: `${i.toString().padStart(4, '0')}-${end.toString().padStart(4, '0')}`, value: `${i}-${end}` });
			}
			return ranges;
		},
		async fetchItems() {
			try {
				const response = await fetch('/src/assets/data/wzt.json');
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				const data = await response.json();
				this.items = data;
			} catch (error) {
				console.error('Error fetching items:', error);
			}
		},
		performSearch() {
			// Perform search logic if needed, currently just sets searchText
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
	background-color: #cf2e2e;
	color: white;
	height: 150px;
	text-align: center;
	align-content: center;
	border-top-left-radius: 15px;
	border-top-right-radius: 15px;
	border-bottom-right-radius: 30px;
	border-bottom-left-radius: 30px;
	font-size: 30px;
	font-weight: bolder;
	width: 100%;
}

@media screen and (min-width: 1023px) {
	.title {
		width: 65%;
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
	width: 80px;
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
	width: 50%;
	text-align: -webkit-center;
	place-content: center;
	gap: 0.5rem;

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
</style>
