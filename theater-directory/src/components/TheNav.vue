<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/roles">Browse Roles</RouterLink>
    <RouterLink to="/directory" v-if="loggedIn">Browse Directory</RouterLink>
    <RouterLink to="/profile/" v-if="loggedIn">My Profile</RouterLink>
  </nav>
</template>

<script lang="ts">
import { isLoggedIn } from '@/helpers/api'
export default {
  async setup() {
    const loggedIn = await isLoggedIn()
    return {
      loggedIn
    }
  }
}
</script>