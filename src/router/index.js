import { createRouter, createWebHistory } from 'vue-router'

const routerHistory = createWebHistory()

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      redirect: '/index/welcome',
      meta: {}
    }, {
      path: '/login',
      component: () => import('../views/login.vue')
    }, {
      path: '/index',
      component: () => import('../views/layout/index.vue'),
      name: 'index',
      children: [
        {
          path: 'user',
          component: () => import('../views/user/index.vue'),
          name: 'user',
          meta: { title: "用户管理" }
        }, {
          path: 'welcome',
          component: () => import('../views/welcome/index.vue'),
          meta: { title: "我的信息" }
        }, {
          path: 'menu',
          component: () => import('../views/menu/index.vue'),
          name: 'menu',
          meta: { title: "菜单配置" }
        },{
          path: 'role',
          component: () => import('../views/role/index.vue'),
          name: 'role',
          meta: { title: "角色管理" }
        },{
          path: 'type',
          component: () => import('../views/type/index.vue'),
          name: 'type',
          meta: { title: "材料类别管理" }
        },{
          path: 'product',
          component: () => import('../views/product/index.vue'),
          name: 'product',
          meta: { title: "库存汇总" }
        },{
          path: 'outboundOrder',
          component: () => import('../views/outboundOrder/index.vue'),
          name: 'outboundOrder',
          meta: { title: "出库单" }
        },{
          path: 'warehousingEntry',
          component: () => import('../views/warehousingEntry/index.vue'),
          name: 'warehousingEntry',
          meta: { title: "入库单" }
        },{
          path: 'auditing',
          component: () => import('../views/auditing/index.vue'),
          name: 'auditing',
          meta: { title: "单据审核" }
        }
      ]
    },{
      path: '/register',
      component: () => import('../views/register.vue')
    }
  ]
})
export default router
