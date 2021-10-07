<template>
  <div class="h-full w-full">
    <div class="w-full">
      <div class="flex justify-between w-full p-4">
        <button @click="$router.go(-1)" class="shadow p-2 rounded-md">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
          </svg>
        </button>
        <button class="flex gap-1 items-center shadow py-2 px-3 rounded-md text-gray-600" @click="customize = !customize">
          <span>Customize</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
      </div>

      <transition name="fade">
        <div class="flex items-center justify-between shadow w-full px-4" v-if="customize">
          <div class="flex items-center gap-2">
            <label for="toggle" class="text-xs text-gray-700">Icons</label>
            <label class="switch">
              <input type="checkbox" @click="toggleIcons" />
              <div class="slider round"></div>
            </label>
          </div>
          <div class="divider"></div>
          <div class="flex items-center gap-2">
            <div class="flex items-center gap-3">
              <label for="toggle" class="text-xs text-gray-700">Frame</label>
              <input type="color" v-model="frameColor" class="w-5 h-5 border" />
            </div>
            <label class="switch">
              <input type="checkbox" @click="toggleFrame" />
              <div class="slider round"></div>
            </label>
          </div>
          <div class="divider"></div>
          <div class="flex items-center gap-2">
            <label for="toggle" class="text-xs text-gray-700">Logo</label>
            <label class="switch">
              <input type="checkbox" checked @click="toggleLogo" />
              <div class="slider round"></div>
            </label>
            <button class="border rounded p-1 relative" @click="logoControl = !logoControl ">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </button>
          </div>
          <div class="absolute top-28 right-0 left-0 bg-white px-4 py-2 rounded-md shadow" v-if="logoControl">
            <div class="flex justify-between items-center">
              <div class="flex items-center">
                <div class="text-xs text-gray-700 mr-3">Alignment</div>
                <button class="border rounded-l-full py-1 px-3 flex items-center gap-1" @click="logoLeftAlign" :class="leftAligned ? 'text-gray-900' : 'text-gray-300' ">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                </button>
                <button class="border rounded-r-full py-1 px-3 flex items-center gap-1" @click="logoRightAlign" :class="rightAligned ? 'text-gray-900' : 'text-gray-300' ">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                </button>
              </div>
              <div class="flex items-center">
                <div class="text-xs text-gray-500 mr-3">Logo Size</div>
                <select v-model="logoSize" class="shadow text-gray-700 rounded-md focus:outline-none p-1">
                  <option value="w-8">1</option>
                  <option value="w-12">2</option>
                  <option value="w-16">3</option>
                  <option value="w-20">4</option>
                  <option value="w-24">5</option>
                  <option value="w-28">6</option>
                </select>            
              </div>
            </div>

          </div>

        </div>
      </transition>

    </div>
    

    <div class="design-preview w-full h-4/5 mt-20">
      <div class="flex justify-center items-center h-full">
        <div class="canvas-image w-full rounded-xl relative" id="capture">
          <div class="frame w-full h-full absolute p-2" v-if="borderFrame">
            <div
              class="border-2 w-full h-full"
              :style="`border-color:${frameColor}`"
            ></div>
          </div>
          <!-- <div class="absolute" v-if="agent.brand_text" :class="design.brand_text">{{ agent.brand_text }}</div> -->
          <img :src="design.image" :alt="design.title" class="w-full h-full" />
          <img
            :src="agent.brand_logo"
            id="logo"
            class="absolute top-4"
            :class="lgoAlignClass, logoSize"
            v-show="!hideLogo"
          />

          <div class="bottom-2 absolute w-full" v-if="detailToggle">
            <div class="w-5/6 mx-auto bg-white border-dotted border-gray-300 border rounded flex justify-between px-2">
              <div class="flex items-center text-gray-700" v-if="agent.email">
                <button class="bg-gray-700 rounded-full text-white icon-btn" v-if="iconToggle">
                  <svg xmlns="http://www.w3.org/2000/svg" class="svg-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/>
                  </svg>
                </button>
                <div class="bottom-detail">{{ agent.email }}</div>
              </div>
              <div class="flex items-center text-gray-700" v-if="agent.website" >
                <button class="bg-gray-700 rounded-full text-white icon-btn" v-if="iconToggle">
                  <svg xmlns="http://www.w3.org/2000/svg" class="svg-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                  </svg>
                </button>
                <div class="bottom-detail">{{ agent.website }}</div>
              </div>
              <div class="flex items-center text-gray-700" v-if="agent.contact">
                <button class="bg-gray-700 rounded-full text-white icon-btn" v-if="iconToggle">
                  <svg xmlns="http://www.w3.org/2000/svg" class="svg-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </button>
                <div class="bottom-detail">{{ agent.contact }}</div>
              </div>
            </div>
          </div>
          <div class="bottom-2 absolute w-full" v-else>
            <div class="w-5/6 mx-auto bg-white border-dotted border-gray-300 border rounded flex justify-between px-2 py-1">
              <div class="flex items-center gap-1 text-gray-700" v-if="agent.email">
                <button class="bg-gray-700 rounded-full text-white icon-btn" v-if="iconToggle">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-2 w-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/>
                  </svg>
                </button>
                <div class="bottom-detail -mt-3">{{ agent.email }}</div>
              </div>
              <div class="flex items-center gap-1 text-gray-700" v-if="agent.website">
                <button class="bg-gray-700 rounded-full text-white icon-btn" v-if="iconToggle">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-2 w-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                  </svg>
                </button>
                <div class="bottom-detail -mt-3">{{ agent.website }}</div>
              </div>
              <div class="flex items-center gap-1 text-gray-700" v-if="agent.contact">
                <button class="bg-gray-700 rounded-full text-white icon-btn" v-if="iconToggle">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-2 w-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </button>
                <div class="bottom-detail -mt-3">{{ agent.contact }}</div>
              </div>
            </div>
          </div>

        </div>

        <div v-if="downloadProgress" class="bg-gray-900 z-20 p-4 fixed w-full bottom-0 top-0">
          <div class="relative h-full">
            <div class="absolute top-1/3 w-full text-center logoText text-white">Creating your design...</div>
            <div class="loader">
              <div class="dot"></div>
              <div class="dot"></div>
              <div class="dot"></div>
              <div class="dot"></div>
              <div class="dot"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="fixed bottom-10 left-0 right-0 flex justify-center">
        <button class="text-white py-4 px-7 rounded-full focus:outline-none shadow-md center text-xs uppercase flex gap-2 items-center"
          :class="
            success
              ? 'bg-gradient-to-r from-blue-700 via-indigo-800 to-indigo-900'
              : 'text-gray-500'
          "
          id="save"
          @click="multiple()"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
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
      design: '',
      agent: {},
      downloadBtn: "DOWNLOAD",
      customize: false,
      success: false,
      hideLogo: false,
      borderFrame: false,
      iconToggle: false,
      frameColor: "#ffffff",
      leftAligned: true,
      rightAligned: false,
      lgoAlignClass : 'left-5',
      logoControl: false,
      logoSize: 'w-12',
      detailToggle: true,
      downloadProgress: false
    };
  },
  created() {
    User.auth().then((response) => {
      this.agent = response.data.data;
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

        Filesystem.writeFile({
          path: fileName,
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
      this.detailToggle = true;
      this.downloadProgress = false;

      setTimeout(this.downloadBtnBackState,500);

      // Filesystem.writeFile({
      //     path: "Agentsnest/" + fileName,
      //     data: image,
      //     directory: Directory.ExternalStorage,
      //     recursive: true,
      //   })
    },
    downloadBtnBackState(){
      this.success = false;
      this.downloadBtn = "DOWNLOAD";
    },
    multiple(){
      this.downloadProgress = true;
      this.detailToggle = false;
      setTimeout(this.saveCanvas, 1800);
    },
    downloadCanvas() {
      html2canvas(document.getElementById("capture"))
      .then(function (canvas) {
        var image = canvas.toDataURL("image/jpeg");

        let a = document.createElement("a");
        a.href = canvas.toDataURL("image/png", 1.0);
        a.download = "graphic.png";
        a.click();
        a.remove();
      });
      this.detailToggle = true;
      this.downloadProgress = false;
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
    toggleIcons() {
      this.iconToggle = !this.iconToggle;
      this.$emit("setCheckboxVal", this.iconToggle);
    },
    logoLeftAlign(){
      this.leftAligned = true;
      this.rightAligned = false;
      this.lgoAlignClass = 'left-5'
    },
    logoRightAlign(){
      this.leftAligned = false;
      this.rightAligned = true;
      this.lgoAlignClass = 'right-5'
    }
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
.icon-btn{
  padding: 2px;
  margin-right: 3px;
}
.svg-icon{
  width: 5px;
  height: 5px;

}
.divider{
  width: 2px;
  height: 40px;
  background: #f3f3f3;
}
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
  background-color: #555;
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
  font-size: 7px;
  font-weight: 600;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

/*Loader*/
.logoText{
  font-size: 1.5em;
}
.loader {
  position: absolute;
  top: 50%;
  left: 40%;
  margin-left: 10%;
  transform: translate3d(-50%, -50%, 0);
}
.dot {
  width: 24px;
  height: 24px;
  background: #3ac;
  border-radius: 100%;
  display: inline-block;
  animation: slide 1s infinite;
}
.dot:nth-child(1) {
  animation-delay: 0.1s;
  background: #32aacc;
}
.dot:nth-child(2) {
  animation-delay: 0.2s;
  background: #64aacc;
}
.dot:nth-child(3) {
  animation-delay: 0.3s;
  background: #96aacc;
}
.dot:nth-child(4) {
  animation-delay: 0.4s;
  background: #c8aacc;
}
.dot:nth-child(5) {
  animation-delay: 0.5s;
  background: #faaacc;
}
@-moz-keyframes slide {
  0% {
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(2);
  }
  100% {
    transform: scale(1);
  }
}
@-webkit-keyframes slide {
  0% {
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(2);
  }
  100% {
    transform: scale(1);
  }
}
@-o-keyframes slide {
  0% {
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(2);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes slide {
  0% {
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(2);
  }
  100% {
    transform: scale(1);
  }
}

</style>
