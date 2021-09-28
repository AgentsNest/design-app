<template>
  <div class="flex items-center justify-between mb-5 shadow p-3">
    <button class="flex items-center gap-2" @click="$router.go(-1)">
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
      <span>Profile</span>
    </button>
  </div>

  <div class="update-profile px-5">
    <div class="avatar mb-12 flex flex-col gap-2 items-center">
      <div v-if="preview">
        <img :src="preview" class="rounded w-52" />
      </div>
      <img :src="agent.brand_logo" class="rounded w-52" v-else />
      <label
        class="rounded uppercase text-sm text-gray-600 cursor-pointer mt-3"
        for="brandLogo"
      >
        Tap to change Brand Logo
        <input
          type="file"
          id="brandLogo"
          class="hidden"
          accept="image/*"
          @change="previewLogo"
        />
      </label>
      <div class="text-gray-400 text-xs">(Recommend Size: 600 X 200)</div>
    </div>

    <div class="fields mb-4">
      <label class="text-sm text-gray-500">You Name</label>
      <input
        type="text"
        class="w-full bg-gray-100 border rounded-md p-2"
        v-model="agent.name"
      />
    </div>

    <div class="fields mb-4">
      <label class="text-sm text-gray-500">You Email</label>
      <input
        type="text"
        class="w-full bg-gray-100 border rounded-md p-2"
        v-model="agent.email"
      />
    </div>

    <div class="fields mb-4">
      <label class="text-sm text-gray-500">Phone number</label>
      <input
        type="text"
        class="w-full bg-gray-100 border rounded-md p-2"
        v-model="agent.contact"
      />
    </div>

    <div class="fields mb-4">
      <label class="text-sm text-gray-500">Brand Name</label>
      <input
        type="text"
        class="w-full bg-gray-100 border rounded-md p-2"
        v-model="agent.brand_text"
      />
    </div>

    <div class="fields mt-12">
      <button
        class="w-full text-white py-2 rounded-md"
        @click="saveDetails()"
        :class="success == true ? 'bg-green-700' : 'bg-blue-800'"
      >
        {{ submitBtn }}
      </button>
    </div>
  </div>
</template>

<script>
import User from "../../Apis/User";
export default {
  data() {
    return {
      design: {},
      agent: null,
      preview: null,
      submitBtn: "Update",
      success: false,
    };
  },
  methods: {
    saveDetails() {
      User.update(this.agent.id, this.agent).then((response) => {
        this.success = true;
        this.submitBtn = "Profile Updated";
      });
    },
    previewLogo(e) {
      let file = e.target.files[0];

      let reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = (e) => {
        this.preview = e.target.result;
        this.agent.brand_logo = e.target.result;
      };
    },
  },
  created() {
    User.auth().then((response) => {
      this.agent = response.data;
    });
  },
};
</script>

<style></style>
