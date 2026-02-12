import { createRouter, createWebHistory } from 'vue-router';

import AuthLayout from '@/app/layouts/AuthLayout/index.vue';
import MainLayout from '@/app/layouts/MainLayout/index.vue';
import Agreement from '@/pages/Agreement/index.vue';
import ChannelManagement from '@/pages/ChannelManagement/index.vue';
import CommentManagement from '@/pages/CommentManagement/index.vue';
import History from '@/pages/History/index.vue';
import Home from '@/pages/Home/index.vue';
import Link from '@/pages/Link/index.vue';
import LogIn from '@/pages/LogIn/index.vue';
import NotFound from '@/pages/NotFound/index.vue';
import Profile from '@/pages/Profile/index.vue';
import SignIn from '@/pages/SignIn/index.vue';
import { useVideosQueryParamsStore } from '@/shared/store/useChannelQueryStore';

const routes = [
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      { path: 'signin', component: SignIn },
      { path: 'login', component: LogIn }, // google OAuth redirect-url => callback 처리 공간
      { path: 'link', component: Link }, // google OAuth redirect-url => link 처리 공간
      { path: 'agreement', name: 'Agreement', component: Agreement }
    ]
  },
  {
    path: '/',
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

  // '/comment-management'이 아닌 다른 곳에서 'channel-management'로 다시 접근한다면 videosQueryParams 초기화
  if (!from.path.includes('/comment-management') && to.path === '/channel-management') videosQueryParamsStore.resetVideosQueryParams();
  next();
});

export default router;

/* 
  LogIn, SignIn에서 ATRT 있으면 => Home으로 redirect
  MainLayout에서 ATRT 없으면 => 'auth/signin'으로 redirect
  MainLayout에서 ATRT 있으면 => 약관동의 여부 확인
  약관동의 안한 계정이면 => 'auth/agreement'로 redirect
  약관동의한 계정이면 => Home으로 redirect
*/
