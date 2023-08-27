<template>
  <div class="login">
    <v-divider v-if="loggedIn"></v-divider>
    <!-- Enter email -->
    <v-sheet 
      v-if="!loggedIn"
      class="pa-6 rounded-lg"
      elevation=6
      >
      <h1>Login</h1>
      <v-form 
        v-if="!sentCode"
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
      <!-- Enter code -->
      <v-form
        v-if="sentCode"
        @submit.prevent="attemptLogin"
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
          :loading="loading"
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
import router from '@/router'
import { isLoggedIn } from '@/helpers/api'

const email = ref("")
const code = ref("")
const sentCode = ref(false)
const loading = ref(false)

const sendEmail = async() => {
  if (isValidEmail(email.value) === true) { // Patchy and annoying!! Should be auto blocked by @submit.prevent
    const response = await fetch(`/api/auth/send/${email.value}`)
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
const attemptLogin = async() => {
  loading.value = true
  const resp = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email: `${email.value}@stanford.edu`, code: code.value })
  })
  code.value = ""
  if (resp.status === 200) {
    email.value = ""
    sentCode.value = false
    router.push("/profile")
  } else {
    alert("Login failed. Please try again!")
  }
  loading.value = false
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
    const loggedIn = await isLoggedIn()
    return {
      sendEmail,
      attemptLogin,
      sentCode,
      code,
      loading,
      email,
      isValidEmail,
      isValidCode,
      loggedIn
    }
  }
}
</script>