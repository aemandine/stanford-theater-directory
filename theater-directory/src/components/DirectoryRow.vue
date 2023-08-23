<template>
  <div class="directoryRow">
    <v-list-item class="py-3">
      <div class="user-row" :class="`header-${isHeader}`">
        <p><slot name="name"></slot></p>
        <p><slot name="interest"></slot></p>
        <p id="unimportant"><slot name="graduationYear"></slot></p>
        <p id="unimportant"><slot name="email"></slot></p>
      </div>
      <template v-if="!isHeader" v-slot:append>
        <v-btn size="small" variant="tonal">
          View User
          <v-icon color="var(--color-purple-foreground)" end>
            mdi-open-in-new
          </v-icon>
        </v-btn>
      </template>
    </v-list-item>
    <v-divider></v-divider>
  </div>
</template>

<style scoped>
.user-row {
  margin-right: 50px;
  display: grid;
  grid-template-columns: 20vw 20vw 15vw 20vw;
}
.header-true > p {
  font-weight: bold;
}
@media (max-width: 800px) {
  .user-row {
    grid-template-columns: 30vw 30vw;
  }
  #unimportant {
    display: none;
  }
}
</style>

<script lang="ts">
export default {
  props: {
    isHeader: Boolean
  },
}
</script>