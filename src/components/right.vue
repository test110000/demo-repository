<template>
	<div class="right-column">
		<div class="right">
			<img class="ball_img" src="\public\image\realistic8ball.png">

			<div class="right_col">
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
	position: absolute;
	right: 0;
	top: 53%;
	transform: translateY(-50%);
	width: 50%;
	/* Adjust width as needed */
	text-align: right;
	max-width: 230px;
	background-color: grey;
	border-top-left-radius: 20px;
	border-bottom-left-radius: 20px;
	padding-top: 10px;
	padding-bottom: 10px;

}

.right_col2 {
	display: flex;
	flex-direction: column;
	width: 100%;
	justify-content: center;
	align-items: center;

}

.ball_img {
	width: 102px;
	height: 102px;
	position: absolute;
	top: 141px;
	right: 70px;
	z-index: 1;
}

.sprcial_draw_date {
	text-align: center;
	margin-right: 20px;
}

h6 {
	padding-top: 10px;
}
</style>