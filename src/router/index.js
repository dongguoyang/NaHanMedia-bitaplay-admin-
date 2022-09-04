import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {title: '首页', icon: 'dashboard'}
    }]
  },

  {
    path: '/user',
    component: Layout,
    redirect: '/user/list',
    children: [{
      path: 'list',
      name: 'UserList',
      component: () => import('@/views/user/list'),
      meta: {title: '用户列表', icon: 'el-icon-user-solid'}
    }, {
      path: 'log',
      name: 'UserPhoneBookLog',
      component: () => import('@/views/userPhoneBook/list'),
      meta: {title: '实名来电记录列表', icon: 'el-icon-user-solid'},
      hidden:true
    }]
  },




  {
    path: '/provider',
    component: Layout,
    redirect: '/provider/list',
    meta: {
      title: '软件商管理',
      icon: 'el-icon-truck'
    },
    children: [
      {
        path: 'list',
        name: 'ProviderList',
        component: () => import('@/views/provider/list'),
        meta: {title: '软件商列表'}
      },
      {
        path: 'verify',
        name: 'ProviderVerify',
        component: () => import('@/views/provider/info'),
        meta: {title: '软件商审核'}
      },
    ]
  },

  {
    path: '/userPhoneBook',
    component: Layout,
    redirect: '/userPhoneBook/list',
    meta: {
      title: '实名来电管理',
      icon: 'el-icon-truck'
    },
    children: [
      {
        path: 'list',
        name: 'UserPhoneBookList',
        component: () => import('@/views/userPhoneBook/list'),
        meta: {title: '实名来电联系人列表'}
      },
      {
        path: 'log',
        name: 'UserPhoneBookLog',
        component: () => import('@/views/userPhoneBook/log'),
        meta: {title: '实名来电记录列表'}
      },
    ]
  },

  {
    path: '/appVersionUpdate',
    component: Layout,
    redirect: '/appVersionUpdate/list',
    meta: {
      title: 'app版本更新',
      icon: 'el-icon-truck'
    },
    children: [
      {
        path: 'list',
        name: 'AppVersionUpdateList',
        component: () => import('@/views/appVersionUpdate/list'),
        meta: {title: 'app版本列表'}
      },
      {
        path: 'add',
        name: 'AppVersionUpdateAdd',
        component: () => import('@/views/appVersionUpdate/add'),
        meta: {title: '新增'},
        hidden: true
      },
    ]
  },

  {
    path: '/app',
    component: Layout,
    redirect: '/app/list',
    meta: {
      title: '应用管理',
      icon: 'el-icon-coin'
    },
    children: [
      {
        path: 'list',
        name: 'AppList',
        component: () => import('@/views/app/list'),
        meta: {title: '应用列表'}
      },
      {
        path: 'version',
        name: 'AppVersion',
        component: () => import('@/views/app/version'),
        meta: {title: '应用审核'}
      },
      {
        path: 'category',
        name: 'AppCategory',
        component: () => import('@/views/category/list'),
        meta: {title: '分类列表'}
      },
      {
        path: 'download-record',
        name: 'AppDownloadRecord',
        component: () => import('@/views/app/download_record'),
        meta: {title: '下载记录'}
      },
    ]
  },

  {
    path: '/operation',
    component: Layout,
    redirect: '/operation/grade',
    meta: {
      title: '运营管理',
      icon: 'el-icon-setting'
    },
    children: [
      {
        path: 'avatar',
        name: 'OperationAvatar',
        component: () => import('@/views/operation/avatar'),
        meta: {title: '默认头像'}
      },
      {
        path: 'grade',
        name: 'OperationGrade',
        component: () => import('@/views/operation/grade'),
        meta: {title: '适用人群'}
      },
      {
        path: 'industry',
        name: 'OperationIndustry',
        component: () => import('@/views/operation/industry'),
        meta: {title: '行业列表'}
      },
      {
        path: 'occupation',
        name: 'OperationOccupation',
        component: () => import('@/views/operation/occupation'),
        meta: {title: '职业列表'}
      },
      {
        path: 'feedback',
        name: 'OperationFeedback',
        component: () => import('@/views/operation/feedback'),
        meta: {title: '意见反馈'}
      },
      {
        path: 'web-feedback',
        name: 'OperationWebFeedback',
        component: () => import('@/views/operation/webFeedback'),
        meta: {title: '官网意见反馈'}
      },
      {
        path: 'agreement',
        name: 'OperationAgreement',
        component: () => import('@/views/operation/agreement'),
        meta: {title: '协议管理'}
      },
      {
        path: 'system',
        name: 'OperationSystem',
        component: () => import('@/views/operation/system'),
        meta: {title: '系统设置'}
      },
    ]
  },
  {
    path: '/finance',
    component: Layout,
    meta: {
      title: '财务管理',
      icon: 'el-icon-money'
    },
    children: [
      {
        path: 'recharge',
        name: 'FinanceRecharge',
        component: () => import('@/views/finance/recharge/index'),
        meta: {title: '充值记录'},
        children: [
          {
            path: 'provider',
            component: () => import('@/views/finance/recharge/provider'),
            name: 'FinanceRechargeProvider',
            meta: {title: '软件商充值'}
          },
        ]
      },
      {
        path: 'withdraw',
        name: 'FinanceWithdraw',
        component: () => import('@/views/finance/withdraw/index'),
        meta: {title: '提现记录'},
        children: [
          {
            path: 'user',
            component: () => import('@/views/finance/withdraw/user'),
            name: 'FinanceWithdrawUser',
            meta: {title: '用户提现'}
          },
          {
            path: 'provider',
            component: () => import('@/views/finance/withdraw/provider'),
            name: 'FinanceWithdrawProvider',
            meta: {title: '软件商提现'}
          },
        ]
      },
      {
        path: 'consume',
        name: 'FinanceConsume',
        component: () => import('@/views/finance/consume/index'),
        meta: {title: '消费记录'},
        children: [
          {
            path: 'login',
            component: () => import('@/views/finance/consume/login'),
            name: 'FinanceConsumeLogin',
            meta: {title: '三方登录充值'}
          },
          {
            path: 'reward',
            component: () => import('@/views/finance/consume/reward'),
            name: 'FinanceConsumeReward',
            meta: {title: '推广充值'}
          },
          {
            path: 'fuel',
            component: () => import('@/views/finance/consume/fuel'),
            name: 'FinanceConsumeFuel',
            meta: {title: '燃料充值'}
          },
        ]
      },

      {
        path: 'reward',
        name: 'FinanceReward',
        component: () => import('@/views/finance/reward/index'),
        meta: {title: '奖励记录'},
        children: [
          {
            path: 'download',
            component: () => import('@/views/finance/reward/download'),
            name: 'FinanceRewardDownload',
            meta: {title: '下载奖励'}
          },
          {
            path: 'recommend',
            component: () => import('@/views/finance/reward/recommend'),
            name: 'FinanceRewardRecommend',
            meta: {title: '邀请奖励'}
          },
        ]
      },
    ]
  },
  {
    path: '/word',
    component: Layout,
    redirect: '/word/hot-word',
    meta: {
      title: '搜索管理',
      icon: 'el-icon-search'
    },
    children: [
      {
        path: 'hot-word',
        name: 'HotWordList',
        component: () => import('@/views/hotWord/list'),
        meta: {title: '热门搜索'}
      },
      {
        path: 'search-word',
        name: 'SearchWordList',
        component: () => import('@/views/searchWord/list'),
        meta: {title: '搜索历史'}
      },
    ]
  },

  {
    path: '/help',
    component: Layout,
    redirect: '/help/tec',
    meta: {
      title: '协助管理',
      icon: 'el-icon-search'
    },
    children: [
      {
        path: 'tec',
        name: 'HelpTecList',
        component: () => import('@/views/help/tec'),
        meta: {title: '技术协助'}
      },
      {
        path: 'mark',
        name: 'HelpMarkList',
        component: () => import('@/views/help/mark'),
        meta: {title: '营销协助'}
      },
    ]
  },

  // {
  //   path: '/ads',
  //   component: Layout,
  //   redirect: '/ads/ks',
  //   meta: {
  //     title: '广告监测',
  //     icon: 'el-icon-data-board'
  //   },
  //   children: [
  //     {
  //       path: 'ks',
  //       name: 'KsAds',
  //       component: () => import('@/views/ads/ks'),
  //       meta: {title: '快手平台'}
  //     },
  //   ]
  // },


  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       name: 'Menu2',
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },


  {path: '*', redirect: '/404', hidden: true}
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
