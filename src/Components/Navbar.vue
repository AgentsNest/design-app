<template>
  <nav class="text-gray-800 font-light mb-3">
    <div class="flex justify-between">
      <button @click="drawer" class="flex items-center">
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
            d="M4 6h16M4 12h16M4 18h7"
          />
        </svg>
        <span class="font-bold ml-3 text-lg">agnt.</span>
      </button>

      <button @click.prevent="logout">
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
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
      </button>

      <!-- <div class="flex items-center gap-1">
        <notification-component></notification-component>
        <div class="h-5 w-5 relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"
            />
          </svg>
          <span class="flex w-2 h-2 absolute top-0 right-0">
            <span
              class="
                animate-ping
                absolute
                inline-flex
                h-full
                w-full
                rounded-full
                bg-red-600
                opacity-75
              "
            ></span>
            <span
              class="relative inline-flex rounded-full h-2 w-2 bg-red-600"
            ></span>
          </span>
        </div>
      </div> -->
    </div>
  </nav>

  <!-- sidebar drawer -->
  <aside
    class="
      transform
      top-0
      left-0
      bottom-0
      w-full
      fixed
      h-screen
      overflow-y-auto
      ease-in-out
      transition-all
      duration-300
      z-30
      navbar
    "
    :class="isOpen ? 'navbar-open' : 'navbar-close'"
    @click="drawer"
  >
    <div class="drawer-box bg-white w-3/4 p-6 shadow-xl">
      <div class="flex flex-col items-center gap-6">
        <img class="h-12 rounded-xl mr-3" :src="agent.brand_logo" />
        <div class="text-center">
          <div class="font-bold text-xl">{{ agent.name }}</div>
          <div class="text-sm">{{ agent.email }}</div>
          <div class="text-gray-300 text-xs">Free member</div>
        </div>
      </div>

      <hr class="my-6" />

      <div class="flex flex-col content-between">
        <div class="space-y-6">
          <router-link :to="{ name: 'graphics' }" exact class="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
            <div class="ml-3 text-gray-800">Home</div>
          </router-link>

          <router-link :to="{ name: 'profile' }" class="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
            <div class="ml-3 text-gray-800">Profile</div>
          </router-link>

          <a href="https://play.google.com/store/apps/details?id=com.agentsnest.app" class="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <div class="ml-3 text-gray-800">Rate the app</div>
          </a>

          <button @click.prevent="logout" class="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <div class="ml-3 text-gray-800">Logout</div>
          </button>
        </div>

        <hr class="my-6" />

        <div class="space-y-6">
          <router-link :to="{ name: 'refer' }" class="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
            <div class="ml-3 text-gray-800">Tell a Friend</div>
          </router-link>

          <router-link :to="{ name: 'feedback' }" class="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            <div class="ml-3 text-gray-800">Help and Feedback</div>
          </router-link>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
import User from "../Apis/User";

export default {
  components: {},
  data() {
    return {
      isLoggedIn: false,
      isOpen: false,
      agent: {},
    };
  },
  created() {
    User.auth().then((response) => {
      this.agent = response.data;
    });
  },
  methods: {
    drawer() {
      this.isOpen = !this.isOpen;
    },
    logout() {
      localStorage.removeItem("token");
      User.logout().then(() => {
        localStorage.removeItem("token");
        this.isLoggedIn = false;
        this.$router.push({ name: "Login" });
      });
    },
  },
};
</script>

<style scoped>
.navbar {
  transition: all 330ms ease-out;
}
.navbar-open {
  transform: translateX(0%);
}
.navbar-close {
  transform: translateX(-100%);
}
.notification {
  transition: all 330ms ease-out;
}
.notification-open {
  transform: translateY(0%);
}
.notification-close {
  transform: translateY(-100%);
}
/* .bg-grad {background-image: linear-gradient(to right, #2b5876 0%, #4e4376  51%, #2b5876  100%)} */
.bg-grad {
  background-image: linear-gradient(to right, #118df3 0%, #a70fc5 100%);
}
.drawer-box {
  border-bottom-right-radius: 3em;
  border-top-right-radius: 3em;
  height: 99.8vh;
}
.navbar {
  border-bottom: 2px solid #f7f7f7;
}
</style>
