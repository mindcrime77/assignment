<template>
  <header>
    <i class="material-icons" style="font-size: 36px" @click="router.push('/')"
      >home</i
    >
    <h1>The assignment</h1>
  </header>
  <router-view></router-view>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  name: "App",

  setup() {
    const router = useRouter();
    return {
      router,
    };
  },
};
</script>

<style>
body {
  margin: 0;
}
* {
  font-family: Verdana, sans-serif;
}
header {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  padding: 15px;
  width: 100%;
  margin-bottom: 2em;
  text-align: center;
  position: relative;
  background: rgb(196, 193, 244);
  background: linear-gradient(
    90deg,
    rgba(196, 193, 244, 1) 1%,
    rgba(131, 131, 246, 1) 27%,
    rgba(226, 250, 255, 1) 71%
  );
}
header i {
  position: absolute;
  left: 0;
  top: 29%;
  padding: 5px;
}
header i:hover {
  cursor: pointer;
}
</style>
