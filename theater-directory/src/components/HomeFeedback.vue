<template>
  <div class="feedback">
    <v-sheet 
      class="rounded-lg"
      elevation=6
      >
      <v-btn 
        icon 
        variant="text" 
        class="close-popup" 
        @click="$emit('close-feedback')" 
        color="var(--vt-c-divider-dark-1)">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <div class="pa-6">
        <h1>Suggestion Box</h1>
        <v-form @submit.prevent="sendFeedback">
          <v-textarea
            v-model="message"
            label="What else do you want to see on this website?"
            class="w-100 mb-2"
            hide-details
            @update:focused="buttonText = 'Send feedback'"
          ></v-textarea>
          <v-btn 
            type="submit"
            class="w-100 text-none text-white"
            size="large"
            color="var(--vt-c-purple-dark)"
            :loading="loading"
            :disabled="message.trim().length === 0"
            > 
            {{ buttonText }}
          </v-btn>
        </v-form>
      </div>
    </v-sheet>
  </div>
</template>

<style scoped>
h1 {
  font-weight: bold;
  color: var(--vt-c-purple-light);
  margin-bottom: 10px;
}
.feedback {
  min-width: 500px;
  align-self: center;
  flex-shrink: 0;
  text-align: center;
  margin: 20px 0px;
  position: relative;
}
.close-popup {
  position: absolute;
  left: 0.5rem;
  top: 0.3rem;
}
@media (max-width: 500px) {
  .feedback {
    min-width: 100%;
  }
}
</style>

<script lang="ts">
import { ref } from 'vue'

const buttonText = ref("Send feedback")
const loading = ref(false)
const message = ref("")

const sendFeedback = async() => {
  loading.value = true
  const resp = await fetch("/api/feedback/send", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ message: message.value })
  })
  if (resp.status === 200) {
    message.value = ""
    buttonText.value = "Sent"
  }
  loading.value = false
}
export default {
  setup() {
    return {
      buttonText,
      loading,
      message,
      sendFeedback
    }
  }
}
</script>