import { createRouter, createWebHistory } from 'vue-router';

const Dashboard = () => import('../views/dashboard.vue');
const SpinMyLuck = () => import('../views/SpinMyLuck.vue');
const LuckyBook = () => import('../views/LuckyBook.vue');
const TuaPekKongWan = () => import('../views/TuaPekKong.vue');
const GuanYin = () => import('../views/GuanYin.vue');
const TuaPekKongQian = () => import('../views/qzt.vue');

const routes = [
	{
		path: '/',
		name: 'Dashboard',
		component: Dashboard,
		meta: { keepAlive: true }
	},
	{
		path: '/spin-my-luck',
		name: 'SpinMyLuck',
		component: SpinMyLuck,
		meta: { keepAlive: true }
	},
	{
		path: '/lucky-book',
		name: 'LuckyBook',
		component: LuckyBook,
		meta: { keepAlive: true }
	},
	{
		path: '/lucky-book/tuapekkongwan',
		name: 'TuaPekKongWan',
		component: TuaPekKongWan,
		meta: { keepAlive: true }
	},
	{
		path: '/lucky-book/guanyin',
		name: 'GuanYin',
		component: GuanYin,
		meta: { keepAlive: true }
	},
	{
		path: '/lucky-book/tuapekkongqian',
		name: 'TuaPekKongQian',
		component: TuaPekKongQian,
		meta: { keepAlive: true }
	}
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

export default router;
