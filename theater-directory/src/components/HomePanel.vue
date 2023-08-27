<template>
  <div class="home-panel">
    <h2>Welcome to the unofficial theater directory!</h2>
    <Suspense v-if="!loggedIn">
      <template #default>
        <TheLogin />
      </template>
      <template #fallback>
        Loading login...
      </template>
    </Suspense>
    <HomeInfo />
    <h2 v-if="!loggedIn">To access the directory and create a profile for yourself, log in above!</h2>
    <Suspense v-if="loggedIn">
      <template #default>
        <HomeFeedback />
      </template>
      <template #fallback>
        Loading feedback...
      </template>
    </Suspense>
  </div>
</template>

<style scoped>
h2, h3 {
  text-align: center;
}
h2 {
  margin-top: 0px;
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
import { isLoggedIn } from '@/helpers/api'
import TheLogin from '@/components/TheLogin.vue'
import HomeInfo from '@/components/HomeInfo.vue'
import HomeFeedback from '@/components/HomeFeedback.vue'

export default {
  components: {
    TheLogin, HomeInfo, HomeFeedback
  },
  async setup() {
    const loggedIn = await isLoggedIn()
    return {
      loggedIn
    }
  }
}
</script>