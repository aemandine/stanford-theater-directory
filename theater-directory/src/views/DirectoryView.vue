<script lang="ts">
import Directory from "@/components/Directory.vue"
import loginMethods from "@/helpers/login-methods"
export default {
  setup() {
    return {
      loggedIn: loginMethods.methods.isLoggedIn(),
      userId: loginMethods.methods.getUserId()
    }
  },
  components: {
    Directory
  }
}
</script>

<template>
  <main>
    <h1>Directory</h1>
    <Suspense v-if="loggedIn">
      <template #default>
        <Directory />
      </template>
      <template #fallback>
        <p>Loading directory...</p>
      </template>
    </Suspense>
  </main>
</template>

<style scoped>
h1 {
  margin-bottom: 15px;
}
</style>