<template>
  <div v-if="userId !== null">
    <!-- Editing my own profile -->
    <Suspense v-if="edit">
      <template #default>
        <ProfileEdit :userId="userId" />
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
import { getUserId } from "@/helpers/auth"

export default {
  props: {
    profileUserId: String
  },
  components: {
    ProfileEdit, ProfileView
  },
  async setup(props) {
    const userId = await getUserId()
    const edit = (userId === props.profileUserId) || (props.profileUserId === "")
    if (userId === null) {
      router.push("/")
    }
    return {
      edit,
      userId
    }
  }
}
</script>