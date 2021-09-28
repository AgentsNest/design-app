<template>
  <div class="w-full bg-white rounded-md">
    <h2
      class="
        text-center
        mt-8
        text-2xl text-blue-800
        font-display font-semibold
        lg:text-left
        xl:text-3xl xl:text-bold
      "
    >
      Create new Account
    </h2>
    <div class="mt-8 px-12">
      <div>
        <div class="text-sm font-bold text-gray-700 tracking-wide">Name</div>
        <input
          class="
            w-full
            text-md
            py-2
            border-b border-gray-300
            focus:outline-none focus:border-indigo-500
          "
          type="text"
          placeholder="Your name"
          name="name"
          v-model="form.name"
        />
        <div class="mt-2 text-xs text-red-400" v-if="errors.name">
          {{ errors.name[0] }}
        </div>
      </div>
      <div class="mt-8">
        <div class="text-sm font-bold text-gray-700 tracking-wide">
          Email Address
        </div>
        <input
          class="
            w-full
            text-md
            py-2
            border-b border-gray-300
            focus:outline-none focus:border-indigo-500
          "
          type="email"
          placeholder="abc@mail.com"
          name="email"
          v-model="form.email"
        />
        <div class="mt-2 text-xs text-red-400" v-if="errors.email">
          {{ errors.email[0] }}
        </div>
      </div>
      <div class="mt-8">
        <div class="text-sm font-bold text-gray-700 tracking-wide">
          Password
        </div>
        <input
          class="
            w-full
            text-md
            py-2
            border-b border-gray-300
            focus:outline-none focus:border-indigo-500
          "
          type="password"
          placeholder="Enter your password"
          name="password"
          v-model="form.password"
        />
        <div class="mt-2 text-xs text-red-400" v-if="errors.password">
          {{ errors.password[0] }}
        </div>
      </div>
      <div class="mt-8">
        <div class="text-sm font-bold text-gray-700 tracking-wide">
          Confirm Password
        </div>
        <input
          class="
            w-full
            text-md
            py-2
            border-b border-gray-300
            focus:outline-none focus:border-indigo-500
          "
          type="password"
          placeholder="Confirm your password"
          name="confirm_password"
          v-model="form.confirm_password"
        />
        <div class="mt-2 text-xs text-red-400" v-if="errors.confirm_password">
          {{ errors.confirm_password[0] }}
        </div>
      </div>
      <div class="mt-8">
        <div class="text-sm font-bold text-gray-700 tracking-wide">RERA</div>
        <div class="flex border-b border-gray-300 items-center">
          <input
            class="
              w-full
              text-md
              py-2
              focus:outline-none focus:border-indigo-500
            "
            type="text"
            placeholder="RERA Number"
            name="rera"
            v-model="form.rera"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-green-800"
            viewBox="0 0 20 20"
            fill="currentColor"
            v-if="verfied"
          >
            <path
              fill-rule="evenodd"
              d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="mt-2 text-xs text-red-400" v-if="errors.confirm_password">
          {{ errors.confirm_password[0] }}
        </div>
      </div>
      <div class="mt-10">
        <button
          class="
            bg-blue-800
            text-gray-100
            p-4
            w-full
            rounded-full
            tracking-wide
            font-semibold font-display
            focus:outline-none focus:shadow-outline
            hover:bg-indigo-600
            shadow-lg
          "
          @click.prevent="register"
        >
          Create Account
        </button>
      </div>
      <div
        class="
          mt-12
          text-sm
          font-display font-semibold
          text-gray-700 text-center
        "
      >
        Already have account ?
        <router-link
          :to="{ name: 'Login' }"
          class="cursor-pointer text-blue-600 hover:text-blue-800"
          >Login</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import User from "../../Apis/User";

export default {
  name: "Login",
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
        confirm_password: "",
        rera: "",
      },
      errors: [],
      verified: false,
    };
  },
  methods: {
    register() {
      User.register(this.form)
        .then(() => {
          this.$router.push({ name: "Login" });
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
  computed: {},
};
</script>

<style></style>
