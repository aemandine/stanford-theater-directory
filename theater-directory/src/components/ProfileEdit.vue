<template>
  <div class="profile">
    <h1>Your Profile</h1>
    <v-form
      v-if="userInfo.id"
    >
      <v-alert
          color="var(--vt-c-purple-light)"
          icon="$warning"
          title="Note on privacy"
          text="All the information on your profile is public to anyone with a stanford.edu email. Also, I don't
          know why anyone would target this website, but technically a hacker could steal everyone's profile info. 
          So please don't put any private information in your profile!"
      ></v-alert>
      <h2>Personal information</h2>
      <div id="inline">
        <v-text-field 
          label="Name"
          v-model="userInfo.name"
          required
        ></v-text-field>
        <v-select 
          label="Grad year" 
          :items="Categories.YEARS"
          v-model="userInfo.graduationYear"
          required
        ></v-select>
      </div>
      <v-text-field
        label="Email (Stanford)" 
        v-model="userInfo.accountEmail"
        readonly
      ></v-text-field>
      <h2>Your interests</h2>
      <h3>Wondering what any of these roles are? Check out
        our <a href="/roles" target="_blank">role descriptions</a>!</h3>
      <v-autocomplete
        label="What roles are you interested in?"
        v-model="userInfo.rolesOfInterest"
        chips
        closable-chips
        :items="Categories.ROLES"
        multiple
      >
      </v-autocomplete>
      <v-autocomplete
        label="What instruments do you play?"
        v-model="userInfo.instruments"
        v-if="userInfo.rolesOfInterest.includes('Orchestra') || userInfo.rolesOfInterest.includes('Musical Improvisor')"
        chips
        closable-chips
        :items="Categories.INSTRUMENTS"
        multiple
      ></v-autocomplete>
      <v-autocomplete
        label="What roles would you like to learn more about?"
        v-model="userInfo.rolesToLearn"
        chips
        closable-chips
        :items="Categories.ROLES"
        multiple
      ></v-autocomplete>
      <v-autocomplete
        label="How would you like to learn more about a role?"
        v-model="userInfo.waysToLearn"
        v-if="userInfo.rolesToLearn.length > 0"
        chips
        closable-chips
        :items="Categories.WAYS_TO_LEARN"
        multiple
      ></v-autocomplete>
      <h2>Other information</h2>
      <v-textarea 
        label="Previous theatrical experience and other notes"
        v-model="userInfo.notes"
        auto-grow
        hint="Previous theatrical experience is not required!!"
        persistent-hint
      ></v-textarea>
      <br/>
      <div class="button">
        <v-btn
          color="var(--vt-c-purple-light)"
          @click="setUserInfo(myId ?? '', userInfo)"
          :loading="midSave"
        >
        <p class="font-weight-bold text-white">Save</p>
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<style scoped>
h1 {
  margin-bottom: 20px;
}
.profile {
  width: 700px;
}
.profile #inline {
  display: grid;
  grid-template-columns: 2fr 1fr;
  column-gap: 20px;
}
@media (max-width: 800px) {
  .profile {
    width: 100%;
  }
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
import { ref } from 'vue'
import { UserInfo } from '@/helpers/classes'
import Categories from '@/helpers/categories'
import loginMethods from "@/helpers/login-methods"

// Refs
const userInfo = ref(new UserInfo())
const midSave = ref(false)

// Functions
const getUserInfo = async(id: string) => {
  try {
    const { userInfo } = await (await fetch(`/api/user/get/${id}`)).json()
    return userInfo
  } catch {
    return { error: "Could not load user info" }
  }
}
const setUserInfo = async(id: string, userInfo: UserInfo) => {
  // Sort everything into alphabetical order before saving
  userInfo.rolesOfInterest = userInfo.rolesOfInterest.sort()
  userInfo.rolesToLearn = userInfo.rolesToLearn.sort()
  userInfo.instruments = userInfo.instruments.sort()
  userInfo.waysToLearn = userInfo.waysToLearn.sort()
  midSave.value = true
  const headers = {
    "Content-Type": "application/json"
  }
  const resp = await fetch(`/api/user/set/${id}`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(userInfo)
  })
  midSave.value = false
}

export default {
  async setup(props) {
    const myId = loginMethods.methods.getUserId()
    if (myId) {
      var fetchedUserInfo = await getUserInfo(myId)
      //var fetchedUserInfo = { "id": "0f1a255c-31e9-48c7-9b9e-f713718f085f", "name": "Anna Grelooze McSchmooze", "graduationYear": 2025, "accountEmail": "amist@stanford.edu", "waysToLearn": ["Assistant role", "Workshop"], "personalEmail": "amist@gmail.com", "rolesOfInterest": [ "Producer", "Actor", "Writer", "Deviser", "Run Crew", "Orchestra" ], "rolesToLearn": [ "Intimacy Director", "Actor", "Board Operator", "Hair and Makeup" ], "instruments": [ "Cymbals" ], "notes": "Producer for Circle Mirror Transformation, Assistant Director for 106, Actor in LINES" }
      if (!fetchedUserInfo.hasOwnProperty("error") && fetchedUserInfo.id === myId) {
        userInfo.value = fetchedUserInfo
      }
    }
    return {
      userInfo,
      Categories,
      midSave,
      myId,
      setUserInfo
    }
  }
}
</script>