<script setup>
defineProps({
	msg: {
		type: String,
		required: true
	}
})
</script>
<template>
	<div class="left-sidebar">
		<div class="container-fluid">
			<!--leftside-->
			<div class="sidebar" style="background-color: #CF2E2E;">
				<div style="background: white; height: 100%; border-top-right-radius: 50px;">
					<div class="logo_col">
						<img class="d_num_logo" src="/public/image/4D-lottery-wording.png">
					</div>
					<div class="sidebar-main">
						<p class="results_install_app_text">Results</p>
						<br>
						<div class="menu">
							<!--dashboard-->
							<div class="text_col">
								<router-link to="/">
									<img class="pic" src="\public\image\dashboard.png">
									<p class="text_menu">Dashboard</p>
								</router-link>
							</div>
						</div>
						<br>
						<br><br>
						<p class="toolbox_text">Toolbox</p>
						<br>
						<!--Spin My Luck-->
						<div class="menu">
							<div class="text_col">
								<router-link to="/spin-my-luck">
									<img class="pic" src="\public\image\spin.png">
									<p class="text_menu">Spin My Luck</p>
								</router-link>
							</div>
						</div>
						<br>
						<!--Lucky Book-->
						<div class="menu">
							<div class="text_col">
								<router-link to="/lucky-book">
									<img class="pic" src="\public\image\book.png">
									<p class="text_menu">Lucky Book</p>
								</router-link>
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
	name: 'LeftBar'
}
</script>

<style scoped>
/*4D Logo*/
.logo_col {
	display: flex;
	justify-content: center;
}

.d_num_logo {
	padding-top: 20px;
	width: 120px;
	height: auto;
}

/*sidebar*/
.sidebar {
	width: 206px;
	background-color: #ffffff;
	color: #fff;
	/* padding-top: 20px;
	padding-left: 25px;
	padding-right: 5px; */
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	overflow-y: auto;
	border-bottom-right-radius: 50px;
}

.sidebar-main {
	padding-top: 20px;
	padding-left: 25px;
	padding-right: 5px
}

.pic {
	width: 20px;
}

.text_menu {
	text-decoration: none;
	text-align: left;
	font-size: 17px;
	color: gray;
	margin-left: 10px;
}

.menu {
	width: 100%;
	height: 17px;
	font-weight: 500;
	font-size: 28px;
	line-height: 19px;
	-webkit-box-align: center;
	align-items: center;
	color: rgb(38, 76, 170);
	border-radius: 4px;
	cursor: unset;
}

.sidebar ul li {
	padding: 8px;
	text-align: left;
	text-decoration: none;
}

.sidebar ul li a {
	color: rgb(248, 247, 247);
	text-decoration: none;
	display: block;
}

.sidebar ul li a :hover {
	background-color: #ffffff;
}

.toolbox_text {
	height: 16px;
	position: relative;
	font-weight: 700;
	font-size: 16px;
	line-height: 16px;
	-webkit-box-align: center;
	align-items: center;
	color: rgb(0, 0, 0);
}

.results_install_app_text {
	height: 16px;
	position: relative;
	font-weight: 700;
	font-size: 16px;
	line-height: 16px;
	-webkit-box-align: center;
	align-items: center;
	padding-top: 40px;
	padding-bottom: 20px;
	color: rgb(0, 0, 0);
}

.text_col {
	display: ruby;
}
</style>
