import { createRouter, createWebHistory } from 'vue-router'

// Lazy load the components
const Dashboard = () => import('../views/dashboard.vue')
const SpinMyLuck = () => import('../views/SpinMyLuck.vue')
const LuckyBook = () => import('../views/LuckyBook.vue')
const TuaPekKong = () => import('../views/TuaPekKong.vue')
const GuanYin = () => import('../views/GuanYin.vue')
const TuaPekKongQian = () => import('../views/gzt.vue')

const routes = [
	// Uncomment and update if Dashboard is needed
	{
		path: '/',
		name: 'Dashboard',
		component: Dashboard
	},
	{
		path: '/spin-my-luck',
		name: 'SpinMyLuck',
		component: SpinMyLuck
	},
	{
		path: '/lucky-book',
		name: 'LuckyBook',
		component: LuckyBook
	},
	{
		path: '/tuapekkong',
		name: 'TuaPekKong',
		component: TuaPekKong
	},
	{
		path: '/guanyin',
		name: 'GuanYin',
		component: GuanYin
	},
	{
		path: '/tuapekkongqian',
		name: 'TuaPekKongQian',
		component: TuaPekKongQian
	}
]

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

export default router
