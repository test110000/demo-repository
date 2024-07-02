<template>
	<div class="lucky-book">
		<div class="container">
			<div class="col-12">
				<div class="search" v-if="!showAnyComponent">
					<div class="title">
						<p>Lucky Book</p>
					</div>

					<div class="">
						<div class="search_col">
							<input v-model="searchQuery" class="search_input" placeholder="e.g. 1001 or sky" />
							<button @click="performSearch" class="search_btn">Search</button>
						</div>
					</div>


				</div>
				<div v-if="showSearchResults">
					<!-- Display search results -->
					<div class="search-message">
						<p>Found {{ filteredData.length }} result{{ filteredData.length !== 1 ? 's' : '' }} for "{{
							searchQuery }}"</p>
						<button @click="clearSearch" class="search_btn">Close</button>
					</div>
					<div class="row">
						<div class="col">
							<div class="search_title">
								<h3>WZT</h3>
							</div>
							<div class="">
								<ul style="padding-left: 0rem;">
									<li v-for="item in filteredDataWZT" :key="item.number" class="search-result">
										<div class="number_col">
											<p>{{ item.number }}</p>
										</div>
										<div class="images">
											<img :src="`/imgs/wzt_webp/${item.image} `" :alt="item.content.en" />
										</div>
										<p>{{ item.content.en }}</p>
									</li>
								</ul>
							</div>

						</div>
						<div class="col">
							<div class="search_title">
								<h3>GZT</h3>
							</div>

							<ul style="padding-left: 0rem;">
								<li v-for="item in filteredDataGZT" :key="item.number" class="search-result">
									<div class="number_col">
										<p>{{ item.number }}</p>
									</div>
									<div class="images">
										<img :src="`/imgs/gzt_webp/${item.image} `" :alt="item.content.en" />
									</div>
									<p>{{ item.content.en }}</p>
								</li>
							</ul>
						</div>
						<div class="col">
							<div class="search_title">
								<h3>QZT</h3>
							</div>
							<ul style="padding-left: 0rem;">
								<li v-for="item in filteredDataQZT" :key="item.number" class="search-result">
									<div class="number_col">
										<p>{{ item.number }}</p>
									</div>
									<div class="images">
										<img :src="`/imgs/qzt_webp/${item.image} `" :alt="item.content.en" />
									</div>
									<p>{{ item.content.en }}</p>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div v-else>
					<!-- Display static content -->
					<div class="col-12 book_col" v-if="!showAnyComponent">
						<div class="row">
							<!-- Tua Pek Kong (Wan) -->
							<div class="col-sm-6 col-md-4 col-lg-4">
								<div class="lucky">
									<div @click="goToTuaPekKong" class="lucky_col">
										<div class="wanzititle_col">
											<img class="wanzititle" src="/public/image/TuaPekKongWanZi.webp" />
											<img width="65%" src="/public/image/TuaPekKongWan.svg" />
										</div>
										<div class="text">
											<a href="#" class="text" @click="goToTuaPekKong">Tua Pek Kong (Wan)
												Dictionary</a>
										</div>
										<div class="text2">
											<a href="#" class="text2">(WZT)</a>
										</div>
									</div>
									<br />
									<div class="btn_col">
										<button class="btn_bg" @click="goToTuaPekKong">Enter</button>
									</div>
									<br />
								</div>
							</div>

							<!-- Guan Yin Ma -->
							<div class="col-sm-6 col-md-4 col-lg-4">
								<div class="lucky">
									<div @click="goToGuanYinMa" class="lucky_col">
										<div class="wanzititle_col">
											<img class="wanzititle" src="/public/image/GuanYinQianZi.webp" />
											<img width="65%" src="/public/image/GuanYinQian.svg" />
										</div>
										<div class="text">
											<a href="#" class="text" @click="goToGuanYinMa">Guan Yin Ma</a>
											<p class="text2" @click="goToGuanYinMa">Dictionary</p>
										</div>
										<div class="text2">
											<a href="#" class="text2">(GZT)</a>
										</div>
									</div>
									<br />
									<div class="btn_col">
										<button class="btn_bg" @click="goToGuanYinMa">Enter</button>
									</div>
									<br />
								</div>
							</div>

							<!-- Tua Pek Kong (Qian) -->
							<div class="col-sm-6 col-md-4 col-lg-4">
								<div class="lucky">
									<div @click="goToTuaPekKongQian" class="lucky_col">
										<div class="wanzititle_col">
											<img class="wanzititle" src="/public/image/TuaPekKongQianZi.webp" />
											<img width="65%" src="/public/image/TuaPekKongQian.svg" />
										</div>
										<div class="text">
											<a href="#" class="text" @click="goToTuaPekKongQian">Tua Pek Kong (Qian)
												Dictionary</a>
										</div>
										<div class="text2">
											<a href="#" class="text2">(WZT)</a>
										</div>
									</div>
									<br />
									<div class="btn_col">
										<button class="btn_bg" @click="goToTuaPekKongQian">Enter</button>
									</div>
									<br />
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
export default {
	name: 'LuckyBook',
	data() {
		return {
			searchQuery: '',
			showSearchResults: false,
			//showTuaPekKongQian: false, // Boolean state for showing TuaPekKong (Qian) component
			allData: [],
			filteredData: [],
			filteredDataWZT: [],
			filteredDataGZT: [],
			filteredDataQZT: []
		};
	},
	methods: {
		async performSearch() {
			this.showSearchResults = this.searchQuery.trim().length > 0;
			if (this.showSearchResults) {
				// Load data from JSON files
				const wztData = await fetch('/src/assets/data/wzt.json').then(response => response.json());
				const gztData = await fetch('/src/assets/data/gzt.json').then(response => response.json());
				const qztData = await fetch('/src/assets/data/qzt.json').then(response => response.json());

				this.allData = [...wztData, ...gztData, ...qztData];

				// Filter data based on search query
				this.filteredData = this.allData.filter(item =>
					item.number.includes(this.searchQuery) || item.content.en.toLowerCase().includes(this.searchQuery.toLowerCase())
				);

				// Separate filtered data by source
				this.filteredDataWZT = wztData.filter(item =>
					item.number.includes(this.searchQuery) || item.content.en.toLowerCase().includes(this.searchQuery.toLowerCase())
				);
				this.filteredDataGZT = gztData.filter(item =>
					item.number.includes(this.searchQuery) || item.content.en.toLowerCase().includes(this.searchQuery.toLowerCase())
				);
				this.filteredDataQZT = qztData.filter(item =>
					item.number.includes(this.searchQuery) || item.content.en.toLowerCase().includes(this.searchQuery.toLowerCase())
				);
			}
		},
		clearSearch() {
			this.showSearchResults = false;
			this.searchQuery = '';
		},
		getImagePath(webp, folder) {
			return `/imgs/${folder}/${webp}`;
		},
		goToTuaPekKong() {
			this.$router.push('/tuapekkong');
		},
		goToGuanYinMa() {
			this.$router.push('/guanyin');
		},
		goToTuaPekKongQian() {
			this.$router.push('/tuapekkongqian');
		},
	}

};

