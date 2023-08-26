<template>
  <div class="directory" v-if="loggedIn">
    <h1>Directory</h1>
    <DirectoryInstructions/>
    <div class="search">
      <h2>Display all users who</h2>
      <v-autocomplete
        v-model="filters.interestLevels"
        :items="[InterestLevel.Interested, InterestLevel.WantToLearn]"
        rounded
        multiple
        chips
        closable-chips
        auto-select-first
        theme="light"
        variant="solo"
        density="comfortable"
        class="mx-4"
        hide-details
      ></v-autocomplete>
      <h2>the role of</h2>
      <v-autocomplete
        v-model="filters.role"
        :items="Categories.ROLES"
        rounded
        clearable
        auto-select-first
        theme="light"
        variant="solo"
        density="comfortable"
        class="mx-4"
        hide-details
      ></v-autocomplete>
    </div>
    <div class="search" v-if="Categories.MUSICAL_ROLES.includes(filters.role)">
      <h2>playing the</h2>
      <v-autocomplete
        v-model="filters.instruments"
        :items="Categories.INSTRUMENTS"
        rounded
        multiple
        chips
        closable-chips
        auto-select-first
        theme="light"
        variant="solo"
        density="comfortable"
        class="mx-4"
        hide-details
        placeholder="(optional filter)"
      ></v-autocomplete>
    </div>
    <div class="search" v-if="filters.interestLevels.includes(InterestLevel.WantToLearn)">
      <h2>and want to learn via</h2>
      <v-autocomplete
        v-model="filters.learningStyles"
        :items="Categories.WAYS_TO_LEARN"
        rounded
        multiple
        chips
        closable-chips
        auto-select-first
        theme="light"
        variant="solo"
        density="comfortable"
        class="mx-4"
        hide-details
        placeholder="(optional filter)"
      ></v-autocomplete>
    </div>
    <br/>
    <div>
      <DirectoryRow 
        v-if="filteredUsers.length > 0" 
        is-header
        :is-filtered="!!filters.role"
      >
        <template #name>
          <div @click="sortBy('name')">
            <b>Name</b>
            <v-icon 
              v-if="filters.sortBy == 'name' && filters.sortReversed"
              icon="mdi-menu-up" 
              class="pb-1" 
              size="25" >
            </v-icon>
            <v-icon 
              v-else
              icon="mdi-menu-down" 
              class="pb-1" 
              :class="{notSelected: filters.sortBy != 'name'}"
              size="25" >
            </v-icon>
          </div>
        </template>
        <template #interest v-if="filters.role">Interest Level</template>
        <template #interest v-else>Roles of Interest</template>
        <template #graduationYear>
          <div @click="sortBy('graduationYear')">
            <b>Graduating</b>
            <v-icon 
              v-if="filters.sortBy == 'graduationYear' && filters.sortReversed"
              icon="mdi-menu-up" 
              class="pb-1" 
              size="25" >
            </v-icon>
            <v-icon 
              v-else
              icon="mdi-menu-down" 
              class="pb-1" 
              :class="{notSelected: filters.sortBy != 'graduationYear'}"
              size="25" >
            </v-icon>
          </div>
        </template>
        <template #email>
          <div @click="sortBy('email')">
            <b>Email</b>
            <v-icon 
              v-if="filters.sortBy == 'email' && filters.sortReversed"
              icon="mdi-menu-up" 
              class="pb-1" 
              size="25" >
            </v-icon>
            <v-icon 
              v-else
              icon="mdi-menu-down" 
              class="pb-1" 
              :class="{notSelected: filters.sortBy != 'email'}"
              size="25" >
            </v-icon>
          </div>
        </template>
        <template #notes>Notes</template>
        <template #tags v-if="Categories.MUSICAL_ROLES.includes(filters.role)">Instruments</template>
        <template #tags v-else>Learning Style</template>
      </DirectoryRow>
      <div v-else>
        <v-divider></v-divider>
        <h3>No users satisfy that query, sorry!</h3>
      </div>
    </div>
    <v-virtual-scroll
      height="60vh"
      :items="filteredUsers"
    >
      <template v-slot:default="{ item }">
        <DirectoryRow :is-filtered="!!filters.role" :user-id="item.id">
          <template #name>{{ item.name }}</template>
          <template #interest v-if="filters.role">
            <v-chip 
              v-if="item.rolesOfInterest.includes(filters.role)" 
              class="mr-1 mb-1"
              color="green"
              >
              Interested
            </v-chip>
            <v-chip 
              v-if="item.rolesToLearn.includes(filters.role)"
              class="mr-1 mb-1"
              color="blue"
              >
              <i>Wants to Learn</i>
            </v-chip>
          </template>
          <template #interest v-else>
            <v-chip 
              v-for="role in item.rolesOfInterest.sort()"
              v-on:click="filters.role = role; filters.interestLevels = [InterestLevel.Interested]"
              class="mr-1 mb-1"
              color="green"
              >
              {{ role }}
            </v-chip>
            <v-chip 
              v-for="role in item.rolesToLearn.sort()"
              v-on:click="filters.role = role; filters.interestLevels = [InterestLevel.WantToLearn]"
              class="mr-1 mb-1"
              color="blue"
              >
              <i>{{ role }}</i>
            </v-chip>
          </template>
          <template #graduationYear>{{ item.graduationYear === 0 ? "" : item.graduationYear }}</template>
          <template #email>{{ item.accountEmail }}</template>
          <template #notes>{{ item.notes }}</template>
          <template #tags v-if="Categories.MUSICAL_ROLES.includes(filters.role)">
            <v-chip 
              v-for="instrument in item.instruments.sort()"
              class="mr-1 mb-1"
              color="purple"
              >
              {{ instrument }}
            </v-chip>
          </template>
          <template #tags v-else>
            <v-chip 
              v-for="style in item.waysToLearn.sort()"
              class="mr-1 mb-1"
              color="orange"
              >
              {{ style }}
            </v-chip>
          </template>
        </DirectoryRow>
      </template>
    </v-virtual-scroll>
  </div>
