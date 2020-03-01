import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '@/pages/HomePage';
import CatalogPage from '@/pages/CatalogPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';

import DashboardPage from '@/pages/DashboardPage';
import ForgotPasswordPage from '@/pages/ForgotPasswordPage';
import ResetPasswordPage from '@/pages/ResetPasswordPage';
import SecretsPage from '@/pages/SecretsPage';

import ViewHello from '@/components/ViewWorld';

import store from '@/store/index.js'

Vue.use(Router);

const router = new Router({
  linkActiveClass: 'active',
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage
    },
    {
      path: '/catalog',
      name: 'Catalog',
      component: CatalogPage
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginPage
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterPage
    },
    {
      path: '/view',
      name: 'ViewHello',
      component: ViewHello
    },
    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: ForgotPasswordPage
    },
    {
      path: '/password/reset/:code',
      name: 'ResetPassword',
      component: ResetPasswordPage,
      props: true
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: DashboardPage,
      meta: { requiresAuth: true }
    },
    {
      path: '/secrets',
      name: 'SecretsPage',
      component: SecretsPage,
      meta: { requiresAuth: true }
    },

  ]
});


// Set up global navigation guard
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.isAuthenticated) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }

  // Clear form errors on every page change
  store.commit('clearFormErrors')
});

export default router;