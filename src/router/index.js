import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true,
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true,
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true,
  },
  {
    path: '/',
    component: Layout,
    redirect: '/layout',
    children: [
      {
        path: 'layout',
        component: () => import('@/views/commer/topUsergetPage'),
        name: 'layout',
        meta: { title: '用户列表', icon: 'layout', affix: true },
      },
    ],
  },
  {
    path: '/index',
    component: Layout,
    children: [
      {
        path: '/userList',
        component: () => import('@/views/commer/userList'),
        name: 'user',
        meta: { title: '管理员列表', icon: 'user', affix: true },
      },
      {
        path: '/analyse',
        component: () => import('@/views/commer/analyse'),
        name: 'user',
        meta: { title: '统计分析', icon: 'user', affix: true },
      },
      {
        path: '/showList',
        component: () => import('@/views/commer/showList'),
        name: 'user',
        meta: { title: '公告管理', icon: 'user', affix: true },
      },
      {
        path: '/layout',
        component: () => import('@/views/commer/topUsergetPage'),
        name: 'user',
        meta: { title: '用户列表', icon: 'user', affix: true },
      },
      {
        path: '/topStoreOrder/getPage',
        component: () => import('@/views/commer/getPage'),
        name: 'user',
        meta: { title: '存币生息订单', icon: 'user', affix: true },
      },
      {
        path: '/topStoreOrder/getList',
        component: () => import('@/views/commer/getList'),
        name: 'user',
        meta: { title: '存币生息', icon: 'user', affix: true },
      },
      {
        path: '/topAccountTx/getPage',
        component: () => import('@/views/commer/topAccountTx'),
        name: 'user',
        meta: { title: '资产流水', icon: 'user', affix: true },
      },
      {
        path: '/topAccount/getPage',
        component: () => import('@/views/commer/topAccount'),
        name: 'user',
        meta: { title: '用户资产', icon: 'user', affix: true },
      },
      {
        path: '/token/getList',
        component: () => import('@/views/commer/tokengetList'),
        name: 'user',
        meta: { title: '币种管理', icon: 'user', affix: true },
      },
      {
        path: '/chain/getList',
        component: () => import('@/views/commer/chain'),
        name: 'user',
        meta: { title: '链管理', icon: 'user', affix: true },
      },
      {
        path: '/tokenChain/getList',
        component: () => import('@/views/commer/tokenChain'),
        name: 'user',
        meta: { title: '链-币种管', icon: 'user', affix: true },
      }, {
        path: '/powerConfig',
        component: () => import('@/views/commer/powerConfig'),
        name: 'user',
        meta: { title: '算力配置', icon: 'user', affix: true },
      },{
        path: '/transaction',
        component: () => import('@/views/commer/transaction'),
        name: 'user',
        meta: { title: '充提管理', icon: 'user', affix: true },
      },{
        path: '/rechargeManagement',
        component: () => import('@/views/commer/rechargeManagement'),
        name: 'user',
        meta: { title: '充值管理', icon: 'user', affix: true },
      },{
        path: '/getStoreIncomePage',
        component: () => import('@/views/commer/getStoreIncomePage'),
        name: 'user',
        meta: { title: '理财收益明细', icon: 'user', affix: true },
      },{
        path: '/powerOrderGetPage',
        component: () => import('@/views/commer/powerOrderGetPage'),
        name: 'user',
        meta: { title: '算力订单', icon: 'user', affix: true },
      },{
        path: '/topPowerOrderIncomeGetPage',
        component: () => import('@/views/commer/topPowerOrderIncomeGetPage'),
        name: 'user',
        meta: { title: '算力收益明细', icon: 'user', affix: true },
      },{
        path: '/topPowerSharingIncomeGetPage',
        component: () => import('@/views/commer/topPowerSharingIncomeGetPage'),
        name: 'user',
        meta: { title: '算力收益明细', icon: 'user', affix: true },
      },
      
    ],
  },
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
