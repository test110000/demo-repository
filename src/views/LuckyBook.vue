<template>
	<div>
		<TopBar />
	</div>

	<div class="container">
		<div class="col-12 title_col">
			<div class="luckbook_col">
				<div class="title">
					<p>{{ $t('Sidebar.Lucky Book') }}</p>
				</div>

				<div class="column">
					<!--search bar-->
					<div class="search_col">
						<div class="input-container">
							<div class="input-wrapper">
								<input v-model="searchQuery" class="form-control form-control-dark search_input"
									:placeholder="$t('LuckyBook.Search placeholder')" />
								<svg v-if="searchQuery !== ''" @click="clearSearch" xmlns="http://www.w3.org/2000/svg"
									width="25" height="25" fill="currentColor" class="bi bi-x-circle-fill close_btn"
									viewBox="0 0 16 16">
									<path
										d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
								</svg>
							</div>
						</div>
						<!--search_btn-->
						<button @click="performSearch" class="search_btn">{{ $t('LuckyBook.Search') }}</button>
					</div>


					<div class="big_col" v-if="showSearchResults">
						<!-- Display search results -->
						<ul style="justify-content: center;" class="nav nav-tabs justify-content-center "
							role="tablist">
							<li style="width: 31.5%;" class="nav-item">
								<a class="nav-link active" data-bs-toggle="tab" href="#TuaPekKongWan">WZT</a>
							</li>

							<li style="width: 31.5%;" class="nav-item">
								<a class="nav-link" data-bs-toggle="tab" href="#GuanYin">GZT</a>
							</li>

							<li style="width: 31.5%;" class="nav-item">
								<a class="nav-link" data-bs-toggle="tab" href="#TuaPekKongQian">QZT</a>
							</li>
						</ul>
						<br>

						<div class="tab-content">
							<!--TuaPekKong (Wan)-->
							<div id="TuaPekKongWan" class="container tab-pane active">
								<div>
									<div class="search-message">
										<p>{{ $t('LuckyBook.Found') }}
											{{ filteredDataWZT.length }}
											{{ $t('LuckyBook.result') }}
											{{ filteredDataWZT.length !== 1 ? '' : '' }}
											{{ $t('LuckyBook.for') }}
											"{{ searchQuery }}"</p>
									</div>

									<ul class="search-ul">
										<li v-for="item in filteredDataWZT" :key="item.number" class="search-result">
											<div class="number_col">
												<p>{{ item.number }}</p>
											</div>
											<div class="images">
												<img :src="`/imgs/wzt_webp/${item.image} `"
													:alt="item.content[language]" />
											</div>
											<div class="item-content">
												<p>{{ item.content[language] }}</p>
											</div>
										</li>
									</ul>
								</div>
							</div>

							<!--GuanYinMa-->
							<div id="GuanYin" class="container tab-pane fade">
								<div class="search-message">
									<p>{{ $t('LuckyBook.Found') }}
										{{ filteredDataGZT.length }}
										{{ $t('LuckyBook.result') }}
										{{ filteredDataGZT.length !== 1 ?
											'' : '' }}
										{{ $t('LuckyBook.for') }}
										"{{ searchQuery }}"</p>
								</div>
								<ul class="search-ul">
									<li v-for="item in filteredDataGZT" :key="item.number" class="search-result">
										<div class="number_col">
											<p>{{ item.number }}</p>
										</div>
										<div class="images">
											<img :src="`/imgs/gzt_webp/${item.image} `" :alt="item.content[language]" />
										</div>
										<div class="content">
											<p>{{ item.content[language] }}</p>
										</div>
									</li>
								</ul>
							</div>


							<!--TuaPekKong (Qian)-->
							<div id="TuaPekKongQian" class="container tab-pane fade">
								<div class="search-message">
									<p>{{ $t('LuckyBook.Found') }}
										{{ filteredDataQZT.length }}
										{{ $t('LuckyBook.result') }}
										{{ filteredDataQZT.length !== 1 ?
											'' : '' }}
										{{ $t('LuckyBook.for') }}
										"{{ searchQuery }}"</p>
								</div>
								<ul class="search-ul">
									<li v-for="item in filteredDataQZT" :key="item.number" class="search-result">
										<div class="number_col">
											<p>{{ item.number }}</p>
										</div>
										<div class="images">
											<img :src="`/imgs/qzt_webp/${item.image} `" :alt="item.content[language]" />
										</div>
										<div class="content">
											<p>{{ item.content[language] }}</p>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>

					<!--entry TuaPekKongWan & GuanYinMa & TuaPkeKong Qian-->
					<div style="text-align: -webkit-center;" v-else>
						<div class="col-12 book_col">
							<div style="text-align: -webkit-center; place-content: center;" class="row">

								<!-- Tua Pek Kong (Wan) -->
								<div class="col-12 col-sm-12 col-md-6 col-lg-4">
									<div class="lucky">
										<div @click="goToTuaPekKong" class="lucky_col">
											<div class="wanzititle_col">
												<img class="wanzititle" src="/image/TuaPekKongWanZi.webp" />
												<img width="65%" src="/image/TuaPekKongWan.svg" @load="onWanLoaded" />
											</div>
											<div class=" text">
												<a href="#" class="text" @click="goToTuaPekKong">
													{{ $t('LuckyBook.Tua Pek Kong (Wan) Dictionary') }}
												</a>

											</div>
											<div class="text2">
												<a href="#" class="text2">(WZT)</a>
											</div>
										</div>
										<br />
										<div class="btn_col">
											<button class="btn_bg" @click="goToTuaPekKong">{{ $t('LuckyBook.Enter')
												}}</button>
										</div>
										<br />
									</div>
								</div>

								<!-- Guan Yin Ma -->
								<div class="col-12 col-sm-12 col-md-6 col-lg-4">
									<div class="lucky">
										<div @click="goToGuanYinMa" class="lucky_col">
											<div class="wanzititle_col">
												<img class="wanzititle" src="/image/GuanYinQianZi.webp" />
												<img width="65%" src="/image/GuanYinQian.svg" />
											</div>
											<div class="text">
												<a href="#" class="text" @click="goToGuanYinMa">
													{{ $t('LuckyBook.Guan Yin Ma Dictionary') }}</a>
												<p class="text2" @click="goToGuanYinMa"></p>
											</div>
											<div class="text2">
												<a href="#" class="text2">(GZT)</a>
											</div>
										</div>
										<br />
										<div class="btn_col">
											<button class="btn_bg" @click="goToGuanYinMa">{{ $t('LuckyBook.Enter')
												}}</button>
										</div>
										<br />
									</div>
								</div>

								<!-- Tua Pek Kong (Qian) -->
								<div class="col-12 col-sm-12 col-md-6 col-lg-4">
									<div class="lucky">
										<div @click="goToTuaPekKongQian" class="lucky_col">
											<div class="wanzititle_col">
												<img class="wanzititle" src="/image/TuaPekKongQianZi.webp" />
												<img width="65%" src="/image/TuaPekKongQian.svg" />
											</div>
											<div class="text">
												<a href="#" class="text" @click="goToTuaPekKongQian">
													{{ $t('LuckyBook.Tua Pek Kong (Qian) Dictionary') }}</a>
											</div>
											<div class="text2">
												<a href="#" class="text2">(QZT)</a>
											</div>
										</div>
										<br />
										<div class="btn_col">
											<button class="btn_bg" @click="goToTuaPekKongQian">{{ $t('LuckyBook.Enter')
												}}</button>
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
import { useI18n } from 'vue-i18n';

