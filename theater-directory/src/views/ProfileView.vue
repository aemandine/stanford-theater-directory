<script lang="ts">
import Profile from "@/components/Profile.vue"
import loginMethods from "@/helpers/login-methods"
export default {
  setup() {
    return {
      userId: loginMethods.methods.getUserId()
    }
  },
  components: {
    Profile
  }
}
</script>

<template>
  <main>
    <h1>Profile</h1>
    <Suspense v-if="userId !== null">
      <template #default>
        <Profile :userId="userId" />
      </template>
      <template #fallback>
        <p>Loading profile...</p>
      </template>
    </Suspense>
  </main>
</template>

<style scoped>
h1 {
  margin-bottom: 15px;
}
</style>