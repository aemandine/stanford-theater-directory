<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import LogoPanel from '@/components/TheLogoPanel.vue'
document.cookie = "userId=0f1a255c-31e9-48c7-9b9e-f713718f085f" // Remove later
</script>

<template>
  <header>
    <LogoPanel />
    <h1>Cross-Organizational Theater Directory</h1>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/roles">Browse Roles</RouterLink>
      <RouterLink to="/directory">Browse Directory</RouterLink>
      <RouterLink to="/profile">My Profile</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-content: space-between;
  align-items: center;
  text-align: center;
  padding: 12px 20px;
  background-color: var(--color-background-mute);
}

h1 {
  text-align: left;
  flex-grow: 2;
  margin: 0px 20px;
  font-weight: bold;
  line-height: 1;
}

nav {
  font-size: 14px;
  text-align: center;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (max-width: 800px) {
  header {
    height: auto;
    width: 100%;
    background-color: var(--color-background-mute);

    display: flex;
    flex-direction: column;
    align-items: center;
  }
  h1 {
    text-align: center;
    font-size: 20pt;
    margin: 5px;
  }
  nav {
    flex-shrink: 0;
  }
}
</style>