</script>

<style scoped>
.title {
	align-content: center;
	margin-top: 100px;
	background-color: #cf2e2e;
	color: white;
	text-align: center;
	height: 140px;
	font-size: 35px;
	font-weight: bold;
	border-top-left-radius: 20px;
	border-top-right-radius: 20px;
	border-bottom-left-radius: 30px;
	border-bottom-right-radius: 30px;
}

.search {

	margin-bottom: 20px;
	text-align: -webkit-center;
}

.search-message {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 10px;
	margin-bottom: 20px;
}

.search-result {
	display: flex;
	flex-direction: column;
	align-items: center;
	font-weight: bold;
	gap: 0.5rem;
	padding-bottom: 10px;
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

.search_btn {
	padding: 10px 20px;
	border: none;
	background-color: #CF2e2e;
	color: white;
	border-radius: 5px;
	cursor: pointer;
	font-weight: bold;
}

.search_input {
	width: 70%;
	padding: 10px;
	margin-right: 10px;
	border: 1px solid #ddd;
	border-radius: 5px;
}

.search-result img {
	max-width: 100px;
}

.book_col {
	background-color: azure;
}

.lucky_col {
	background-color: #cf2e2e;
	text-align: center;
	padding-top: 10px;
	width: 75%;
	border-radius: 10px;
}

.wanzititle_col {
	position: relative;
}

.wanzititle {
	width: 65%;
	position: absolute;
}

.lucky {
	text-align: center;
	text-align: -webkit-center;
}

.btn_bg {
	text-align: center;
	background-color: #ffb802;
	color: #822700;
	font-weight: bold;
	width: 110px;
	border-radius: 60px;
	padding: 5px;
	border: none;
}

.btn_col {
	text-align: center;
}

.search_col {
	justify-content: center;
	display: flex;
	position: relative;
	width: 100%;
	top: 8px;
}

.text {
	text-align: center;
	text-decoration: none;
	color: white;
	font-weight: bold;
	font-size: 18px;
	margin-top: 10px;
	height: 70px;
}

.text2 {
	text-align: center;
	text-decoration: none;
	color: white;
	font-weight: bold;
	font-size: 18px;
}

p {
	margin: 0px;
}

.row {
	display: flex;
	flex-direction: row;
	justify-content: space-around;
}

.col {
	flex: 1;
	margin: 10px;
	text-align: -webkit-center;
}

.search_title {
	background-color: #cf2e2e;
	color: white;
	text-align: center;
	width: 75%;
	border-radius: 20px;
}
</style>
