<script setup lang="ts">
import OpportunityNew from "@/components/OpportunityNew.vue"
</script>

<template>
  <main>
    <Suspense>
      <template #default>
        <OpportunityNew />
      </template>
      <template #fallback>
        <p>Loading opportunity creator...</p>
      </template>
    </Suspense>
  </main>
</template>