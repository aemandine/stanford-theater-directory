<template>
  <Suspense>
      <template #default>
        <TheLogout />
      </template>
      <template #fallback>
        Logging you out...
      </template>
  </Suspense>
</template>

<script setup lang="ts">
import TheLogout from '@/components/TheLogout.vue'
</script>