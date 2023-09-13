<template>
  <div class="opportunities-list" v-if="userId && upcomingOpportunities !== null">
    <v-btn          
      color="var(--vt-c-purple-light)"
      class="mt-5 mb-5"
      href="/opportunities/new">
      <p class="font-weight-bold text-white">Publish an opportunity</p>
    </v-btn>
    <template v-for="opp in upcomingOpportunities">
      <!-- When we delete an opp we set the id to "" so this is an easy way to show the delete right away -->
      <v-sheet 
        v-if="opp.id"
        class="pa-6 rounded-lg mb-5 mt-5 w-100"
        elevation=6
        color="var(--color-background-mute)"
        >
        <OpportunityEdit 
          v-if="opp.id === editingId"
          @doneEditing="editingId = ''"
          :opportunity="opp" 
          :mine="opp.authorId === userId"
          />
        <OpportunityView 
          v-else
          @edit="(id) => editingId = id"
          :opportunity="opp" 
          :mine="opp.authorId === userId"
          />
      </v-sheet>
    </template>
  </div>
</template>

<style scoped>
.opportunities-list {
  display: flex;
  flex-direction: column;
  align-items: center;
}
@media (max-width: 800px) {
  .opportunities-list {
    text-align: center;
    width: 100%;
  }
}
</style>

<script lang="ts">
// Imports
import { Opportunity } from "@/helpers/opportunity"
import router from '@/router'
import { getUserId } from "@/helpers/auth"
import OpportunityView from "@/components/OpportunityView.vue"
import OpportunityEdit from "@/components/OpportunityEdit.vue"
import { ref, type Ref } from 'vue'

var upcomingOpportunities: Ref<Opportunity[] | null> = ref(null)
var editingId = ref("") // ID of the opportunity we're currently editing

// Functions
const refreshOpportunities = async() => {
  upcomingOpportunities.value = await Opportunity.upcomingOpportunities()
    if (upcomingOpportunities.value === null) {
      router.push("/")
    } else {
      upcomingOpportunities.value.sort( // Newest ones are listed first by default
        (a, b) => { return a.created! < b.created! ? 1 : -1 }
      )    
    }
}

export default {
  components: {
    OpportunityView, OpportunityEdit
  },
  async setup() {
    const userId = await getUserId()
    if (userId === null) {
      router.push("/")
    }
    await refreshOpportunities()
    return {
      upcomingOpportunities,
      userId,
      editingId,
      refreshOpportunities
    }
  }
}
</script>