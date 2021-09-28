<template>
  <div class="bg-gray-900 h-screen w-full flex justify-center items-center">
    <div class="text-white text-6xl font-bold flex items-end">
      <div>agnt</div>
      <div class="w-6">
        <div class="sonar-wrapper py-2">
          <div class="sonar-emitter"><div class="sonar-wave"></div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: false,
    };
  },
  methods: {
    redirect() {
      if ((this.isLoggedIn = !!localStorage.getItem("token"))) {
        this.$router.push({ name: "graphics" });
      } else {
        this.$router.push({ name: "Login" });
      }
    },
  },
  mounted() {
    setTimeout(
      function () {
        this.redirect();
      }.bind(this),
      2000
    );
  },
};
</script>

<style scoped>
.hero {
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
}
.jump {
  position: relative;
  animation: jump 1.75s infinite;
  animation-delay: 0.2s;
}
@keyframes jump {
  0% {
    top: 0;
  }
  50% {
    top: -16px;
  }
  100% {
    top: 0;
  }
}

.sonar-wrapper {
  position: relative;
  z-index: 0;
  overflow: hidden;
  /* padding: 8rem 0; */
}

.sonar-emitter {
  position: relative;
  margin: 0 auto;
  width: 10px;
  height: 10px;
  border-radius: 9999px;
  background-image: linear-gradient(-20deg, #b721ff 0%, #21d4fd 100%);
}

.sonar-wave {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 9999px;
  background-image: linear-gradient(-20deg, #b721ff 0%, #21d4fd 100%);
  opacity: 0;
  z-index: -1;
  pointer-events: none;
}
.sonar-wave {
  animation: sonarWave 2s linear infinite;
}

@keyframes sonarWave {
  from {
    opacity: 0.4;
  }
  to {
    transform: scale(3);
    opacity: 0;
  }
}
</style>
