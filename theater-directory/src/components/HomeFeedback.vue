<template>
  <div class="feedback">
    <v-sheet 
      v-if="loggedIn"
      class="pa-6 rounded-lg"
      elevation=6
      >
      <h1>Anonymous Feedback</h1>
      <v-form @submit.prevent="sendFeedback">
        <v-textarea
          v-model="message"
          label="Let us know your thoughts about the website!"
          class="w-100 mb-2"
          @update:focused="buttonText = 'Send Feedback'"
        ></v-textarea>
        <v-btn 
          type="submit"
          class="w-100"
          :disabled="message.trim().length === 0"
          > 
          {{ buttonText }}
        </v-btn>
      </v-form>
    </v-sheet>
  </div>
</template>

<style scoped>
h1 {
  font-weight: bold;
  color: var(--vt-c-red-dark);
  margin-bottom: 10px;
}
.feedback {
  width: 100%;
  align-self: center;
  flex-shrink: 0;
  text-align: center;
  margin: 20px 0px;
}
</style>

<script lang="ts">
import { ref } from 'vue'
import { isLoggedIn } from '@/helpers/api'

const buttonText = ref("Send Feedback")
const message = ref("")

const sendFeedback = async() => {
  const resp = await fetch("/api/feedback/send", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ message: message.value })
  })
  if (resp.status === 200) {
    message.value = ""
    buttonText.value = "Sent"
  }
}
export default {
  async setup() {
    const loggedIn = await isLoggedIn()
    return {
      loggedIn,
      buttonText,
      message,
      sendFeedback
    }
  }
}
</script>