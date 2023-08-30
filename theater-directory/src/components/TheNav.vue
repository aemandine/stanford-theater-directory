<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/directory" v-if="loggedIn">Directory</RouterLink>
    <RouterLink to="/opportunities" v-if="loggedIn">Opportunities</RouterLink>
    <RouterLink to="/roles">Browse Roles</RouterLink>
    <RouterLink to="/profile" v-if="loggedIn">My Profile</RouterLink>
    <a @click="logout" v-if="loggedIn" class="login-button">Log Out</a>
  </nav>
</template>

<style scoped>
a {
  cursor: pointer;
}

.login-button {
  background-color: white;
  padding: 3px 1rem;
  margin-left: 0.5rem;
  border: 0;
  border-radius: 10px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.488)
}
.login-button:hover {
  background-color: #b5b5b5;
}
</style>

<script lang="ts">
// Imports
import { getUserId } from "@/helpers/auth"
import router from "@/router"

// Functions
const logout = async() => {
  const logout = await fetch("/api/auth/logout")
  if (logout.status !== 200) {
    console.log("Could not log you out.")
  }
  router.push("/")
  location.reload()
}

export default {
  async setup() {
    const loggedIn = (await getUserId()) !== null
    return {
      loggedIn,
      logout
    }
  }
}
</script>