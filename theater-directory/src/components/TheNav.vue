<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/roles">Browse Roles</RouterLink>
    <RouterLink to="/directory" v-if="loggedIn">Browse Directory</RouterLink>
    <RouterLink to="/profile" v-if="loggedIn">My Profile</RouterLink>
  </nav>
</template>

<script lang="ts">

export default {
  async setup() {
    var loggedIn = false
    const verifyResponse = await fetch("/api/auth/verify")
    if (verifyResponse.status === 200) {
      loggedIn = true
    }
    return {
      loggedIn
    }
  }
}
</script>