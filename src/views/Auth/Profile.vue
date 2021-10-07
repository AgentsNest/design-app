<template>
  <Layout>
    <div class="mt-14">

      <div class="avatar mb-8 flex flex-col gap-2 mt-6 items-center">
        <div v-if="preview">
          <img :src="preview" class="rounded w-52" />
        </div>
        <img :src="agent.brand_logo" class="rounded w-40" v-else/>
        <label
          class="rounded-xl text-xs text-gray-600 cursor-pointer mt-2 border py-2 px-4"
          for="brandLogo"
        >
          Tap to change Brand Logo
          <input type="file" id="brandLogo" class="hidden" accept="image/*" @change="previewLogo"/>
        </label>
        <div class="text-gray-400 text-xs">(Recommend Size: 250 X 120)</div>
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


      <!-- <div class="fields mb-4">
        <label class="text-sm text-gray-500">Company Name / Your Name</label>
        <input
          type="text"
          class="w-full bg-gray-100 border rounded-md p-2"
          v-model="agent.brand_text"
        />
      </div> -->

      <div class="fields mb-4">
        <label class="text-sm text-gray-500">Company / Website / Your Name</label>
        <input
          type="text"
          class="w-full bg-gray-100 border rounded-md p-2"
          v-model="agent.website"
        />
      </div>


      <div class="fields mt-6">
        <button
          class="w-full text-white py-3 rounded-md"
          @click="saveDetails()"
          :class="success == true ? 'bg-gradient-to-r from-blue-700 via-indigo-800 to-indigo-900' : 'bg-gray-700'"
        >
          {{ submitBtn }}
        </button>
      </div>
    </div>

  </Layout>
</template>

<script>
import Layout from "../../Layout/layout.vue";
import User from "../../Apis/User";

export default {
  name: 'Clients',
  components: { Layout },
  data() {
    return {
      design: {},
      agent: {
        email: '',
        contact: '',
        website: '',
        brand_logo: ''
      },
      preview: '',
      submitBtn: "Update",
      success: false,
    };
  },
  methods: {
    saveDetails() {
      User.update(this.agent.id, this.agent).then((response) => {
        this.success = true;
        this.submitBtn = "Profile Updated";
        console.log(response);
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
  beforeMount(){
    User.authForUpdate().then((response) => {
      this.agent = response.data.data;
      console.log(response.data)
    });
  }
};
</script>

<style scoped>
</style>
