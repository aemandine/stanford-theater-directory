<template>
  <div class="directoryInstructions">
    <v-chip color="green">
      They are interested in the role
    </v-chip>
    <v-chip color="blue">
      <i>They want to learn more about the role</i>
    </v-chip>
  </div>
</template>

<style scoped>
.directoryInstructions {
  margin: 20px 0px;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 0.5rem;
}
@media (max-width: 800px) {
  h2, h3 {
    text-align: center;
  }
  .directoryInstructions {
    align-items: center;
  }
}
</style>