</template>

<style scoped>
.notSelected {
  opacity: 0.5;
}
.search {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 20px 0px;
}
h2 {
  align-self: center;
  margin-top: 0px;
  margin-bottom: 0px;
}
h3 {
  margin-top: 20px;
}
h1 {
  margin-bottom: 15px;
}
@media (max-width: 800px) {
  .search {
    display: block;
  }
  h2, h3 {
    text-align: center;
    margin-bottom: 10px;
    margin-top: 10px;
  }
}
</style>

<script lang="ts">
// Imports
import { ref, computed } from 'vue'
import { UserInfo, Filters, InterestLevel } from '@/helpers/classes'
import DirectoryRow from '@/components/DirectoryRow.vue'
import DirectoryInstructions from '@/components/DirectoryInstructions.vue'
import Categories from '@/helpers/categories'
import { getUsers } from '@/helpers/api'

// Refs and variables
const filters = ref(new Filters())
var allUsers: UserInfo[]

// Functions
// Updates how the directory is sorted
const sortBy = (property: string) => {
  const oldSort = filters.value.sortBy
  filters.value.sortBy = property
  // If we're clicking on the same thing we were sorting by, reverse it
  if (oldSort == property) {
    filters.value.sortReversed = !filters.value.sortReversed
  } else {
    filters.value.sortReversed = false
  }
}
const filteredUsers = computed(() => {
  var filtered: UserInfo[] = JSON.parse(JSON.stringify(allUsers)) // Deep copy
  if (filters.value.hasFilter()) {
    // Filter it
    filtered = filtered.filter((userInfo: UserInfo) => {
      const newFilters = filters.value

      // Don't have filters for things you can't see
      if (!newFilters.interestLevels.includes(InterestLevel.WantToLearn)) {
        newFilters.learningStyles = []
      }
      if (!Categories.MUSICAL_ROLES.includes(newFilters.role)) {
        newFilters.instruments = []
      }

      var matchingInterestLevelForRole = false
      // If there are no instruments or learning styles to filter for, auto-true
      var matchingLearningStyle = newFilters.learningStyles.length == 0 ? true : false
      var matchingInstrument = newFilters.instruments.length == 0 ? true : false

      // We want someone who is interested
      if (newFilters.interestLevels.includes(InterestLevel.Interested)) {
        // They are interested
        if (userInfo.rolesOfInterest.includes(newFilters.role)) {
          matchingInterestLevelForRole = true
          matchingLearningStyle = true // If we're already looking for interested people, don't focus on learning style
        }
      }
      // If we want someone who wants to learn
      if (newFilters.interestLevels.includes(InterestLevel.WantToLearn)) {
        // They want to learn
        if (userInfo.rolesToLearn.includes(newFilters.role)) {
          matchingInterestLevelForRole = true
        }
        // Check against each learning style
        newFilters.learningStyles.forEach((style) => {
          if (userInfo.waysToLearn.includes(style)) {
            matchingLearningStyle = true
          }
        })
      }
      // If we want a musical person
      if (Categories.MUSICAL_ROLES.includes(newFilters.role)) {
        newFilters.instruments.forEach((instrument) => {
          if (userInfo.instruments.includes(instrument)) {
            matchingInstrument = true
          }
        })
      }

      return matchingInterestLevelForRole && matchingLearningStyle && matchingInstrument
    })
  }
  // Sort it
  if (filters.value.sortBy in UserInfo) {
    filtered.sort((a, b) => (a[filters.value.sortBy as keyof UserInfo] > b[filters.value.sortBy as keyof UserInfo] ? 1 : -1))
  }
  // Reverse if it's the years because numbers and strings are different
  if (filters.value.sortBy === "graduationYear") {
    filtered.reverse()
  }
  // Reverse if necessary
  if (filters.value.sortReversed) {
    filtered.reverse()
  }
  return filtered
})

export default {
  components: {
    DirectoryRow, DirectoryInstructions
  },
  async setup(props) {
    const verifyResponse = await fetch("/api/auth/verify")
    var loggedIn = false
    if (verifyResponse.status === 200) {
      loggedIn = true
      allUsers = await getUsers()
    }
    return {
      loggedIn,
      Categories,
      InterestLevel,
      filters,
      filteredUsers,
      allUsers,
      sortBy,
    }
  }
}
</script>