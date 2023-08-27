<template>
  <div class="profile">
    <h1>Your Profile</h1>
    <v-form
      v-if="userInfo.id"
      @submit.prevent="setUserInfo(userInfo.id, userInfo, midSave)"
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
        label="Pronouns" 
        v-model="userInfo.pronouns"
      ></v-text-field>
      <v-text-field
        label="Email (Stanford)" 
        v-model="userInfo.accountEmail"
        readonly
      ></v-text-field>
      <h2>Your interests</h2>
      <h3>Wondering what any of these roles are? Check out
        our <a href="/roles" target="_blank">role descriptions</a>!</h3>
        <v-alert
          color="var(--vt-c-purple-light)"
          class="mb-2"
          icon="mdi-heart"
          title="What roles are you interested in?"
          text="List any roles you'd be interested in having -- you don't need any prior experience to 
          list a role as something you're interested in! We can help connect you to a mentor if you need
          guidance in the role."
      ></v-alert>
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
      <v-alert
          color="var(--vt-c-purple-light)"
          class="mb-2"
          icon="mdi-chat-question"
          title="What roles would you like to learn more about?"
          text="List any roles you want to learn more about (via being an assistant, participating in a workshop, or 
          chatting with a student in that role). These can include roles you listed above as ones you're interested in having!"
      ></v-alert>
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
          type="submit"
          :loading="midSave"
        >
        <p class="font-weight-bold text-white">Save</p>
        </v-btn>
      </div>
    </v-form>
    <p v-else>Could not load your profile.</p>
  </div>
</template>

<style scoped>
.v-autocomplete :deep(.v-chip) {
  font-size: 1em;
}
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
import { getUserInfo, setUserInfo } from '@/helpers/api'

// Refs
const userInfo = ref(new UserInfo())
const midSave = ref(false)

export default {
  props: {
    userId: String
  },
  async setup(props) {
    if (props.userId) {
      userInfo.value = await getUserInfo(props.userId) ?? new UserInfo()
    }
    return {
      userInfo,
      Categories,
      midSave,
      setUserInfo
    }
  }
}
</script>