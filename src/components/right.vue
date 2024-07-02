<template>
	<div class="right-column">
		<div class="right">


			<div class="right_col">
				<img class="ball_img" src="\public\image\realistic8ball.png">

				<div class="right_col2">
					<h6>Special Draw Date</h6>
					<p style="padding-bottom: 10px;">Upcoming Special Draw Date</p>
				</div>
				<div class="sprcial_draw_date">
					<p>• 2024-06-25(Tue)</p>
					<hr>
					<p>• 2024-08-13(Tue)</p>
					<hr>
					<p>• 2024-10-29(Tue)</p>
					<hr>
					<p>• 2024-12-31(Tue)</p>
					<hr>
					<br>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'RightColumn',
}
</script>

<style scoped>
.right {
	float: right;
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

}

.right_col2 p {
	padding: 9px;
	margin: 0;
}

.ball_img {
	width: 102px;
	height: 102px;
	position: absolute;
	top: -70px;
	right: 70px;
	z-index: 1;
}

.sprcial_draw_date {
	text-align: center;
	margin-right: 20px;
}

.sprcial_draw_date p {
	padding: 9px;
	margin: 0;
}

.sprcial_draw_date hr {
	margin: 0;
}

h6 {
	padding-top: 10px;
}
</style>