export default {
	components: {
		TopBar
	},
	name: 'LuckyBook',
	setup() {
		const { t, locale } = useI18n(); // Get the i18n instance

		return {
			t,
			locale
		};
	},
	data() {
		return {
			searchQuery: '',
			showSearchResults: false,
			showCloseButton: false,
			activeTab: 'WZT',
			wanLoaded: false,
			showIcon: false,
			scrollTimeout: null,
			//showTuaPekKongQian: false, // Boolean state for showing TuaPekKong (Qian) component
			allData: [],
			filteredData: [],
			filteredDataWZT: [],
			filteredDataGZT: [],
			filteredDataQZT: [],
			showIcon: false,
			scrollTimeout: null,


		};
	},
	computed: {
		language() {
			return this.$i18n.locale;
		},
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
		async performSearch() {
			this.showSearchResults = this.searchQuery.trim().length > 0;

			if (this.showSearchResults) {
				// Load data from JSON files
				const wztData = await fetch('./src/assets/data/wzt.json').then(response => response.json());
				const gztData = await fetch('./src/assets/data/gzt.json').then(response => response.json());
				const qztData = await fetch('./src/assets/data/qzt.json').then(response => response.json());

				this.allData = [...wztData, ...gztData, ...qztData];

				// Filter data based on search query
				this.filteredDataWZT = wztData.filter(item =>
					item.number.includes(this.searchQuery) ||
					item.content.en.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
					item.content.zh.includes(this.searchQuery) ||
					item.content.ms.toLowerCase().includes(this.searchQuery.toLowerCase())
				);
				this.filteredDataGZT = gztData.filter(item =>
					item.number.includes(this.searchQuery) ||
					item.content.en.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
					item.content.zh.includes(this.searchQuery) ||
					item.content.ms.toLowerCase().includes(this.searchQuery.toLowerCase())
				);
				this.filteredDataQZT = qztData.filter(item =>
					item.number.includes(this.searchQuery) ||
					item.content.en.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
					item.content.zh.includes(this.searchQuery) ||
					item.content.ms.toLowerCase().includes(this.searchQuery.toLowerCase())
				);
			}
		},
		onWanLoaded() {
			this.wanLoaded = true;
		},
		clearSearch() {
			this.showSearchResults = false;
			this.searchQuery = '';
			this.showCloseButton = false;
		},
		changeTab(tab) {
			this.activeTab = tab;
		},
		goToTuaPekKong() {
			this.$router.push('/tuapekkongwan');
		},
		goToGuanYinMa() {
			this.$router.push('/guanyin');
		},
		goToTuaPekKongQian() {
			this.$router.push('/tuapekkongqian');
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
};



</script>

<style scoped>
.title_col {
	text-align: -webkit-center;
	margin-top: 73px;
}

@media screen and (max-width:450px) {
	.number_col {
		width: 60%;
	}

}

@media screen and (max-width:768px) {
	.title_col {
		margin-top: 10px;
	}
}

.luckybook_col {
	width: 100%;
	text-align: -webkit-center;
	background: rgb(255, 255, 255);
	border-top-right-radius: 25px;
	border-top-left-radius: 25px;
	display: flex;
}

@media (min-width: 1024px) {
	.luckybook_col {
		width: 70%;
		display: flex;
	}
}

.title {
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
	font-size: 42px;
	padding: 0 20px;
}

@media (min-width:1400px) {

	.title {
		width: 70%;
	}
}

.column {
	width: 80%;
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
	gap: 0.5rem;
	padding-top: 30px;
	background-color: white;
	/* padding-bottom: 10px; */
	height: 290px;
	text-align: -webkit-center;
	width: 100%;
	place-self: center;
	border-radius: 5px;
	align-content: start;
	box-shadow: 0px 2px 2px 2px #989696;
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

@media screen and (max-width:450px) {
	.number_col {
		width: 70%;
	}

}

.item-container {
	padding-top: 30px;
	background-color: white;
	height: 250px;
	text-align: -webkit-center;
	width: 100%;
	border-radius: 5px;
	align-content: start;
	box-shadow: 0px 2px 2px 2px #989696;
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

.close_btn {
	color: #CF2E2E;
	border: none;
	background-color: white;
	position: absolute;
	top: 50%;
	right: 20px;
	transform: translateY(-50%);
	background: none;
	border: none;
	cursor: pointer;


}

.search_input {
	width: 70%;
	padding: 10px;
	margin-right: 10px;
	border: 1px solid #ddd;
	border-radius: 5px;
}

@media screen and (max-width: 321px) {
	.search_input {
		font-size: 13px;
	}
}

.search-result img {
	max-width: 100px;
}

.book_col {

	width: 80%;
	text-align: -webkit-center;
}

.lucky_col {
	background-color: #cf2e2e;
	text-align: center;
	padding-top: 10px;
	width: 84%;
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
	padding-top: 10px;
	width: 88%;
	padding-bottom: 10px;
	align-items: center;
}

.item-content {
	width: 100px;
}

.search-ul {
	padding: 0px;
	gap: 1.0rem;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
}

.text {
	text-align: center;
	text-decoration: none;
	color: white;
	font-weight: bold;
	font-size: 15px;
	margin-top: 10px;
	height: 70px;
}


.nav-tabs {
	gap: 0.5rem;
}

.nav-tabs .nav-link.active {
	background-color: #cf2e2e;
	color: white;
	font-weight: bolder;

}

.nav-tabs .nav-link {
	color: grey;
	font-weight: bolder;
	background-color: gainsboro;
}

.nav-tabs .nav-item.show .nav-link,
.nav-tabs .nav-link.active {
	border-bottom: 2px solid #cf2e2e;
}

@media screen and (min-width:1440px) {
	.nav-tabs {
		width: 80% !important;
	}
}

.nav-item {
	width: 80px;
}

.nav-pills {
	gap: 2.0rem;
}

.text2 {
	text-align: center;
	text-decoration: none;
	color: white;
	font-weight: bold;
	font-size: 15px;
	padding-bottom: 10px;
}

p {
	margin: 0px;
}

.col {
	flex: 1;
	margin: 10px;
	text-align: -webkit-center;
	padding-left: 0px;
	padding-right: 0px;
}

.search_title {
	background-color: #cf2e2e;
	color: white;
	text-align: center;
	width: 75%;
	border-radius: 20px;

}

@media screen and (min-width:1440px) {
	.search-ul {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		width: 80%;
	}
}

@media screen and (min-width:768px) {
	.search_col {
		width: 50%;
	}

	.search-ul {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
	}
}


@media screen and (max-width:450px) {


	.column {
		width: 100%;
	}

	.search_title {
		width: 100%;
	}



	.big_col {
		padding: 30px;
	}

}

.big_col {
	text-align: -webkit-center;
}

.input-wrapper {
	position: relative;
	display: flex;
	align-items: center;
}

.input-container {
	position: relative;
	display: inline-block;
}

.search_input {
	flex: 1;
	padding-right: 30px;
	height: 100%;
}

.go_up_btn {
	position: fixed;
	right: 50px;
	bottom: 15px;
	background-color: #ffffff;
	border-radius: 50px;
	opacity: 0.8;
	color: #CF2E2E;

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
	opacity: 0.5;
}
</style>
