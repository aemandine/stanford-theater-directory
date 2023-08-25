<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import loginMethods from './helpers/login-methods'
</script>

<template>
  <header>
    <h1>Campus Unofficial Theater Directory</h1>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/roles">Browse Roles</RouterLink>
      <RouterLink to="/directory" v-if="loginMethods.methods.isLoggedIn()">Browse Directory</RouterLink>
      <RouterLink to="/profile" v-if="loginMethods.methods.isLoggedIn()">My Profile</RouterLink>
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
  color: var(--vt-c-white-mute);
  background-color: rgb(140, 21, 21);
}

h1 {
  text-align: left;
  flex-grow: 2;
  font-weight: bold;
  line-height: 1;
}

nav {
  font-size: 14px;
  text-align: center;
}

nav a.router-link-exact-active {
  color: var(--vt-c-white-mute);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--vt-c-red-light);
}

nav a:first-of-type {
  border: 0;
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
  nav {
    flex-shrink: 0;
  }
}
</style>
