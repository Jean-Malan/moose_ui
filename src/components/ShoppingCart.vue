<template>
  <div>
    <h1>Shopping Cart</h1>
    <ul>
      <li v-for="product in products">
        {{product.title}} - {{product.price}} - {{product.quantity}}
      </li>
    </ul>
    <strong>Total: </strong>{{cartTotal}}
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("cart", {
      products: "cartProducts",
      cartTotal: "cartTotal"
    })
  }
};
</script>

<style>
</style>