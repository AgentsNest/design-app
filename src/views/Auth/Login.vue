<template>
  <div class="login p-8">
    <img class="w-3/4 mt-10 mx-auto mb-4" src="../../assets/login.png" />

    <div class="font-medium text-2xl text-center">Login Now</div>
    <div class="text-gray-500 text-center mb-8 mt-2">
      Please enter the details below to continue.
    </div>

    <div class="relative">
      <input
        class="
          w-full
          p-3
          rounded-xl
          focus:outline-none focus:border-indigo-500
          bg-white
          shadow
          border
        "
        :class="{ 'border-red-600': errors.email }"
        type="email"
        placeholder="Enter your email"
        v-model="form.email"
        required
      />
      <div
        class="bg-white absolute right-16 px-2 -top-3 text-xs text-red-400"
        v-if="errors.email"
      >
        {{ errors.email[0] }}
      </div>
    </div>

    <div class="relative">
      <input
        class="
          w-full
          p-3
          rounded-xl
          focus:outline-none focus:border-indigo-500
          bg-white
          shadow
          mt-5
          border
        "
        :class="{ 'border-red-600': errors.password }"
        :type="secure == true ? 'text' : 'password'"
        placeholder="Enter your password"
        name="password"
        v-model="form.password"
        required
      />
      <!-- <div
        class="bg-white absolute right-0 text-xs text-red-400"
        v-if="errors.password"
      >
        {{ errors.password[0] }}
      </div> -->
    </div>

    <div class="flex justify-between text-blue-800 text-xs  mt-5">
      <button class="text-gray-500" @click="secure = !secure">
        Show password
      </button>
      <!-- <div><router-link :to="{name: 'Forgot'}">Forgot Password?</router-link></div> -->
    </div>

    <button
      class="bg-blue-800 text-white rounded-xl w-full py-3 text-sm my-6"
      @click="login"
    >
      LOGIN
    </button>

    <div class="text-center">
      Don't have an account!
      <button @click="() => $router.push('/register')" class="text-blue-800">
        Register
      </button>
    </div>
  </div>
</template>

<script>
import User from "../../Apis/User";

export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
        device_name: "mobile",
      },
      errors: [],
      secure: false,
    };
  },
  methods: {
    login() {
      User.login(this.form)
        .then((response) => {
          localStorage.setItem("token", response.data);
          this.$router.push({ name: "graphics" });
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          console.log(error.response.data.errors);
        });
    },
  },
};
</script>

<style></style>
