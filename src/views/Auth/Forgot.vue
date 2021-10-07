<template>
  <div class="login p-8">
    <img class="w-4/5 mt-10 mx-auto mb-10" src="../../assets/forgot.svg" />

    <div class="font-medium text-2xl text-center">Forgot Password</div>
    <div class="text-gray-500 text-center mb-8 mt-2">
      Please enter email to get password
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

    <button
      class="bg-blue-800 text-white rounded-xl w-full py-3 text-sm my-6"
      @click="getPasswordLink"
    >
      Reset Password
    </button>

    <div class="text-center">
      Navigate to
      <button @click="() => $router.push('/login')" class="text-blue-800">
        Login
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
        email: ""
      },
      errors: [],
      secure: false,
    };
  },
  methods: {
    getPasswordLink() {
      User.forgot(this.form)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style></style>
