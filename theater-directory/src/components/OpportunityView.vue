<template>
  <div class="opportunity-view">
    <!-- Title -->
    <!-- And if this is our post, put an edit button! -->
    <h2>
      {{ opp.title }}
      <v-icon 
        v-if="mine"
        icon="mdi-square-edit-outline" 
        size="25"
        @click="$emit('edit', opp.id)"
      ></v-icon>
    </h2>
    <!-- Post metadata -->
    <h3>{{ opp.getMetadata().label }} <a :href="`/profile/${opp.authorId}`">{{ opp.getMetadata().linkedLabel }}</a></h3>
    <!-- Content: Allow for line breaks -->
    <div v-for="line in opp.content?.split('\n')">
      <div v-if="line">
        <!-- Content: Allow for bolding -->
        <span v-for="(fragment, index) in line.trim().split('**')">
          <span v-if="index%2 == 1"><em>{{  fragment  }}</em></span>
          <span v-else>{{ fragment }}</span>
        </span>
      </div>
      <br v-else />
    </div>
  </div>
</template>

<style scoped>
.opportunity-view {
  width: 100%;
}
h2 {
  color: var(--vt-c-purple-light);
}
h3, p {
  color: var(--color-text);
}
h3 {
  margin-bottom: 10px;
}
em {
  font-weight: bold;
  color: var(--vt-c-purple-light);
}
</style>

<script lang="ts">
import { type Opportunity } from '@/helpers/opportunity';
export default {
  props: {
    opportunity: Object,
    mine: Boolean
  },
  setup(props) {
    const opp = props.opportunity as Opportunity
    const mine = props.mine
    return {
      opp,
      mine
    }
  }
}
</script>