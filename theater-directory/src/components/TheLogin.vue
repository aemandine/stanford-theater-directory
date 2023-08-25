<template>
  <div class="login">
    <!-- Enter email -->
    <v-sheet 
      v-if="!sentCode"
      class="pa-6 rounded-lg"
      elevation=6
      >
      <h1>Login</h1>
      <v-form 
        validate-on="input" 
        @submit.prevent="sendEmail"
        >
        <v-text-field
          v-model="email"
          label="SUNet ID (email)"
          :rules="emailRules"
          suffix="@stanford.edu"
          class="w-100 mb-2"
        ></v-text-field>
        <v-btn
          type="submit" 
          class="w-100"
          :disabled="isValidEmail(email) !== true"
          >
          Send me a login code
        </v-btn>
      </v-form>
    </v-sheet>
    
    <!-- Enter code -->
    <v-sheet 
      v-if="sentCode"
      class="pa-6 rounded-lg"
      elevation=6
    >
      <h1>Login</h1>
      <v-form
        @submit.prevent=""
        validate-on="input" 
        >
        <v-text-field
          v-model="code"
          maxlength=6
          label="Enter your code"
          :rules="codeRules"
          class="w-100 centered-input mb-2"
        ></v-text-field>
        <v-btn
          type="submit" 
          class="w-100 mb-2"
          :disabled="isValidCode(code) !== true"
          >
          Log in
        </v-btn>
        <v-btn 
          @click="sendEmail"
          variant="text"
          >
          Send me a new login code
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
.login {
  width: 100%;
  align-self: center;
  flex-shrink: 0;
  text-align: center;
}
.centered-input :deep(input) {
  text-align: center;
  letter-spacing: 0.5rem;
}
</style>

<script lang="ts">
import { ref } from 'vue'

const email = ref("")
const code = ref("")
const sentCode = ref(false)

const sendEmail = async() => {
  if (isValidEmail(email.value) === true) { // Patchy and annoying!! Should be auto blocked by @submit.prevent
    const response = await fetch(`/api/sendCode/${email.value}`)
    sentCode.value = true
  }
}
const isValidEmail = (email: string) => {
  if (!email) return "Please enter an email address."
  if (email.includes("@")) return "No need to type out @stanford.edu!"
  const valid = /^[a-zA-Z0-9_\-\.]*$/.test(email)
  if (!valid) return "Your email contains invalid characters."
  return true
}
const isValidCode = (code: string) => {
  if (code.length < 6) return "Please enter all six digits."
  return true
}
export default {
  data: () => ({
    emailRules: [ isValidEmail ],
    codeRules: [ isValidCode ]
  }),
  async setup() {
    return {
      sendEmail,
      sentCode,
      code,
      email,
      isValidEmail,
      isValidCode
    }
  }
}
</script>