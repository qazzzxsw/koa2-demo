import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [{
      path: '/',
      name: 'Login',
      component: () => import('@/components/Login.vue')
    },
    {
      path: '/todoList',
      name: 'TodoList',
      component: () => import('@/components/TodoList.vue')
    },
    {
      path: '*',
      redirect: '/' //输入其他不存在的地址自动跳回首页
    }
  ]
})
