<template>
  <div v-if="loggedIn">
    <!-- Editing my own profile -->
    <Suspense v-if="edit">
      <template #default>
        <ProfileEdit :userId="$props.profileUserId" />
      </template>
      <template #fallback>
        <p>Loading your profile...</p>
      </template>
    </Suspense>

    <!-- Viewing someone else's profile -->
    <Suspense v-else>
      <template #default>
        <ProfileView :userId="$props.profileUserId" />
      </template>
      <template #fallback>
        <p>Loading profile...</p>
      </template>
    </Suspense>
  </div>
</template>

<script lang="ts">
// Imports
import ProfileEdit from "@/components/ProfileEdit.vue"
import ProfileView from "@/components/ProfileView.vue"
import router from "@/router"

export default {
  props: {
    profileUserId: String
  },
  components: {
    ProfileEdit, ProfileView
  },
  async setup(props) {
    const verifyResponse = await fetch("/api/auth/verify")
    if (verifyResponse.status === 200) {
      const { userId } = await verifyResponse.json()
      const edit = (userId === props.profileUserId) || (props.profileUserId === "")
      return {
        edit,
        loggedIn: true
      }
    }
    router.push("/")
    return {
      edit: false,
      loggedIn: false
    }
  }
}
</script>