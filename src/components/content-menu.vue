<template>
	<!-- Hamburger Button -->
	<button class="content_btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar2"
		aria-controls="offcanvasNavbar">
		<span class="navbar-toggler-icon">&#9776</span>
	</button>

	<!-- Offcanvas Sidebar -->
	<div class="offcanvas offcanvas-start offcanvas-custom-width border-top-bottom-right-80px width-sidebar"
		tabindex="-1" id="offcanvasNavbar2" aria-labelledby="offcanvasNavbarLabel">
		<div class="offcanvas-header">
			<button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
		</div>

		<div class="offcanvas-body">
			<ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
				<li class="nav-item">
					<h5 class="nav-link">{{ $t('Sidebar.Result') }}</h5>
				</li>
				<li class="nav-item">
					<router-link class="nav-link" to="/" :class="{ active: isActive('/') }">
						<img :src="getImageSrc('/', '/image/dashboard.webp', '/image/dashboard_Active.svg')"
							style="width: 25px; margin-right: 13px;" />
						{{ $t('Sidebar.Dashboard') }}
					</router-link>
				</li>
				<li style="margin-top: 20px;" class="nav-item">
					<h5 class="nav-link">{{ $t('Sidebar.ToolBox') }}</h5>
				</li>
				<li class="nav-item">
					<router-link class="nav-link" to="/spin-my-luck" :class="{ active: isActive('/spin-my-luck') }">
						<img :src="getImageSrc('/spin-my-luck', '/image/spin.webp', '/image/spin_Active.svg')"
							style="width: 25px; margin-right: 13px;" />
						{{ $t('Sidebar.Spin My Luck') }}
					</router-link>
				</li>
				<li class="nav-item">
					<router-link class="nav-link" to="/lucky-book" :class="{ active: isActive('/lucky-book') }">
						<img :src="getImageSrc('/lucky-book', '/image/book.svg', '/image/book_Active.svg')"
							style="width: 25px; margin-right: 13px;" />
						{{ $t('Sidebar.Lucky Book') }}
					</router-link>
				</li>
				<li style="margin-top: 20px;" class="nav-item">
					<h5 class="nav-link">{{ $t('Sidebar.Setting') }}</h5>
				</li>
				<li class="nav-item">
					<img src="/image/Earth_icon.svg" style="width: 25px; margin-right: 13px;" />
					<button style="padding: 0;" class="btn dropdown-toggle" type="button" id="dropdownMenuButton"
						data-bs-toggle="dropdown" aria-expanded="false">
						{{ $t('Sidebar.Language') }}
					</button>
					<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
						<li><a class="dropdown-item" @click="changeLanguage('en')">English</a></li>
						<li><a class="dropdown-item" @click="changeLanguage('zh')">中文</a></li>
						<li><a class="dropdown-item" @click="changeLanguage('ms')">Malay</a></li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Content-Menu',
	data() {
		return {

		}
	},
	methods: {
		isActive(route) {
			if (route === '/') {
				return this.$route.path === route || this.$route.path === '/';
			}
			return this.$route.path.startsWith(route);
		},
		changeLanguage(lang) {
			this.$i18n.locale = lang;
		},
		getImageSrc(route, defaultImage, activeImage) {
			return this.isActive(route) ? activeImage : defaultImage;
		},
	}
}
</script>

<style scoped>
*,
::after,
::before {
	z-index: unset;
}

.content_btn {
	position: absolute;
	top: 71px;
	left: 20px;
	z-index: 2;
	background-color: white !important;
	border: 0 !important;
	color: #000 !important;
	opacity: 0.8;
	border-radius: 50%;
	width: 30px;
	height: 30px;
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
	font-size: 15px;
	font-weight: 700;
}

.btn-close {
	margin: 50px 32px 0px 24px;
	position: absolute;
	right: 0;
}

.offcanvas-custom-width {
	--bs-offcanvas-width: 320px;
	/* Set your desired width here */
}

.offcanvas.offcanvas-start.border-top-bottom-right-80px.width-sidebar {
	z-index: 9999;
	border-top-right-radius: 50px;
	border-bottom-right-radius: 50px;
}

.nav-item h5 {
	font-weight: 700;
}

.active {
	color: rgb(207, 46, 46) !important;
	font-weight: 700;
}
</style>