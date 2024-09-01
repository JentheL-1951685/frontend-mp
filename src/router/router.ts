import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'index',
    meta: { requiresAuth: false },
    children: [
      {
        path: '/fleets',
        name: 'fleets',
        component: async () => import('@/modules/fleets/views/FleetOverviewView.vue'),
      },
      {
        path: '/user-overview/:fleet_id/:month',
        name: 'UserOverview',
        component: async () => import('@/modules/users/views/UserOverviewView.vue'),
        props: true,
      },
      {
        path: '/cost-overview/:fleet_id/:user_id/:month',
        name: 'CostOverview',
        components: {
          default: async () => import('@/modules/costs/views/CostOverviewView.vue'),
          user: async () => import('@/modules/users/views/UserOverviewView.vue'),
        },
        props: {
          default: true,
          user: true,
        },
      },
      {
        path: '/empty-state',
        name: 'EmptyState',
        component: async () => import('@/components/EmptyState.vue'),
      },
      {
        path: '/help-page',
        name: 'HelpPage',
        component: async () => import('@/components/HelpPage.vue'),
      },
    ],
  },
  {
    name: 'error',
    path: '/:pathMatch(.*)*',
    component: async () => import('@/views/ErrorNotFoundView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router;