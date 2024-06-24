<template>
	<div class="top-bar">
		<nav class="navbar navbar-expand-lg navbar-light bg-light">
			<div class="container-fluid">
				<div class="top">
					<a href="#"><img src="C:\Users\User\test\public\image\dashboardcolor.svg"></a>

					<div class="logo_col">
						<div class="logo">
							<a href="#"><img width="40px" height="40px"
									src="C:\Users\User\test\public\image\magnum.svg"></a>
						</div>
						<div class="logo">
							<a href="#"><img src="C:\Users\User\test\public\image\damacai2.svg"></a>
						</div>
						<div class="logo">
							<a href="#"><img width="40px" height="40px"
									src="C:\Users\User\test\public\image\toto.svg"></a>
						</div>
						<div class="logo">
							<a href="#"><img width="40px" height="40px"
									src="C:\Users\User\test\public\image\sg.svg"></a>
						</div>
						<div class="logo">
							<a href="#"><img width="40px" height="40px"
									src="C:\Users\User\test\public\image\sandakan.svg"></a>
						</div>
						<div class="logo">
							<a href="#"><img width="40px" height="40px"
									src="C:\Users\User\test\public\image\diriwan.svg"></a>
						</div>
						<div class="logo">
							<a href="#"><img width="40px" height="40px"
									src="C:\Users\User\test\public\image\ssc.svg"></a>
						</div>
						<div class="logo">
							<a href="#"><img width="40px" height="40px"
									src="C:\Users\User\test\public\image\lhh.svg"></a>
						</div>
						<div class="logo">
							<a href="#"><img width="40px" height="40px"
									src="C:\Users\User\test\public\image\pdn.svg"></a>
						</div>
						<div class="logo">
							<a href="#"><img width="40px" height="40px"
									src="C:\Users\User\test\public\image\gd.svg"></a>
						</div>
					</div>

					<div class="logo">
						<a href="#"><img width="40px" height="40px"
								src="C:\Users\User\test\public\image\refresh.svg"></a>
					</div>

					<div class="light_mode">
						<img src="C:\Users\User\test\public\image\sun.png">
						<div class="light_mode_text">
							<div class="light_mode_text">Light</div>
							<p class="light_mode_text">Mode</p>

						</div>
					</div>
				</div>
			</div>
		</nav>
	</div>
</template>

<script>
export default {
	name: 'TopBar',
}
</script>

<style scoped>
.top-bar {
	height: 60px;
	position: fixed;
	top: 0;
	background-color: #f8f9fa;
	width: 100%;
}

.top {
	left: 206px;
	transform: none;
	width: calc(100% - 206px);
	max-width: unset;
	display: flex;
	gap: 4.5rem;
}

.logo {
	min-width: 40px;
	display: flex;
}

.logo_col {
	min-width: 500px;
	gap: var(--chakra-space-2);
	display: flex;
	padding-left: 20px;
	justify-content: center;
	align-items: center;
}

.img {
	width: 40px;
	height: 40px;
}

.light_mode {
	display: flex;
	-webkit-box-align: center;
	align-items: center;
	-webkit-box-pack: center;
	justify-content: center;
	width: fit-content;
	min-width: 107px;
}

.light_mode_text {
	font-size: 13px;
	font-weight: 500;
	padding-inline: 5px;
	width: 55px;
}

.light_mode_text2 {
	display: flex;
	gap: 0px;
	flex-direction: column;
}
</style>
