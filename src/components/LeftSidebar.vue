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
		<nav class="navbar navbar-expand-lg navbar-light bg-light">
			<div class="container-fluid">
				<!--leftside-->
				<div class="sidebar">
					<div class="logo_col">
						<img class="d_num_logo" src="C:\Users\User\test\public\image\4Dlogo.png">
						<img src="C:\Users\User\test\public\image\4dnumText.svg">
					</div>

					<p class="results_install_app_text">Results</p>
					<br>
					<div class="menu">
						<!--dashboard-->
						<div class="text_col">
							<router-link to="/">
								<img class="pic" src="C:\Users\User\test\public\image\dashboard.png">
								<p class="text_menu">Dashboard</p>
							</router-link>
						</div>
					</div>
					<br>
					<!--jackpot-->
					<!--<div class="menu">
        <div>
          <img class="pic" src="C:\Users\User\test\public\image\jackpotInactive.svg">
        </div>
        <div>
          <a class="text_menu" href="#">Jackpot</a>
        </div>
      </div>-->

					<br><br>
					<p class="toolbox_text">Toolbox</p>
					<br>
					<!--special draw date-->
					<!--<div class="menu">
						<div>
							<img class="pic" src="C:\Users\User\test\public\image\special_draw_date.png">
						</div>
						<div>
							<a class="text_menu" href="#">Special Draw Date</a>
						</div>
					</div>
					<br>-->
					<!--4D Number Analysis-->
					<!--<div class="menu">
        <div>
          <img class="pic" src="C:\Users\User\test\public\image\4dnum.png">
        </div>
        <div>
          <a class="text_menu" href="#">4D Number Analysis</a>
        </div>
      </div>
      <br>-->
					<!--Spin My Luck-->
					<div class="menu">
						<div class="text_col">
							<router-link to="/spin-my-luck">
								<img class="pic" src="C:\Users\User\test\public\image\spin.png">
								<p class="text_menu">Spin My Luck</p>
							</router-link>
						</div>
					</div>
					<br>
					<!--Hot 4D Number-->
					<!--<div class="menu">
						<div>
							<img class="pic" src="C:\Users\User\test\public\image\hot.png">
						</div>
						<div>
							<a class="text_menu" href="#">Hot 4D Number</a>
						</div>
					</div>
					<br>-->
					<!--Lucky Book-->
					<div class="menu">
						<div class="text_col">
							<router-link to="/lucky-book">
								<img class="pic" src="C:\Users\User\test\public\image\book.png">
								<p class="text_menu">Lucky Book</p>
							</router-link>
						</div>
					</div>


					<p class="results_install_app_text">Install App</p>

					<div class="install_app">
						<a href=#><img width="80px" src="C:\Users\User\test\public\image\appStoreUSBlack.svg"></a>

						<a href="#"><img width="70px" height="30px" src="C:\Users\User\test\public\image\APK.png"></a>
					</div>
					<p class="version_text">Version 3.0.1.15</p>
				</div>
			</div>
		</nav>
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
	-webkit-box-align: center;
	align-items: center;
	flex-direction: row;
	gap: 0.5rem;
}

.d_num_logo {
	width: 40px;
	height: auto;
	border-radius: 50%;
}

/*sidebar*/
.sidebar {
	width: 260px;
	background-color: #ffffff;
	color: #fff;
	padding: 23px;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	overflow-y: auto;
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

.install_app {
	display: flex;
	-webkit-box-align: center;
	align-items: center;
	flex-direction: row;
	gap: 0.5rem;
}

.version_text {
	text-align: center;
	position: absolute;
	bottom: 15px;
	color: gray;
	opacity: 0.5;
	font-weight: 500;
	margin-top: var(--chakra-space-3);
	margin-bottom: var(--chakra-space-3);
}

.text_col {
	display: ruby;
}
</style>
