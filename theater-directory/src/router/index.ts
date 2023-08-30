import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProfileView from '../views/ProfileView.vue'
import RolesView from '../views/RolesView.vue'
import DirectoryView from '../views/DirectoryView.vue'
import OpportunitiesView from '../views/OpportunitiesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/profile/:id?',
      name: 'profile',
      component: ProfileView,
      props: true
    },
    {
      path: '/roles',
      name: 'roles',
      component: RolesView
    },
    {
      path: '/directory',
      name: 'directory',
      component: DirectoryView
    },
    {
      path: '/opportunities',
      name: 'opportunities',
      component: OpportunitiesView
    }
  ]
})

export default router
