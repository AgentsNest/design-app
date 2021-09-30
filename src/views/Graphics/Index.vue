<template>
  <Layout>
    <div class="my-pdfs w-full relative ">
      <!-- content start -->
      <div class="mb-2 grid grid-cols-2 gap-4">
        <div
          class="bg-white shadow rounded-md h-36"
          v-for="graphic in graphics"
          :key="graphic"
        >
          <!-- <router-link :to="{ name: 'previewGraphic', params: { id: graphic.id } }"> -->
            <Card :graphic='graphic' @click="singleGraphic(graphic.id)" />
          <!-- </router-link> -->
        </div>
      </div>
      <div class="w-full mt-4" v-if="loadMoreBtn">
        <button @click="loadMore" class="text-gray-500 py-2 rounded-md w-full focus:outline-none shadow-md">
          load more
        </button>
      </div>
    </div>

    <!-- Single Graphic Modal -->
    <div class="fixed bg-white top-0 h-full left-0 right-0" v-if="single">
      <div class="flex p-5">
        <button @click="single = false" class="shadow-md p-2 rounded-md">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
          </svg>
        </button>
      </div>
      <Preview :design='design' />

    </div>

  </Layout>
</template>

<script>
import Graphic from "../../Apis/Graphic";
import Layout from "../../Layout/layout.vue";
import Card from './Card.vue'
import Preview from './Preview.vue'

export default {
  components: { Layout, Card, Preview },
  data() {
    return {
      graphics: [],
      design: {},
      loadMoreBtn: true,
      page: 1,
      last_page : null,
      single: false
    };
  },
  methods: {
    fetchData() {
      Graphic.all(this.page).then((response) => {
        this.graphics = response.data.data;
        this.last_page = response.data.last_page;
      });
    },
    loadMore(){
      // console.log('page is:', this.page);
      // var left = this.last_page - this.page;
      if (this.page === this.last_page) {
        console.log('no page more')
        this.loadMoreBtn = false
      } else {
        this.page++;
        Graphic.all(this.page).then((response) => {
          response.data.data.forEach(data => {
            this.graphics.push(data);
          }) 
        });
      }
    },
    singleGraphic(graphic){
      Graphic.details(graphic).then((response) => {
        this.design = response.data;
        this.single = true;
        // console.log(response.data);
      });
    }
  },
  beforeMount() {
    this.fetchData();
  },
};
</script>
