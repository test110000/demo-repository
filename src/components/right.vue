<template>
	<div class="right-column">
		<div class="right">


			<div class="right_col">
				<img class="ball_img" src="\image\realistic8ball.png">

				<div class="right_col2">
					<h6>Special Draw Date</h6>
					<p style="padding-bottom: 10px;">Upcoming Special Draw Date</p>
				</div>
				<div class="special-draw-date" v-for="(dateObj, index) in specialDates" :key="index">
					<p :class="{ 'expired': dateObj.expired }">
						• {{ formatDate(dateObj.date) }} {{ getDayOfWeek(dateObj.date) }}
					</p>
					<hr>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'RightColumn',
	data() {
		return {
			specialDates: [
				{ date: '2024-08-13', expired: false },
				{ date: '2024-10-29', expired: false },
				{ date: '2024-12-31', expired: false }
			]
		};
	},
	mounted() {
		this.checkDates();
		// Check dates periodically if you want real-time updates
		setInterval(this.checkDates, 60000); // Check every minute
	},
	methods: {
		formatDate(dateString) {
			const date = new Date(dateString);
			return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
		},
		getDayOfWeek(dateString) {
			const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
			const date = new Date(dateString);
			const dayOfWeek = days[date.getDay()];
			return `(${dayOfWeek})`;
		},
		checkDates() {
			const currentDate = new Date();
			this.specialDates.forEach(dateObj => {
				const specialDate = new Date(dateObj.date);
				if (specialDate <= currentDate) {
					dateObj.expired = true;
				}
			});
			// Filter out expired dates
			this.specialDates = this.specialDates.filter(dateObj => !dateObj.expired);
		}
	}
}
</script>

<style scoped>
.right {
	float: right;
}

.special-draw-date {
	text-align: center;
}

.special-draw-date p {
	margin: 0;
	font-size: 14px;
	color: rgb(118, 118, 118);
}

.special-draw-date hr {
	margin: 10px 20px;
}

.right_col {
	position: fixed;
	right: 0;
	top: 53%;
	transform: translateY(-50%);
	width: 206px;
	/* Adjust width as needed */
	text-align: right;
	max-width: 230px;
	background-color: white;
	border-top-left-radius: 50px;
	border-bottom-left-radius: 50px;
	padding-top: 10px;
}

.right_col2 {
	display: flex;
	flex-direction: column;
	width: 100%;
	justify-content: center;
	align-items: center;
	color: rgb(118, 118, 118);
}

.right_col2 p {
	font-size: 15px;
	margin: 0;
}

.ball_img {
	width: 102px;
	height: 102px;
	position: absolute;
	top: -70px;
	right: 50px;
	z-index: 1;
}

h6 {
	padding-top: 10px;
}

.expired {
	color: red;
}
</style>