<template>
    <div>
      <md-button class="md-success md-lg">Button</md-button>
      <router-link to="/contacts">
        Link to route one, child one
      </router-link>
      <h1 @click="getSignIn()">Product List</h1>{{token[0]}}
      <button @click="getAllContacts()"></button>      
      
      <div v-if="!loading">
        <ul>
          <li v-for="product in products">
            {{product.title}} - {{product.price}}- {{product.inventory}}
            <br>
            <button 
            :disabled="!productIsInStock(product)"
            @click="addProductToCart(product)"
            >Add To Cart</button>  
          </li>
            <button 
              @click="$store.dispatch('checkout')">Checkout</button>  
            {{ $store.state.cart.checkoutStatus }}

        </ul>
      </div>
      <div v-else>
        <img src="https://i.imgur.com/JfPpwOA.gif">
      </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      loading: false
    };
  },

  computed: {
    ...mapState({
      user: state => state.user.token,
      token: state => state.user.token,
      products: state => state.products.items
    }),

    ...mapGetters("products", {
      productIsInStock: "productIsInStock"
    })
  },

  methods: {
    ...mapActions({
      addProductToCart: "cart/addProductToCart",
      fetchProducts: "products/fetchProducts",
      getSignIn: "user/getSignin",
      getAllContacts: "contacts/getAllContacts"
    })
  },

  created() {
    this.loading = true;
    this.fetchProducts().then(() => (this.loading = false));
  }
};
</script>

<style scoped>
</style>
