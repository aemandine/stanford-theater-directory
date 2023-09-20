<template>
  <div class="nav-panel w-100">
    <v-btn 
      rounded="lg" 
      variant="tonal" 
      class="text-none pt-10 pb-10"
      color="var(--color-purple-foreground)"
      prepend-icon="mdi-account-circle"
      stacked
      href="/profile"
      >
      Build my profile
    </v-btn>
    <v-btn 
      rounded="lg" 
      variant="tonal" 
      class="text-none pt-10 pb-10" 
      color="var(--color-purple-foreground)"
      prepend-icon="mdi-book-open-blank-variant" 
      stacked
      href="/directory"
      >
      View the directory
    </v-btn>
    <v-btn 
      rounded="lg" 
      variant="tonal" 
      class="text-none pt-10 pb-10" 
      color="var(--color-purple-foreground)"
      prepend-icon="mdi-star" 
      stacked
      href="/opportunities"
      >
      Browse opportunities
    </v-btn>
    <v-btn 
      rounded="lg" 
      variant="tonal" 
      class="text-none pt-10 pb-10" 
      color="var(--color-purple-foreground)"
      prepend-icon="mdi-bookshelf" 
      stacked
      href="/roles"
      >
      Browse roles
    </v-btn>
  </div>
  <v-btn 
      rounded="lg" 
      variant="text" 
      class="text-none w-100" 
      color="var(--color-purple-foreground)"
      prepend-icon="mdi-email-outline"
      >
      Have a suggestion for the website?
      <v-dialog 
        activator="parent"
        v-model="showingFeedbackDialog"
        >
        <HomeFeedback
          @closeFeedback="showingFeedbackDialog = false"
        />
      </v-dialog>
    </v-btn>
</template>

<style scoped>
.nav-panel {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 20px;
  margin: 20px;
}
.v-btn {
  color: white;
}
</style>

<script lang="ts">
import HomeFeedback from "@/components/HomeFeedback.vue"
export default {
  components: { HomeFeedback },
  data() {
    return {
      showingFeedbackDialog: false
    }
  }
}
</script>