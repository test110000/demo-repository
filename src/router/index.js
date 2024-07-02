import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/dashboard.vue'
import SpinMyLuck from '../views/SpinMyLuck.vue'
import LuckyBook from '../views/LuckyBook.vue'
import TuaPekKong from '../views/TuaPekKong.vue'
import GuanYin from '../views/GuanYin.vue'
import TuaPekKongQian from '../views/gzt.vue'


/*import Jackpot from '../views/Jackpot.vue'
import SpecialDrawDate from '../views/SpecialDrawDate.vue'
import FourDAnalysis from '../views/FourDAnalysis.vue'

import HotFourD from '../views/HotFourD.vue'
*/

const routes = [
	{
		//path: '/',
		//name: 'Dashboard',
		//component: Dashboard
	},
	{
		path: '/spin-my-luck',
		name: 'SpinMyLuck',
		component: SpinMyLuck
	},
	{
		path: '/',
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
