<template>
  <Layout>
    <div class="my-pdfs w-full relative mt-10">
      <!-- content start -->
      <div class="mb-2 grid grid-cols-2 gap-4">
        <div
          class="bg-white shadow rounded-md h-40"
          v-for="graphic in graphics"
          :key="graphic"
        >
          <router-link :to="{ name: 'previewGraphic', params: { id: graphic.id } }">
            <Card :graphic='graphic' />
          </router-link>
        </div>
      </div>
      <div class="w-full mt-4" v-if="loadMoreBtn">
        <button @click="loadMore" class="text-gray-500 py-2 rounded-md w-full focus:outline-none shadow-md">
          load more
        </button>
      </div>
    </div>

  </Layout>
</template>

<script>
import Graphic from "../../Apis/Graphic";
import Layout from "../../Layout/layout.vue";
import Card from './Card.vue'

export default {
  components: { Layout, Card },
  data() {
    return {
      graphics: [],
      design: {},
      loadMoreBtn: true,
      page: 1,
      last_page : null,
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
