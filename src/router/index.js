import index from '@/index';
import Register from '@/components/appComponent/register';
import MemberRegister from '@/components/appComponent/member-special-registration';
import Feedback from '@/components/appComponent/thanks';
import Login from '@/components/appComponent/login';
import registrationPayment from '@/components/appComponent/register-payment';

/*
 * payment Feedbacks
 */
import registrationPaymentFeedback from '@/components/appComponent/register-payment-feedback';
import PaymentFeedback from '@/components/userComponent/payment-feedback';
/*
 *Change of Details
 */

export const routes = [
  
  {
    path: '/',
    name: 'Register',
    component: Register,
    meta: {}
  },
  {
    path: '/member-register',
    name: 'MemberRegister',
    component: MemberRegister,
    meta: {}
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {}
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      noReqToken: true
    }
  },
  {
    path: '/feedback/:feedback_reference',
    name: 'registrationPaymentFeedback',
    component: registrationPaymentFeedback,
    meta: {}
  },
  {
    path: '/register/payment/:user_id',
    name: 'registrationPayment',
    component: registrationPayment,
    meta: {}
  },
  {
    path: '/account/',
    component: index,
    redirect: '/account/dashboard',
    children: [
     
      {
        path: '/settings/resource-type',
        name: 'ResourceTypeSettings',
        component: ResourceTypeSettings,
        meta: {
          reqToken: true,
          Admin: true
        }
      },
      
      {
        path: '/resources/disapproved-resources',
        name: 'DisapprovedResources',
        component: DisapprovedResources,
        meta: {
          reqToken: true
        }
      },
      {
        path: '/resources/pending-resources',
        name: 'PendingResources',
        component: PendingResources,
        meta: {
          reqToken: true
        }
      }
    ],
    beforeEnter(to, from, next) {
      if (isLoggedIn()) {
        next();
      } else {
        next('/login');
      }
    }
  },
  {
    path: '*',
    redirect: '/404',
    meta: {}
  }
];

const isLoggedIn = () => {
  return !!localStorage.getItem('membershipToken');
};
