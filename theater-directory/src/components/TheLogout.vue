<template>
</template>

<script lang="ts">
import router from '@/router';

  export default {
    async setup() {
      const logout = await fetch("/api/auth/logout")
      if (logout.status !== 200) {
        console.log("Could not log you out.")
      }
      router.push("/")
    }
  }
</script>