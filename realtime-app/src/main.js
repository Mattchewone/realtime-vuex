import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import routes from './router/index'
import store from './store'

Vue.use(VueRouter)

Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = store.state.auth.user
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) {
    next('/login')
  } else {
    next()
  }
})

// Auth first before loading the app
store.dispatch('auth/authenticate')
  .catch(() => {})
  .then(() => {
    new Vue({
      render: h => h(App),
      router,
      store
    }).$mount('#app')
  })
