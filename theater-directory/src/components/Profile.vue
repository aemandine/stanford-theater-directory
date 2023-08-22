<template>
  <div class="profile">
    <v-form
      v-if="userId !== undefined && userInfo !== null"
    >
      <h2>Personal information</h2>
      <div id="inline">
        <v-text-field 
          label="Name"
          v-model="userInfo.name"
          required
        ></v-text-field>
        <v-select 
          label="Grad year" 
          :items="years"
          v-model="userInfo.graduationYear"
          required
        ></v-select>
      </div>
      <v-text-field
        label="Email (primary)" 
        v-model="userInfo.primaryEmail"
        required
      ></v-text-field>
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
        :items="roles"
        multiple
      >
      </v-autocomplete>
      <v-autocomplete
        label="What instruments do you play?"
        v-model="userInfo.instruments"
        v-if="userInfo.rolesOfInterest.includes('Orchestra')"
        chips
        closable-chips
        :items="instruments"
        multiple
      ></v-autocomplete>
      <v-autocomplete
        label="What roles would you like to learn more about?"
        v-model="userInfo.rolesToLearn"
        chips
        closable-chips
        :items="roles"
        multiple
      ></v-autocomplete>
      <v-autocomplete
        label="How would you like to learn more about a role?"
        v-model="userInfo.waysToLearn"
        v-if="userInfo.rolesToLearn.length > 0"
        chips
        closable-chips
        :items="waysToLearn"
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
      <v-btn
        color="var(--vt-c-purple-light)"
        @click="setUserInfo(userId, userInfo)"
        :loading="midSave"
      >
      <p class="font-weight-bold text-white">Save</p>
      </v-btn>
    </v-form>
    <p v-else>Failed to load profile.</p>
  </div>
</template>

<style scoped>
.profile {
  width: 50vw;
}
.profile #inline {
  display: grid;
  grid-template-columns: 2fr 1fr;
  column-gap: 20px;
}
h2 {
  margin-top: 20px;
  margin-bottom: 10px;
  text-align: left;
  font-weight: bold;
}
h3 {
  margin-top: -10px;
  margin-bottom: 10px;
}

@media (max-width: 800px) {
  .profile {
    width: 100%;
  }
}
</style>

<script lang="ts">
import { ref } from 'vue'
const roles = [
  "Director", "Producer", "Production Manager", "Technical Director",
  "Actor", "Improvisor", "Stage Manager", "Community Wellness Coordinator",
  "Intimacy Director", "Choreographer (Dance)", "Choreographer (Combat)",
  "Choreographer (Other)", "Lighting Designer", "Sound Designer",
  "Multimedia/Projections Designer", "Graphic Designer", "Costume Designer",
  "Set Designer", "Prop Master", "Writer", "Deviser", "Dramaturg",
  "Music Director", "Vocal Director", "Orchestra", "Board Operator",
  "Hair and Makeup", "General Run Crew"
].sort()
const instruments = [
  "Violin", "Viola", "Cello", "Double Bass", "Flute", "Oboe", "Clarinet", "Bassoon", "Trumpet",
  "Horn", "Trombone", "Tuba", "Timpani", "Percussion", "Harp", "Piano", "Piccolo", "English Horn",
  "Bass Clarinet", "Contrabassoon", "Cornet", "Euphonium", "Saxophone", "Celesta", "Glockenspiel", "Xylophone",
  "Marimba", "Vibraphone", "Bass Drum", "Snare Drum", "Cymbals", "Triangle", "Tambourine", "Gong", "Bass Trombone",
  "Tenor Trombone", "Oboe d'Amore", "Soprano Saxophone", "Alto Saxophone", "Tenor Saxophone", "Baritone Saxophone",
  "Contrabass Clarinet", "Soprano Cornet", "Alto Cornet", "Subcontrabass Tuba", "Wagner Tuba", "Sousaphone"
].sort()
const waysToLearn = [
  "Workshop",
  "Assistant role",
  "Casual one-on-one meeting with a student in that role"
].sort()
const years = [2024, 2025, 2026, 2027, 2028, 2029, 2030]
const getUserInfo = async(id: string) => {
  try {
    const { userInfo } = await (await fetch(`/api/user/get/${id}`)).json()
    return userInfo
  } catch {
    return { error: "Could not load user info" }
  }
}
class UserInfo {
  name: string = ""
  graduationYear: number = 0
  primaryEmail: string = ""
  accountEmail: string = ""
  rolesOfInterest: string[] = []
  rolesToLearn: string[] = []
  notes: string = ""
  instruments: string[] = []
  waysToLearn: string[] = []
}
export default {
  props: {
    userId: String
  },
  async setup(props) {
    const userInfo = ref(new UserInfo())
    const midSave = ref(false)

    const setUserInfo = async(id: string, userInfo: UserInfo) => {
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
    
    if (props.userId) {
      var fetchedUserInfo = await getUserInfo(props.userId)
      if (fetchedUserInfo.hasOwnProperty("error")) {
        fetchedUserInfo = null
      } else {
        userInfo.value = fetchedUserInfo
      }
    }
    return {
      userInfo: userInfo ?? null,
      roles,
      instruments,
      waysToLearn,
      years,
      setUserInfo,
      midSave
    }
  }
}
</script>