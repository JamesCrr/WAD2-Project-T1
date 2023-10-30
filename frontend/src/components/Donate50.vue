<template>
  <!-- stripe-checkout -->
  <div>
    <stripe-checkout
      v-if="readyToPay"
      ref="checkoutRef"
      mode="payment"
      :pk="publishableKey"
      :line-items="lineItems"
      :success-url="successURL"
      :cancel-url="cancelURL"
      @loading="(v) => (loading = v)"
    />
    <button class="btn btn-primary" @click="submit">$50</button>
  </div>
</template>

<script>
import { StripeCheckout } from "@vue-stripe/vue-stripe"

export default {
  data() {
    this.publishableKey =
      "pk_test_51O4n0jBWraf69XnWSeezJW88o1buIhc2GF99LFdvQAgYaaw1zpXEeAla8XHQZS08uNrkh0EusMbzHoKWKt0Vb7g500NTzmDcIq"
    return {
      readyToPay: false,
      loading: false,
      lineItems: [
        {
          price: "price_1O5KToBWraf69XnWnhUFnyzv", // The id of the one-time price you created in your Stripe dashboard
          quantity: 1,
        },
      ],
      successURL: `${import.meta.env.VITE_deployedURL}/success`,
      cancelURL: `${import.meta.env.VITE_deployedURL}/error`,
    }
  },
  components: {
    StripeCheckout,
  },
  methods: {
    async submit() {
      this.readyToPay = true
      await this.$nextTick()

      // You will be redirected to Stripe's secure checkout page
      this.$refs.checkoutRef.redirectToCheckout()
    },
  },
}
</script>

<style></style>
