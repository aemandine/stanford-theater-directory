<template>
  <main>
    <div class="home">
      <Suspense>
        <template #default>
          <HomePanel />
        </template>
        <template #fallback>
          Loading info...
        </template>
      </Suspense>
      <iframe src="https://calendar.google.com/calendar/embed?src=1b8d89b4f204f19c4a8478e67ee9987f5cda36d3c6e00aec16854de52c8c94f5%40group.calendar.google.com&ctz=America%2FPalo_Alto" style="border: 0" width="700" height="480" frameborder="0" scrolling="yes"></iframe>
    </div>
  </main>
</template>

<style scoped>
.home {
  margin: 30px 20px;
  font-weight: bold;
  color: var(--color-text);

  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 50px;
}
h2 {
  margin-top: 0px;
  text-align: center;
}
@media (max-width: 800px) {
  .home {
    margin: 20px auto;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
  iframe {
    display: none;
  }
}
</style>

<script setup lang="ts">
import HomePanel from '@/components/HomePanel.vue'
</script>