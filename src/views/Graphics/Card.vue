<template>

    <div class="rounded-lg relative">
      <img v-lazy="graphic.thumb" class="w-full contain rounded-lg h-36"  />
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


</template>

<script>
import { reactive } from 'vue'

export default {
  props:['graphic'],
  setup() {
    const errorlazy = reactive({
      src: '/example/assets/log1o.png',
      lifecycle: {
        loading: () => {
          console.log('image loading')
        },
        error: () => {
          console.log('image error')
        },
        loaded: () => {
          console.log('image loaded')
        }
      }
    })
    const change = () => {
      errorlazy.src = 'http://t8.baidu.com/it/u=3571592872,3353494284&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1603764281&t=bedd2d52d62e141cbb08c462183601c7'
    }
    return {
      errorlazy,
      change
    }
  }
};
</script>

<style></style>
