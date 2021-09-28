<template>
  <Layout>
    <div class="bg-white w-full">
      <div class="flex justify-between items-center mb-4">
        <div class="pageHeading font-bold text-2xl">Leads</div>
        <button class="border-2 rounded-lg p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </button>
      </div>

      <!-- content-tabs -->
      <div
        class="
          flex
          justify-between
          bg-gray-100
          rounded-lg
          px-6
          text-sm
          mb-4
          text-gray-400
        "
      ></div>
    </div>
  </Layout>
</template>

<script>
import Layout from "../../Layout/layout.vue";

export default {
  components: {
    Layout,
  },
};
</script>

<style></style>
