<template>
  <div class="container mx-auto p-4">
    <h1 class="text-4xl font-bold text-center py-4">Admin Dashboard</h1>
    
    <section class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg p-8 mb-8">
      <h2 class="text-3xl font-semibold text-center">Manage Products</h2>
      <p class="mt-4 text-lg text-center">Add or remove products from your inventory.</p>
      
      <div class="mt-8">
        <input
          type="text"
          v-model="newProductName"
          placeholder="Product Name"
          class="p-2 border border-gray-300 rounded-lg shadow-md w-full mb-4"
        />
        <input
          type="number"
          v-model="newProductPrice"
          placeholder="Product Price"
          class="p-2 border border-gray-300 rounded-lg shadow-md w-full mb-4"
        />
        <button @click="addProduct" class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
          Add Product
        </button>
      </div>
    </section>

    <section class="bg-gray-100 p-4 rounded-lg">
      <h2 class="text-3xl font-semibold text-center mb-4">Existing Products</h2>
      <ul>
        <li v-for="product in products" :key="product.id" class="flex justify-between items-center bg-white p-4 mb-2 rounded-lg shadow-md">
          <span>{{ product.name }} - {{ formatPrice(product.price) }} €</span>
          <button @click="removeProduct(product.id)" class="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600">
            Remove
          </button>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  name: "DashboardPage",
  data() {
    return {
      newProductName: "",
      newProductPrice: null,
      products: [],
    };
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await fetch("http://localhost:3000/products");
        this.products = await response.json();
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    async addProduct() {
      if (this.newProductName && this.newProductPrice) {
        const newProduct = {
          name: this.newProductName,
          price: parseFloat(this.newProductPrice),
        };
        try {
          await fetch("http://localhost:3000/products", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct),
          });
          this.fetchProducts(); // Refresh the product list
          this.newProductName = "";
          this.newProductPrice = null;
        } catch (error) {
          console.error("Error adding product:", error);
        }
      }
    },
    async removeProduct(productId) {
      try {
        await fetch(`http://localhost:3000/products/${productId}`, {
          method: "DELETE",
        });
        this.fetchProducts(); // Refresh the product list
      } catch (error) {
        console.error("Error removing product:", error);
      }
    },
    formatPrice(price) {
      return price.toFixed(2);
    },
  },
  mounted() {
    this.fetchProducts();
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>
