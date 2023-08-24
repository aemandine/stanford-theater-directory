<template>
  <main>
    <h1>This is home</h1>
    <Suspense>
    <template #default>
      <TheLogin />
    </template>
    <template #fallback>
      Loading login...
    </template>
    </Suspense>
  </main>
</template>

<script setup lang="ts">
import TheLogin from '@/components/TheLogin.vue'
</script>