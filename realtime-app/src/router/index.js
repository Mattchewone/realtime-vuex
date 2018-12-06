import Login from '@/pages/Login'
import Signup from '@/pages/Signup'
import Messages from '@/pages/Messages'

export default [
  { path: '/messages', name: 'messages', component: Messages, meta: { requiresAuth: true } },
  { path: '/login', name: 'login', component: Login },
  { path: '/signup', name: 'signup', component: Signup },
  { path: '*', redirect: '/login' }
]
