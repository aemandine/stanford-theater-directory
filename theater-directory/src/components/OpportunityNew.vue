<template>
  <div class="opportunity">
    <h1>Create a new opportunity</h1>
    <v-form
      v-if="opportunity"
      @submit.prevent="createOpportunity"
    >
      <v-text-field 
        label="Title"
        v-model="opportunity.title"
        :rules="rules"
        class="mb-5"
      ></v-text-field>
      <v-textarea
        label="Description" 
        v-model="opportunity.content"
        persistent-hint
        hint="Write text **like this** to emphasize it!"
        class="mb-5"
      ></v-textarea>
      <div class="button">
        <v-btn
          color="var(--vt-c-purple-light)"
          type="submit"
          :loading="loading"
          :disabled="isCreateButtonDisabled()"
        >
        <p class="font-weight-bold text-white">Create</p>
        </v-btn>
      </div>
    </v-form>
    <p v-else>Could not load opportunity.</p>
  </div>
</template>

<style scoped>
.v-autocomplete :deep(.v-chip) {
  font-size: 1em;
}
h1 {
  margin-bottom: 20px;
}
h2 {
  margin-top: 20px;
  margin-bottom: 10px;
}
h3 {
  margin-top: -10px;
  margin-bottom: 10px;
}
@media (max-width: 800px) {
  h2, h3 {
    text-align: center;
  }
  .button {
    text-align: center;
  }
}
</style>

<script lang="ts">
// Imports
import { ref, type Ref } from 'vue'
import { Opportunity } from '@/helpers/opportunity'
import { getUserId } from '@/helpers/auth'
import router from '@/router'

// Refs
const opportunity: Ref<Opportunity | null> = ref(null)
const loading = ref(false)

// Functions
const createOpportunity = async() => {
  loading.value = true
  if (await opportunity.value?.save(true)) {
    router.push("/opportunities")
  }
  loading.value = false
}
const isCreateButtonDisabled = () => {
  if (opportunity.value?.title == "") {
    return true
  }
  return false
}
const isValidTitle = (title: string) => {
  if (title == "") return "Please give your opportunity a title."
  return true
}

export default {
  data: () => ({
    rules: [ isValidTitle ]
  }),
  async setup(props) {
    // Check logged in
    if (await getUserId() === null) {
      router.push("/")
    } else {
      opportunity.value = Opportunity.new()
    }
    return {
      opportunity,
      loading,
      isCreateButtonDisabled,
      createOpportunity
    }
  }
}
</script>