<script lang="ts">
import ProfileEdit from "@/components/ProfileEdit.vue"
import Profile from "@/components/Profile.vue"
import loginMethods from "@/helpers/login-methods"
export default {
  props: ['id'],
  components: {
    ProfileEdit, Profile
  },
  setup(props) {
    const userId = props.id ?? ""
     // If the userId is empty, we can edit (think about own ID)
    const edit = userId.length == 0 || userId == loginMethods.methods.getUserId()
    return {
      userId, 
      edit
    }
  }
}
</script>

<template>
  <main>
    <!-- Editing my own profile -->
    <Suspense v-if="edit">
      <template #default>
        <ProfileEdit />
      </template>
      <template #fallback>
        <p>Loading your profile...</p>
      </template>
    </Suspense>

    <!-- Viewing someone else's profile -->
    <Suspense v-else>
      <template #default>
        <Profile :userId="userId" />
      </template>
      <template #fallback>
        <p>Loading profile...</p>
      </template>
    </Suspense>
  </main>
</template>