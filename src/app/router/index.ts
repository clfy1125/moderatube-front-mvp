import { createRouter, createWebHistory } from 'vue-router';

import AuthLayout from '@/app/layouts/AuthLayout/index.vue';
import MainLayout from '@/app/layouts/MainLayout/index.vue';
import Agreement from '@/pages/Agreement/index.vue';
import ChannelManagement from '@/pages/ChannelManagement/index.vue';
import CommentManagement from '@/pages/CommentManagement/index.vue';
import History from '@/pages/History/index.vue';
import Home from '@/pages/Home/index.vue';
import Landing from '@/pages/Landing/index.vue';
import Link from '@/pages/Link/index.vue';
import LogIn from '@/pages/LogIn/index.vue';
import NotFound from '@/pages/NotFound/index.vue';
import PrivacyPolicy from '@/pages/PrivacyPolicy/index.vue';
import Profile from '@/pages/Profile/index.vue';
import SignIn from '@/pages/SignIn/index.vue';
import TermsOfService from '@/pages/TermsOfService/index.vue';
import { useVideosQueryParamsStore } from '@/shared/store/useChannelQueryStore';

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing
  },
  {
    path: '/privacy-policy',
    name: 'PrivacyPolicy',
    component: PrivacyPolicy
  },
  {
    path: '/terms-of-service',
    name: 'TermsOfService',
    component: TermsOfService
  },
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      { path: 'signin', component: SignIn },
      { path: 'login', component: LogIn },
      { path: 'callback', component: LogIn },
      { path: 'link', component: Link },
      { path: 'agreement', name: 'Agreement', component: Agreement }
    ]
  },
  {
    path: '/app',
    component: MainLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'Home',
        component: Home
      },
      {
        path: 'channel-management',
        name: 'ChannelManagement',
        component: ChannelManagement
      },
      {
        path: 'comment-management/:id',
        name: 'CommentManagement',
        component: CommentManagement
      },
      {
        path: 'profile',
        name: 'Profile',
        component: Profile
      },
      {
        path: 'history',
        name: 'History',
        component: History
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const videosQueryParamsStore = useVideosQueryParamsStore();

  if (!from.path.includes('/app/comment-management') && to.path === '/app/channel-management') videosQueryParamsStore.resetVideosQueryParams();
  next();
});

export default router;
