<template>
  <div class="opportunity-edit">
    <v-form
      v-if="opportunity"
      @submit.prevent="saveOpportunity"
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
      <div class="buttons">
        <v-btn
          color="var(--vt-c-purple-light)"
          type="submit"
          class="mr-4"
          :loading="loading"
          :disabled="isSaveButtonDisabled()"
        >
        <p class="font-weight-bold text-white">Save</p>
        </v-btn>
        <v-btn
          variant="text"
          @click="cancelOpportunity"
        >
        <p class="text-gray">Cancel</p>
        </v-btn>
        <v-btn
          variant="text"
          @click="deleteOpportunity"
        >
        <p class="text-red">Delete</p>
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<style scoped>
.buttons {
  display: flex;
  gap: 20px;
}
.opportunity-edit {
  width: 100%;
}
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
  .buttons {
    text-align: center;
  }
}
</style>

<script lang="ts">
// Imports
import { ref, type Ref } from 'vue'
import { Opportunity } from '@/helpers/opportunity'

// Refs
const opportunity: Ref<Opportunity | null> = ref(null)
const loading = ref(false)

// Functions
const isSaveButtonDisabled = () => {
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
  props: {
    opportunity: Object,
  },
  setup(props, context) {
    opportunity.value = props.opportunity as Opportunity
    const initialValue = JSON.parse(JSON.stringify(opportunity.value))

    const saveOpportunity = async() => {
      loading.value = true
      if (await opportunity.value?.save(false)) {
        context.emit("doneEditing")
      }
      loading.value = false
    }
    const deleteOpportunity = async() => {
      if (opportunity.value) {
        if (await opportunity.value.delete()) {
          opportunity.value.id = ""
          context.emit("doneEditing")
        }
      }
    }
    const cancelOpportunity = () => {
      if (opportunity.value) { // reset
        opportunity.value.content = initialValue.content
        opportunity.value.title = initialValue.title
        context.emit("doneEditing")
      }
    }

    return {
      opportunity,
      loading,
      isSaveButtonDisabled,
      saveOpportunity,
      deleteOpportunity,
      cancelOpportunity
    }
  }
}
</script>