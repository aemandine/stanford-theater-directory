<template>
  <v-sheet 
    v-if="loggedIn"
    class="pa-6 rounded-lg"
    elevation=6
    color="var(--color-background-mute)"
    >
    <h1>SLOCo Winter 2024 Mainstage Production: Mary Poppins</h1>
    <h3>Tentatively scheduled for Week 9 of Winter Quarter.</h3>
    <p>Are you <em>Practically Perfect?</em></p>
    <p>Need a <em>Spoonful of Sugar?</em></p>
    <p>Feeling <em>Supercalifragilisticexpialidocious!?</em></p>
    <p>From the VSO that brought you Sweeney Todd, Die Fledermaus, The 25th Annual Putnam County Spelling Bee, Cabaret, The Phantom of the Opera, and more, Stanford Light Opera Company proudly presents our 2023-2024 winter show: <em>Mary Poppins</em></p>
    <br/>
    <p>Want to be a part of making magic with us? <a href="https://docs.google.com/forms/d/1dvCIEGgR2f66HbobkoIVpQu12hKiLQk2O1YGgaJMCrg/edit" target="_blank"><em>Fill out this form and we'll be in touch with you soon!</em></a></p>
    <p>Questions? Comments? Concerns? Please feel free to email director <a href="https://unofficialtheater.directory/profile/d5c620c3-ed2f-4fb2-b0c6-98ad08510e1c" target="_blank">Liam Fay</a> (liamfay@stanford.edu).</p>
  </v-sheet>
</template>

<style scoped>
h1 {
  font-weight: bold;
  color: var(--vt-c-purple-light);
  margin-bottom: 10px;
}
h2, h3, p {
  color: var(--color-text);
}
em {
  font-weight: bold;
  color: var(--vt-c-purple-light);
}
a {
  text-decoration: underline;
}
</style>

<script lang="ts">
// Imports
import { getUserId } from "@/helpers/auth"

export default {
  async setup() {
    const loggedIn = (await getUserId()) !== null
    return {
      loggedIn
    }
  }
}
</script>