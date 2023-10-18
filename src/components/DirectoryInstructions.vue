<template>
  <v-sheet>
    <div class="directoryInstructions">
      <h2>What do the tags mean?</h2>
      <v-chip color="green">
        They are interested in the role
      </v-chip>
      <v-chip color="blue">
        <i>They want to learn more about the role</i>
      </v-chip>
    </div>
  </v-sheet>
</template>

<style scoped>
.directoryInstructions {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}
h2, h3 {
  text-align: center;
}
</style>