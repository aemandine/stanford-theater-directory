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
    <div v-if="opp.content" v-for="line in parseMarkdown(opp.content)">
      <div v-if="line.length > 0">
        <span v-for="item in line">
          <span v-if="item.link"><a :href="item.link" :class="item.bold ? 'bold' : ''" target="_blank">{{ item.text }}</a></span>
          <span v-else :class="item.bold ? 'bold' : ''">{{ item.text }}</span>
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
h3, p, span {
  color: var(--color-text);
}
h3 {
  margin-bottom: 10px;
}
.bold {
  font-weight: bold;
  color: var(--vt-c-purple-light);
}
</style>

<script lang="ts">
import { type Opportunity } from '@/helpers/opportunity';
import { parseMarkdown } from '@/helpers/markdownParser';
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
      mine,
      parseMarkdown
    }
  }
}
</script>