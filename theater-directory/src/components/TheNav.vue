<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/roles">Browse Roles</RouterLink>
    <RouterLink to="/directory" v-if="loggedIn">Browse Directory</RouterLink>
    <RouterLink to="/profile" v-if="loggedIn">My Profile</RouterLink>
    <a @click="logout" v-if="loggedIn">Log Out</a>
  </nav>
</template>

<style scoped>
a {
  cursor: pointer;
}
</style>

<script lang="ts">
import { isLoggedIn } from '@/helpers/api'
import router from '@/router'
const logout = async() => {
  const logout = await fetch("/api/auth/logout")
  if (logout.status !== 200) {
    console.log("Could not log you out.")
  }
  router.push("/")
}
export default {
  async setup() {
    const loggedIn = await isLoggedIn()
    return {
      loggedIn,
      logout
    }
  }
}
</script>