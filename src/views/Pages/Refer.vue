<template>
  <div class="h-screen w-full">
    <div class="flex items-center justify-between mb-5 p-3">
      <button class="flex items-center gap-2 shadow-md rounded-lg p-2" @click="$router.go(-1)">
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
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
    </div>

    <div class="flex flex-col items-center px-5 mt-20">
      <img src="../../assets/refer.svg" class="h-72" />
      <div class="text-xl font-bold mt-6">Invite your friends</div>
      <div class="text-sm text-gray-500 mt-2 text-center">
        Invite your friends to download the app.
      </div>

      <div class="link flex mt-12">
        <div
          class="
            bg-gray-100
            rounded-l-lg
            py-2
            px-8
            text-center text-gray-500 text-sm
          "
        >
          AgentsNest App
        </div>
        <button
          class="text-white rounded-r-lg px-4 text-sm"
          :class="success ? 'bg-green-600' : 'bg-blue-800'"
          @click="doCopy"
        >
          {{ btnText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { copyText } from "vue3-clipboard";

export default {
  data() {
    return {
      btnText: "Copy",
      success: false,
    };
  },
  methods: {
    doCopy() {
      copyText("https://play.google.com/store/apps/details?id=com.agentsnest.app", undefined, (error, event) => {
        if (error) {
          alert("Can not copy");
          console.log(error);
        } else {
          this.success = true;
          this.btnText = "Copied!";
        }
      });
    },
  },
};
</script>

<style></style>
