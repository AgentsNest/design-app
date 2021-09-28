<script>
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
export default {
  data() {
    return {
      onLine: navigator.onLine,
      showBackOnline: false,
      offlineWindow: false,
      onlineWindow: true,
    };
  },
  methods: {
    updateOnlineStatus(e) {
      const { type } = e;
      this.onLine = type === "online";
      this.offlineWindow = true;
      this.onlineWindow = false;
    },
  },
  watch: {
    onLine(v) {
      if (v) {
        this.showBackOnline = true;
        setTimeout(() => {
          this.showBackOnline = false;
          this.offlineWindow = false;
          this.onlineWindow = true;
        }, 1000);
      }
    },
  },
  mounted() {
    window.addEventListener("online", this.updateOnlineStatus);
    window.addEventListener("offline", this.updateOnlineStatus);
  },
  beforeDestroy() {
    window.removeEventListener("online", this.updateOnlineStatus);
    window.removeEventListener("offline", this.updateOnlineStatus);
  },
};
</script>

<template>
  <div v-show="offlineWindow" class="p-10 text-center bg-gray-800 h-screen">
    <div class="flex flex-col justify-center items-center h-full text-white">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-20 w-20 mb-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
        />
      </svg>
      <div class="font-fold text-4xl">Ooops!</div>
      <div class="font-fold text-xl mt-3">NO INTERNET CONNECTION</div>
      <div class="mt-4 text-gray-400 text-sm">
        It seems there is something wrong with your intenet connection. Please
        connect to the internet and start AgentsNest.
      </div>
    </div>
  </div>
  <router-view v-show="onlineWindow"></router-view>
</template>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
