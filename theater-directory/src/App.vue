<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import TheNav from '@/components/TheNav.vue'
</script>

<template>
  <div class="page">
    <header>
      <h1><RouterLink to="/" class="h1">Campus Unofficial Arts Directory</RouterLink></h1>
      <Suspense>
        <template #default>
          <TheNav />
        </template>
        <template #fallback>
          <nav>
            <RouterLink to="/">Home</RouterLink>
          </nav>
        </template>
      </Suspense>
    </header>

    <RouterView :key="$route.fullPath" />

    <footer>
      Cross-organizational arts directory from AATP x Theater Lab, created by Anna Mistele
    </footer>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
footer {
  background-color: var(--color-background-mute);
  text-align: center;
  padding: 5px;
  margin-top: auto;
}
a {
  color: var(--vt-c-red-light);
}
header {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-content: space-between;
  align-items: center;
  text-align: center;
  padding: 12px 20px;
  color: var(--vt-c-white-mute);
  background-color: rgb(140, 21, 21);
}
a.h1 {
  font-weight: bold;
  color: var(--vt-c-white-mute);
}
h1 {
  text-align: left;
  flex-grow: 2;
  font-weight: bold;
  line-height: 1;
}

@media (max-width: 800px) {
  header {
    height: auto;
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
  }
  h1 {
    text-align: center;
    font-size: 20pt;
    margin: 5px;
  }
}
</style>
