<template>
  <div class="home-panel">
    <h2>Welcome to the Campus Arts Directory!</h2>
    <TheLogin v-if="!loggedIn" />
    <HomeInfo />
    <h2 v-if="!loggedIn">To access the directory and create a profile for yourself, log in above!</h2>
    <HomeNav v-if="loggedIn" />
  </div>
</template>

<style scoped>
h2, h3 {
  text-align: center;
}
h2 {
  color: var(--vt-c-purple-light);
}
.home-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  max-width: 475px;
}
</style>

<script lang="ts">
import TheLogin from "@/components/TheLogin.vue"
import HomeInfo from "@/components/HomeInfo.vue"
import HomeNav from "@/components/HomeNav.vue"
import { getUserId } from "@/helpers/auth"

export default {
  components: {
    TheLogin, HomeInfo, HomeNav
  },
  async setup() {
    const loggedIn = (await getUserId()) !== null
    return {
      loggedIn
    }
  }
}
</script>