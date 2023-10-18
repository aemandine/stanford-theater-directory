<script setup lang="ts">
import OpportunityList from "@/components/OpportunityList.vue"
</script>

<template>
  <main>
    <Suspense>
      <template #default>
        <OpportunityList />
      </template>
      <template #fallback>
        <p>Loading opportunities...</p>
      </template>
    </Suspense>
  </main>
</template>