<template>
  <div :class="`directoryRow header-${isHeader}`" >
    <v-list-item class="py-3">
      <div class="user-row" :class="`header-${isHeader} filtered-${isFiltered}`">
        <div class="name" :class="`header-${isHeader}`">
          <p><slot name="name"></slot></p>
          <v-btn size="small" variant="tonal" v-if="!isHeader" :href="`/profile/${userId}`">
            View Profile
          </v-btn>
        </div>
        <p v-if="isFiltered" id="unimportant"><slot name="interest"></slot></p>
        <p v-else><slot name="interest"></slot></p>
        <p id="unimportant"><slot name="affiliation"></slot></p>
        <p id="unimportant"><slot name="email"></slot></p>
        <p id="unimportant"><slot name="notes"></slot></p>
        <p v-if="isFiltered"><slot name="tags"></slot></p>
      </div>
    </v-list-item>
    <v-divider v-if="!isHeader"></v-divider>
  </div>
</template>

<style scoped>
.directoryRow.header-true {
  background: var(--color-background-mute);
}
.name {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
}
.user-row {
  margin-right: 50px;
  display: grid;
  grid-template-columns: 13vw 25vw 10vw 15vw auto;
  column-gap: 3vw;
}
.filtered-true {
  margin-right: 50px;
  display: grid;
  grid-template-columns: 13vw 13vw 8vw 13vw 14vw auto;
  column-gap: 3vw;
}
.header-true > p {
  font-weight: bold;
}
@media (max-width: 800px) {
  .user-row {
    grid-template-columns: 35vw auto;
    column-gap: 20px;
  }
  #unimportant {
    display: none;
  }
}
</style>

<script lang="ts">
export default {
  props: {
    isHeader: Boolean,
    isFiltered: Boolean,
    userId: String
  },
}
</script>