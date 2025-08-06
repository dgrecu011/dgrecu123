<template>
  <header
    class="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 shadow-lg sticky top-0 z-50"
  >
    <div
      class="container mx-auto flex justify-between items-center transition-all duration-300 ease-in-out"
    >
      <router-link
        to="/"
        class="text-2xl font-bold hover:text-yellow-400 transition duration-500 ease-in-out transform hover:scale-110"
      >
        Iphone Store
      </router-link>

      <button
        @click="mobileMenuOpen = !mobileMenuOpen"
        class="md:hidden focus:outline-none"
        aria-label="Toggle menu"
      >
        <svg
          v-if="!mobileMenuOpen"
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
        <svg
          v-else
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>

      <nav
        :class="[
          'flex-col md:flex-row md:flex space-y-4 md:space-y-0 md:space-x-6',
          mobileMenuOpen ? 'flex' : 'hidden md:flex',
        ]"
        class="absolute md:static top-full left-0 w-full md:w-auto bg-blue-600 md:bg-transparent p-4 md:p-0 rounded-b-lg md:rounded-none shadow-md md:shadow-none z-40"
      >
        <ul
          class="flex flex-col md:flex-row md:space-x-6 space-y-3 md:space-y-0 text-center md:text-left"
        >
          <li>
            <router-link
              to="/about"
              class="block hover:text-yellow-400 transition duration-300 ease-in-out"
              @click="closeMobileMenu"
              >About Us</router-link
            >
          </li>
          <li>
            <router-link
              to="/contact"
              class="block hover:text-yellow-400 transition duration-300 ease-in-out"
              @click="closeMobileMenu"
              >Contact</router-link
            >
          </li>
          <li>
            <router-link
              to="/"
              class="block hover:text-yellow-400 transition duration-300 ease-in-out"
              @click="closeMobileMenu"
              >Offers</router-link
            >
          </li>
          <li v-if="!isLoggedIn">
            <router-link
              to="/login"
              class="block hover:text-yellow-400 transition duration-300 ease-in-out"
              @click="closeMobileMenu"
              >Login</router-link
            >
          </li>
          <li v-if="isLoggedIn && isAdmin">
            <router-link
              to="/admin"
              class="block hover:text-yellow-400 transition duration-300 ease-in-out"
              @click="closeMobileMenu"
              >Admin</router-link
            >
          </li>
        </ul>
      </nav>


      <div class="relative flex items-center space-x-4">
        <div
          v-if="isLoggedIn"
          class="relative"
          @mouseenter="openDropdown"
          @mouseleave="closeDropdown"
        >
          <button
            @click="toggleDropdown"
            class="flex items-center hover:text-yellow-400 transition duration-300 ease-in-out"
          >
            <i class="fas fa-user-circle text-2xl"></i>
          </button>
          <div
            v-if="dropdownOpen"
            class="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg z-50"
          >
            <router-link
              to="/profile"
              class="block px-4 py-2 hover:bg-indigo-600 hover:text-white"
              @click="selectOption"
              >Profilul Meu</router-link
            >
            <button
              @click="logout"
              class="w-full text-left px-4 py-2 hover:bg-indigo-600 hover:text-white"
            >
              Logout
            </button>
          </div>
        </div>

        <router-link
          to="/cart"
          class="text-white hover:text-yellow-400 transition duration-300 ease-in-out flex items-center relative"
          @click="closeMobileMenu"
        >
          <i class="fas fa-shopping-cart text-2xl"></i>
          <span
            v-if="cartItemCount > 0"
            class="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-green-500 rounded-full transform translate-x-1/2 -translate-y-1/2"
          >
            {{ cartItemCount }}
          </span>
        </router-link>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "AppHeader",
  data() {
    return {
      dropdownOpen: false,
      mobileMenuOpen: false,
    };
  },
  computed: {
    cartItemCount() {
      return this.$store.state.cart.length;
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    isAdmin() {
      const role = this.$store.getters.userRole;
      return role === "admin";
    },
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    openDropdown() {
      this.dropdownOpen = true;
    },
    closeDropdown() {
      this.dropdownOpen = false;
    },
    selectOption() {
      this.dropdownOpen = false;
    },
    logout() {
      this.$store.dispatch("logoutUserAction");
      this.$router.push("/");
      this.dropdownOpen = false;
      this.mobileMenuOpen = false;
    },
    closeMobileMenu() {
      this.mobileMenuOpen = false;
    },
  },
};
</script>

<style scoped>
</style>
