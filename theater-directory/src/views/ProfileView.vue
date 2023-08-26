<script lang="ts">
import Profile from "@/components/Profile.vue"
export default {
  props: ['id'],
  components: {
    Profile
  },
  setup(props) {
    const profileUserId = props.id ?? ""
    return {
      profileUserId
    }
  }
}
</script>

<template>
  <main>
    <Suspense>
      <template #default>
        <Profile :profileUserId="profileUserId" />
      </template>
      <template #fallback>
        <p>Loading profile...</p>
      </template>
    </Suspense>
  </main>
</template>