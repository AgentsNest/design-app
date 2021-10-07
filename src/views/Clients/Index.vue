<template>
	<Layout>
    <div class="w-full">
      <div class="mb-4 bg-gray-100 flex w-full rounded-lg items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 mx-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input type="text" placeholder="Search by name..." class="py-2 bg-gray-100 w-full rounded-lg focus:outline-none">
      </div>
      <div class="flex mb-4 justify-between items-center">
        <div class="">Total Client : 209</div>
        <button class="h-8 w-10 bg-gray-700 text-white rounded-lg flex justify-center items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        </button>
      </div>
      <article class="overflow-hidden rounded-lg shadow-md flex gap-4 mb-3">
        <img alt="Placeholder" class="block h-auto w-24" src="https://picsum.photos/600/400/?random">
        <div class="py-3">
          <div class="font-bold">Mr. Tushar Chuttani</div>
          <div class="text-sm text-gray-500">Added: <span>29 Jan 2021</span></div>
          <div class="text-sm text-gray-500">Properties: <span>02</span></div>
        </div>
      </article>
    </div> 
  </Layout>
</template>

<script>
import Layout from "../../Layout/layout.vue";
export default {
  name: 'Clients',
  components: { Layout },
  data() {
    return {

    };
  },
};
</script>

<style scoped>
</style>
