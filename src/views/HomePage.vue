<template>
  <div class="container mx-auto p-4">
    <section class="text-center py-12 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg">
      <h1 class="text-4xl font-bold">Welcome to Our iPhone Store!</h1>
      <p class="mt-4 text-lg">Discover the latest iPhones with exclusive offers and discounts.</p>
    </section>

    <section class="my-12">
      <h2 class="text-3xl font-semibold text-center mb-6">Featured Products</h2>
      <div class="flex justify-center mb-4">
        <div class="relative">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search products..."
            class="p-2 pl-10 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ease-in-out"
          />
          <span class="absolute left-3 top-1/2 transform -translate-y-1/2">
            <svg class="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M10 4a6 6 0 100 12 6 6 0 000-12z" />
            </svg>
          </span>
        </div>
        <select v-model="sortOption" @change="sortProducts" class="p-2 bg-transparent rounded-lg shadow-md ml-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ease-in-out hover:bg-indigo-100">
          <option value="name">Sort by Name</option>
          <option value="priceLowToHigh">Sort by Price: Low to High</option>
          <option value="priceHighToLow">Sort by Price: High to Low</option>
        </select>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="product in sortedProducts"
          :key="product.id"
          class="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition-shadow duration-300"
        >
          <img :src="product.image" :alt="product.name" class="w-full h-48 object-contain rounded-t-lg" />
          <h3 class="text-xl font-semibold mt-4">{{ product.name }}</h3>
          <p class="text-gray-500">{{ product.description }}</p>
          <p class="text-lg font-bold mt-2 text-indigo-600">{{ formatPrice(product.price) }} €</p>

          <color-selector
            :colors="product.colors"
            :selected-color="product.selectedColor"
            @color-selected="updateColor(product, $event)"
          ></color-selector>

          <div class="flex justify-between items-center mt-4">
            <button @click.prevent="addToCart(product)" class="bg-indigo-600 text-white px-4 py-2 rounded-lg">
              Add to Cart
            </button>
            <router-link :to="`/product/${product.id}`" class="text-indigo-600">View Product</router-link>
          </div>
          <div v-if="addedToCart === product.id" class="mt-2 text-green-600">✔ Added to cart!</div>
        </div>
      </div>
    </section>

    <section class="bg-gray-100 py-12 mt-16">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-gradient-to-r from-green-400 to-blue-500 p-8 text-white rounded-lg shadow-lg">
          <h3 class="text-2xl font-bold">Special Discount for New Customers!</h3>
          <p class="mt-4">Get 10% off your first purchase. Limited time offer!</p>
          <router-link to="/" class="inline-block mt-6 bg-white text-green-600 font-bold px-6 py-2 rounded-lg">Shop Now</router-link>
        </div>
        <div class="bg-gradient-to-r from-yellow-400 to-red-500 p-8 text-white rounded-lg shadow-lg">
          <h3 class="text-2xl font-bold">Buy an iPhone, Get Free Accessories!</h3>
          <p class="mt-4">Offer valid for selected models only. Don't miss out!</p>
          <router-link to="/" class="inline-block mt-6 bg-white text-red-600 font-bold px-6 py-2 rounded-lg">Explore Now</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ColorSelector from "../components/ColorSelector.vue";

export default {
  components: {
    ColorSelector,
  },
  data() {
    return {
      products: [],
      addedToCart: null,
      sortOption: "name",
      searchQuery: "",
    };
  },
  computed: {
    ...mapGetters(["cart"]),
    filteredProducts() {
      return this.products.filter(product =>
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    sortedProducts() {
      return [...this.filteredProducts].sort((a, b) => {
        if (this.sortOption === "name") {
          return a.name.localeCompare(b.name);
        } else if (this.sortOption === "priceLowToHigh") {
          return a.price - b.price;
        } else if (this.sortOption === "priceHighToLow") {
          return b.price - a.price;
        }
      });
    },
  },
  methods: {
    ...mapActions(["addToCartAction"]),
    async fetchProducts() {
  try {
    const response = await fetch("https://raw.githubusercontent.com/dgrecu011/iphone-store-api/refs/heads/main/db.json");
    const data = await response.json();
    this.products = data.products;
    this.products.forEach((product) => {
      if (!product.selectedColor) {
        product.selectedColor = product.colors[0];
      }
    });
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}
,
    addToCart(product) {
      const color = product.selectedColor ? product.selectedColor.toLowerCase() : null;
      const productToAdd = { ...product, selectedColor: color };
      this.addToCartAction(productToAdd);
      this.addedToCart = product.id;
      setTimeout(() => {
        this.addedToCart = null;
      }, 3000);
    },
    formatPrice(price) {
      return price.toFixed(2);
    },
    updateColor(product, color) {
      product.selectedColor = color;
    },
  },
  mounted() {
    this.fetchProducts();
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
