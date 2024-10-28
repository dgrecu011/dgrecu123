import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import ProductPage from "../views/ProductPage.vue";
import LoginPage from "../views/LoginPage.vue";
import CartPage from "../views/CartPage.vue";
import AboutPage from "../views/AboutPage.vue";
import ContactPage from "../views/ContactPage.vue";
import RegisterPage from "@/views/RegisterPage.vue";
import CheckoutPage from "../views/CheckoutPage.vue";
import UserProfile from "@/views/UserProfile.vue";
import AdminPage from "@/views/AdminPage.vue"; 
import store from "@/store"; 

const routes = [
  { path: "/", component: HomePage },
  { path: "/product/:id", name: "ProductPage", component: ProductPage },
  { path: "/login", name: "Login", component: LoginPage },
  { path: "/cart", component: CartPage },
  { path: "/about", component: AboutPage },
  { path: "/contact", component: ContactPage },
  { path: "/register", component: RegisterPage },
  { path: "/checkout", name: "Checkout", component: CheckoutPage },
  { path: "/profile", name: "Profile", component: UserProfile },
  { path: "/admin", name: "Admin", component: AdminPage, meta: { requiresAdmin: true } }, // Admin route
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});


router.beforeEach((to, from, next) => {
  const isAdmin = store.getters.isAdmin;
  if (to.matched.some(record => record.meta.requiresAdmin) && !isAdmin) {
   
    next({ name: 'Login' }); 
  } else {
    next(); 
  }
});

export default router;
