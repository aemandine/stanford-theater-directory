<script lang="ts">
import Directory from "@/components/Directory.vue"
import loginMethods from "@/helpers/login-methods"
export default {
  setup() {
    return {
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
    <Suspense v-if="userId !== null">
      <template #default>
        <Directory :userId="userId" />
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