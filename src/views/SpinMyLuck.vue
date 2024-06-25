<template>
	<div class="container">
		<div class="row">
			<div style="text-align: -webkit-center;" class="col-12">
				<div class="lucky_col">
					<div class="luckyspin_bg">
						<p>Lucky Spin</p>
					</div>
					<br>
					<div class="num4d_col">
						<div class="num4d_col_sm">
							<div class="num4d">
								<p>4D NUMBER</p>
							</div>
							<div class="spinner-column_bg">
								<div class="">

								</div>
								<div v-for="(column, columnIndex) in columns" :key="columnIndex" class="spinner-column">
									<div v-for="number in column" :key="number" class="spinner-number"
										:style="{ transform: 'translateY(' + spins[columnIndex] + 'px)' }">
										{{ number }}
									</div>
								</div>
								<div class="">

								</div>
							</div>
							<button class="btn_4d" @click="toggleSpinStop">{{ buttonLabel }}</button>



						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'SpinMyLuck',
	data() {
		return {
			columns: [
				Array.from({ length: 10 }, (_, i) => i),
				Array.from({ length: 10 }, (_, i) => i),
				Array.from({ length: 10 }, (_, i) => i),
				Array.from({ length: 10 }, (_, i) => i)
			],
			spins: [0, 0, 0, 0], // Track spin positions for each column
			columnHeight: 50, // Height of each number element
			spinning: false, // Flag to track if spinning or stopped
			spinTimeouts: [] // Array to store setTimeout IDs for stopping the spin
		};
	},
	computed: {
		buttonLabel() {
			return this.spinning ? 'Stop' : 'Spin';
		}
	},
	methods: {
		toggleSpinStop() {
			if (this.spinning) {
				this.stopRandomly();
			} else {
				this.spin();
			}
		},
		spin() {
			const minSpin = 10 * this.columnHeight; // Minimum spin to ensure at least one full spin
			const randomSpins = this.columns.map(() => Math.floor(Math.random() * 10) * this.columnHeight);

			// Start the spin for each column
			randomSpins.forEach((spin, index) => {
				this.spins[index] = -(spin + minSpin);
			});

			// Store setTimeout IDs for each column's stop
			this.spinTimeouts = this.columns.map((_, index) => {
				return setTimeout(() => {
					this.stopColumn(index, randomSpins[index]);
				}, (index + 1) * 1000); // Delay each column stop by 1 second
			});

			// Update spinning flag
			this.spinning = true;

			// Automatically change back to 'Spin' after all spins finish
			setTimeout(() => {
				this.spinning = false;
			}, (this.columns.length + 1) * 1000); // Wait for all columns to stop + 1 second
		},
		stopRandomly() {
			if (this.spinning) {
				// Randomly determine the stop position for each column
				const stopPositions = this.columns.map(() => {
					return Math.floor(Math.random() * 10) * this.columnHeight;
				});

				// Immediately stop each column at its respective stop position
				stopPositions.forEach((stopPos, index) => {
					this.stopColumn(index, stopPos);
				});

				// Clear all timeouts to stop any scheduled stops
				this.spinTimeouts.forEach(timeout => clearTimeout(timeout));

				// Update spinning flag
				this.spinning = false;
			}
		},
		stopColumn(index, randomSpin) {
			this.spins[index] = -randomSpin;
		}
	}
};

</script>

<style scoped>
.luckyspin_bg {
	background-color: #264CAA;
	color: white;
	height: 100px;
	align-content: center;
	border-top-right-radius: 15px;
	border-top-left-radius: 15px;
	border-bottom-left-radius: 35px;
	border-bottom-right-radius: 35px;
	font-weight: bold;
}

.lucky_col {
	text-align: -webkit-center;
	background: rgb(255, 255, 255);
	border-top-right-radius: 25px;
	border-top-left-radius: 25px;
}

.num4d_col {
	justify-content: center;
	background-color: #ffffff;
	width: 95%;
}

.num4d_col_sm {
	justify-content: center;
	background-color: #ffffff;
	position: relative;
	top: -51px;
	border-radius: 50px;
	width: 90%;
}

.num4d {
	background-color: #264CAA;
	color: #ffb802;
	height: 35px;
	width: 30%;
	border-radius: 50px;
	align-content: center;
	position: relative;
	top: 17px;
	font-weight: bold;
}

.spinner-column_bg {
	display: flex;
	justify-content: center;
	background-color: #ffffff;
	width: 95%;
	border: 2px solid #264CAA;
	height: 150px;
	align-items: center;
	width: 46%;
	border-radius: 35px;
}

.spinner-column {
	position: relative;
	width: 50px;
	height: 50px;
	overflow: hidden;
	border: 2px solid #264CAA;
	margin: 0 10px;
	border-radius: 10px;
}

.spinner-number {
	width: 100%;
	height: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 24px;
	transition: transform 2s ease-out;
	font-weight: bold;
}



.btn_4d {
	margin-top: 20px;
	padding: 10px 20px;
	background-color: #264CAA;
	color: white;
	border: 2px solid white;
	border-radius: 109px;
	cursor: pointer;
	transition: background-color 0.3s ease;
	position: relative;
	top: -59px;
	font-weight: bold;
	height: 75px;

}

button:hover {
	background-color: #1c378f;
}

button:disabled {
	background-color: #ccc;
	cursor: not-allowed;
}

p {
	margin: 0px;
}
</style>
