<script setup lang="ts">
import Profile from "../components/Profile.vue"
</script>

<template>
  <main>
    <h1>Profile</h1>
    <Suspense>
      <template #default>
        <Profile userId="0f1a255c-31e9-48c7-9b9e-f713718f085f" />
      </template>
      <template #fallback>
        <p>Loading profile...</p>
      </template>
    </Suspense>
  </main>
</template>