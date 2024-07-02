<template>

</template>
<!-- <template>
	<div class="dashboard">
		<div class="draw-results">
			<div v-for="drawObj in data" :key="Object.keys(drawObj)[0]" class="draw-section">
				<div class="draw-header">
					<img :src="getLogo(Object.keys(drawObj)[0])" alt="Logo" class="draw-logo">
					<h1>{{ drawObj[Object.keys(drawObj)[0]].name }}</h1>
				</div>
				<div class="draw-info">
					<span>Date: {{ getCurrentDate() }}</span>
					<span>Draw No.: {{ drawObj[Object.keys(drawObj)[0]].DrawNo }}</span>
				</div>
				<div class="prizes">
					<div class="prize" v-for="(prize, index) in ['1ST Prize', '2ND Prize', '3RD Prize']" :key="index">
						<h2>{{ prize }}</h2>
						<div class="prize-number">{{ drawObj[Object.keys(drawObj)[0]]['P' + (index + 1)] }}</div>
					</div>
					<div class="special">
						<h2>Special</h2>
						<div class="special-numbers">
							<div v-for="(number, index) in getSpecialNumbers(drawObj[Object.keys(drawObj)[0]])"
								:key="index" class="number">{{ number }}</div>
						</div>
					</div>
					<div class="consolation">
						<h2>Consolation</h2>
						<div class="consolation-numbers">
							<div v-for="(number, index) in getConsolationNumbers(drawObj[Object.keys(drawObj)[0]])"
								:key="index" class="number">{{ number }}</div>
						</div>
					</div>
					<div v-if="drawObj[Object.keys(drawObj)[0]].JP1" class="jackpot">
						<div class="jackpot-prize">
							<h2>4D Jackpot 1 Prize</h2>
							<div class="amount">{{ drawObj[Object.keys(drawObj)[0]].JP1 }}</div>
						</div>
						<div class="jackpot-prize">
							<h2>4D Jackpot 2 Prize</h2>
							<div class="amount">{{ drawObj[Object.keys(drawObj)[0]].JP2 }}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	data() {
		return {
			data: []
		};
	},
	mounted() {
		this.fetchData();
	},
	methods: {
		fetchData() {
			axios.get('/data.json')
				.then(response => {
					this.data = response.data;
				})
				.catch(error => {
					console.error('Error fetching data:', error);
				});
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
		getLogo(type) {
			// Return the appropriate logo URL based on the type
			switch (type) {
				case 'M': return 'public/image/magnum.svg';
				case 'DMC': return 'public/image/damacai2.svg';
				case 'ST': return 'public/image/toto.svg';
				case 'Spore': return 'public/image/sg.svg';
				case 'Sandakan': return 'public/image/sandakan.svg';
				case 'Sabah': return 'public/image/sabahtoto.svg';
				case 'SCS': return 'public/image/cashsweeptoto.svg';
				case 'H': return 'public/image/hariharitoto.svg';
				case 'PL': return 'public/image/pdntoto.svg';
				case 'GD': return 'public/image/gdtoto.svg';
				default: return 'path/to/default-logo.png';
			}
		},
		getSpecialNumbers(draw) {
			// Extract special numbers from the draw object
			return [draw.S1, draw.S2, draw.S3, draw.S4, draw.S5, draw.S6, draw.S7, draw.S8, draw.S9, draw.S10, draw.S11, draw.S12, draw.S13].filter(num => num !== '----');
		},
		getConsolationNumbers(draw) {
			// Extract consolation numbers from the draw object
			return [draw.C1, draw.C2, draw.C3, draw.C4, draw.C5, draw.C6, draw.C7, draw.C8, draw.C9, draw.C10];
		}
	}
};
</script>

<style scoped>
.dashboard {
	margin-inline: 206px;
	margin-top: 80px;
	overflow-y: scroll;
	height: calc(-5rem + 100dvh);
}

.draw-results {
	font-family: Arial, sans-serif;
	text-align: center;
}

.draw-section {
	margin-bottom: 40px;
}

.draw-logo {
	width: 100px;
	height: auto;
}

.draw-info,
.prizes,
.special,
.consolation,
.jackpot {
	margin: 20px 0;
}

.prize,
.jackpot-prize {
	display: inline-block;
	margin: 10px;
}

.prize-number,
.amount,
.number {
	font-size: 24px;
	font-weight: bold;
}

.special-numbers,
.consolation-numbers {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
}

.number {
	width: 60px;
	margin: 5px;
	padding: 10px;
	background: #f0f0f0;
	border-radius: 5px;
}
</style> -->
