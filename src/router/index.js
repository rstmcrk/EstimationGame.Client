import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EstimationView from '../views/EstimationView.vue'
import store from '../store/index'; 
 
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    beforeEnter: (to, from, next) => {
      if (store.state.user) {
        next('/' + store.state.user.groupName); 
      } else {
        next(); 
      }
    }
  },
  {
    path: '/:id',
    name: 'estimation',
    component: EstimationView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router