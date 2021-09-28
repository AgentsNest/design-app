<template>
  <div class="text-sm p-4 overflow-hidden">
    <Navbar />
    <slot />
    <!-- <Footer /> -->
  </div>
</template>

<script>
import Footer from "../Components/Footer.vue";
import Navbar from "../Components/Navbar.vue";

export default {
  components: {
    Footer,
    Navbar,
  },
};
</script>
