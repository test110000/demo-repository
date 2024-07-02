<template>
	<div class="container">
		<div class="row">
			<div style="margin-top: 85px;" class="col-12">
				<div class="title">
					<p>Tua Pek Kong (Qian) Dictionary</p>
				</div>
			</div>
			<!-- search -->
			<div class="col-12" style="text-align: -webkit-center;">
				<div class="search-container">
					<input v-model="searchText" type="text" placeholder="Search..." class="search-input" />
					<button @click="performSearch" class="search-button">Search</button>
				</div>
				<div class="tuaoekkong_col pekkong">
					<div v-for="item in filteredItems" :key="item.number" class="item-container">
						<div class="number_col">
							<p>{{ item.number }}</p>
						</div>
						<div>
							<img :src="`/imgs/qzt_webp/${item.image}`" :alt="item.content.en" />
						</div>
						<p>{{ item.content.en }}</p>
					</div>
					<div v-if="filteredItems.length === 0">No results found.</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'TuaPekKongQian',
	data() {
		return {
			items: [],
			searchText: ''
		};
	},
	computed: {
		filteredItems() {
			if (!this.searchText) {
				return this.items;
			}
			const query = this.searchText.toLowerCase();
			return this.items.filter(item =>
				item.number.toLowerCase().includes(query) ||
				item.content.en.toLowerCase().includes(query)
			);
		}
	},
	mounted() {
		this.fetchItems();
	},
	methods: {
		async fetchItems() {
			try {
				const response = await fetch('/src/assets/data/qzt.json');
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
		clearSearch() {
			this.searchText = '';
		},
	}
};
</script>

<style scoped>
.title {
	background-color: #CF2e2e;
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
}

.item-container {
	display: inline-block;
	text-align: center;
	text-align: -webkit-center;
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

.tuaoekkong_col {
	display: grid;
	grid-template-columns: repeat(1, 1fr);
	text-align-last: center;
	width: 100%;
	text-align: -webkit-center;
}

@media (min-width: 600px) {
	.tuaoekkong_col {
		grid-template-columns: repeat(2, 1fr);
	}
}

@media (min-width: 1024px) {
	.tuaoekkong_col {
		grid-template-columns: repeat(3, 1fr);
	}
}

.search-container {
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 20px 0;
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
	background-color: #CF2e2e;
	color: white;
	border-radius: 5px;
	cursor: pointer;
	font-weight: bold;
}

.search-button:hover {
	background-color: #a82727;
}
</style>
