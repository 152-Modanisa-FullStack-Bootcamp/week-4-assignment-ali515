import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
//import WatchVideo from '../views/WatchVideo.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  /*
  {
    path: '/watch',
    name: 'Watch',
    component: WatchVideo
  }
  */
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
