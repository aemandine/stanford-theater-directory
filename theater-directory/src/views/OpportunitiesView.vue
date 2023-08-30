<script setup lang="ts">
import OpportunitiesList from "@/components/OpportunitiesList.vue"
</script>

<template>
  <main>
    <Suspense>
      <template #default>
        <OpportunitiesList />
      </template>
      <template #fallback>
        <p>Loading opportunities...</p>
      </template>
    </Suspense>
  </main>
</template>