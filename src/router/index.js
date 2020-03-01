import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '@/pages/HomePage';
import CatalogPage from '@/pages/CatalogPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
// import Hello from '@/components/HelloWorld';
import ViewHello from '@/components/ViewWorld';

Vue.use(Router);

export default new Router({
  linkActiveClass: 'active',
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
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
    }
  ]
});
