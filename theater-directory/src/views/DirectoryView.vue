<script setup lang="ts">
import Directory from "@/components/Directory.vue"
</script>

<template>
  <main>
    <Suspense>
      <template #default>
        <Directory />
      </template>
      <template #fallback>
        <p>Loading directory...</p>
      </template>
    </Suspense>
  </main>
</template>