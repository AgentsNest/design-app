<template>
  
    <div class="">
      <router-link :to="{ name: 'previewGraphic', params: { id: graphic.id } }">
        <div class="rounded-lg relative">
          <img :src="graphic.thumb" class="w-full contain rounded-lg h-36" />
          <div
            class="
              absolute
              bottom-0
              right-0
              text-white
              px-3
              py-1
              rounded
              flex
              gap-1
              items-center
            "
            v-if="graphic.total_downloads > 0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            {{ graphic.total_downloads }}
          </div>
        </div>
      </router-link>
    </div>

</template>

<script>
import Graphic from "../../Apis/Graphic";
import { ref } from "vue";

export default {
  async setup() {
    const graphics = ref(null);

    const response = await Graphic.all();
    graphics.value = response.data.data;

    return { graphics };
  },
};
</script>

<style></style>
