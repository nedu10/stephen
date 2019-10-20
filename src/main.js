// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue';
import Router from 'vue-router';
import { routes } from './router/index';
import VueResource from 'vue-resource';
import { store } from './store';
import App from './App';
import Notifications from 'vue-notification';
import VeeValidate from 'vee-validate';
import VueSelect from 'vue-select';
import VueSwal from 'vue-swal';
import Croppa from 'vue-croppa';
Vue.use(require('vue-moment'));

Vue.use(Croppa);

Vue.use(Router);
Vue.use(VueResource);
Vue.use(Notifications);
Vue.use(VueSwal);
Vue.use(VeeValidate, {
  events: 'change'
});

// adding auth to ajax request
Vue.http.interceptors.push((request, next) => {
  request.headers.set('Authorization', 'Bearer ' + localStorage.getItem('membershipToken'));
  request.headers.set('Accept', 'application/json');
  next();
});

//global v-select component
Vue.component('v-select', VueSelect);

const router = new Router({
  mode: 'history',
  routes
});

//currency filteration
Vue.filter('ToCurrency', function (value) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0
  });

  return formatter.format(value).replace('NGN', '₦');
});

//date filteration
Vue.filter('ToDate', function (value) {
  if (!value) return '';
  value = value.split('T');
  let newValue = value[0];

  let date = newValue
    .split('-')
    .reverse()
    .join('-');
  return date;
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
