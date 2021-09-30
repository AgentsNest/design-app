<template>
  <div class="h-screen w-full">
    <div class="flex items-center justify-between mb-5 p-4">
      <button class="flex items-center gap-2" @click="$router.go(-1)">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
      </button>
      <div class="flex items-center gap-12">
        <div class="flex items-center gap-2">
          <label class="switch">
            <input type="checkbox" @click="toggleFrame" />
            <div class="slider round"></div>
          </label>
          <label for="toggle" class="text-xs text-gray-700">Frame</label>
          <input type="color" v-model="frameColor" class="rounded w-6 h-6" />
        </div>
        <div class="flex items-center gap-2">
          <label class="switch">
            <input type="checkbox" checked @click="toggleLogo" />
            <div class="slider round"></div>
          </label>
          <label for="toggle" class="text-xs text-gray-700">Logo</label>
        </div>
      </div>
    </div>

    <div class="design-preview w-full h-4/5">
      <div class="flex justify-center items-center h-full">
        <div class="canvas-image w-full rounded-xl relative" id="capture">
          <div class="frame w-full h-full absolute p-2" v-if="borderFrame">
            <div
              class="border-2 w-full h-full"
              :style="`border-color:${frameColor}`"
            ></div>
          </div>
          <img :src="design.image" :alt="design.title" class="w-full" />
          <img
            :src="agent.brand_logo"
            class="absolute top-2 left-2 w-32"
            id="logo"
            v-show="!hideLogo"
          />
          <div class="bottom-2 absolute w-full">
            <div
              class="
                w-3/4
                mx-auto
                bg-white
                border-dotted border-gray-500 border
                flex
                justify-between
                items-center
                px-4
                py-1
                bottom-detail
              "
            >
              <div
                class="text-gray-800 flex items-center gap-1"
                v-if="agent.email"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3 w-3"
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
                {{ agent.email }}
              </div>
              <div
                class="text-gray-800 flex items-center gap-1"
                v-if="agent.website"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
                www.happybuying.com
              </div>
              <div
                class="text-gray-800 flex items-center gap-1"
                v-if="agent.contact"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                {{ agent.contact }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="fixed bottom-5 left-0 right-0 flex justify-center">
        <button
          class="
            text-white
            py-4
            px-7
            rounded-full
            focus:outline-none
            shadow-md
            center
            text-xs
            uppercase
            flex
            gap-2
            items-center
          "
          :class="
            success
              ? 'bg-gradient-to-r from-blue-700 via-indigo-800 to-indigo-900'
              : 'text-gray-500'
          "
          id="save"
          @click="saveCanvas()"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
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
          <span>{{ downloadBtn }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Graphic from "../../Apis/Graphic";
import User from "../../Apis/User";
import html2canvas from "html2canvas";
import { Filesystem, Directory } from "@capacitor/filesystem";

export default {
  data() {
    return {
      design: {},
      agent: {},
      downloadBtn: "DOWNLOAD",
      success: false,
      hideLogo: false,
      borderFrame: false,
      frameColor: "",
    };
  },
  created() {
    User.auth().then((response) => {
      this.agent = response.data;
    });
  },
  methods: {
    async fetchData() {
      var design = this.$route.params.id;
      Graphic.details(design).then((response) => {
        this.design = response.data;
      });
    },
    saveCanvas() {
      html2canvas(document.getElementById("capture"), {
        // allowTaint: true,
        // useCORS: false,
        // foreignObjectRendering: true,
        // proxy: "https://agentsnest.com",
        scale: 3,
      }).then(function (canvas) {
        var image = canvas.toDataURL("image/jpeg");
        let date = new Date(),
          time = date.getTime(),
          fileName = time + ".jpeg";

        // Filesystem.writeFile({
        //   path: "Agentsnest/" + fileName,
        //   data: image,
        //   directory: Directory.Documents,
        //   recursive: true,
        // })
        Filesystem.writeFile({
          path: "Agentsnest/" + fileName,
          data: image,
          directory: Directory.ExternalStorage,
          recursive: true,
        })
          .then((info) => console.log("Stat Info: ", info))
          .catch((e) => console.log("Error occurred while doing stat: ", e));
      });
      this.countDown();
      this.success = true;
      this.downloadBtn = "DESIGN SAVED!";
    },
    downloadCanvas() {
      var canvas = document.getElementById("canvas");
      var image = canvas.toDataURL("image/jpeg");

      let a = document.createElement("a");
      a.href = canvas.toDataURL("image/png", 1.0);
      a.download = "graphic.png";
      a.click();
      a.remove();

      Filesystem.writeFile({
        path: "Agentsnest/sample.jpeg",
        data: image,
        directory: Directory.Documents,
        recursive: true,
      });
    },
    loadImg() {
      var canvas = document.getElementById("canvas");
      var ctx = canvas.getContext("2d");

      var img = new Image();
      img.src = this.design.thumb;
      ctx.canvas.width = img.width;
      ctx.canvas.height = img.height;
      ctx.canvas.position = "relative";

      var logo = document.getElementById("logo");
      var img2 = new Image();
      img2.src = logo.src;
      console.log(logo.style.width);

      var brandText = "BlackByt solutions";

      img.onload = function () {
        ctx.drawImage(img, 20, 20);
        ctx.drawImage(img2, 0, img.height, 250, 80);
      };
    },
    countDown() {
      var design = this.$route.params.id;
      Graphic.downloadCount(design).then((response) => {
        // console.log(response);
      });
    },
    toggleLogo() {
      this.hideLogo = !this.hideLogo;
      this.$emit("setCheckboxVal", this.hideLogo);
    },
    toggleFrame() {
      this.borderFrame = !this.borderFrame;
      this.$emit("setCheckboxVal", this.borderFrame);
    },
  },
  watch: {
    frameColor(newValue) {
      this.frameColor = newValue;
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 32px;
  height: 20px;
}

.switch input {
  display: none;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(238, 238, 238);
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #15c288a8;
}

input:focus + .slider {
  box-shadow: 0 0 1px #03bb50;
}

input:checked + .slider:before {
  -webkit-transform: translateX(12px);
  -ms-transform: translateX(12px);
  transform: translateX(12px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
.bottom-detail {
  font-size: 8px;
  font-weight: 600;
}
</style>
