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

    <div class="flex flex-col items-center px-5 mt-12">
      <img src="../../assets/feedback.svg" class="h-72" />
      <div class="text-xl font-bold mt-6">Feedback</div>
      <div class="text-xs text-gray-500 mt-2 text-center px-10">
        We want to know what you thought of your experience at agentsnest. So
        we'd love to hear your feedback.
      </div>
    </div>

    <div class="link mt-8 px-10">
      <textarea
        class="bg-gray-100 rounded-l-lg py-2 px-4 text-sm w-full"
        placeholder="Your feedback"
        rows="5"
        v-model="message"
      ></textarea>
      <button
        class="text-white rounded px-4 py-2 mt-4 text-sm w-full"
        :class="
            success
              ? 'bg-gradient-to-r from-blue-700 via-indigo-800 to-indigo-900'
              : 'bg-gray-500'
          "
        @click="SendFeedback"
      >
        {{btnText}}
      </button>
    </div>
  </div>
</template>

<script>
import Pages from '../../Apis/Pages'
export default {
  data(){
    return{
      message: '',
      btnText: 'Send',
      success: false
    }
  },
  methods:{
    SendFeedback(){
      let data = new FormData();
      data.append('message', this.message)

      Pages.new(data).then((response) => {
        console.log(response);
        this.success = true
        this.btnText = 'Sent Successfully!'
      })
    }
  }
};
</script>

<style></style>
