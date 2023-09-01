<template>
  <div class="directory" v-if="allUsers !== null">
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
        <template #interest v-else>
          Roles of Interest
          <v-btn
            variant="plain"
            density="compact"
            icon="mdi-information-outline"
            class="ml-n1"
            >
            <v-icon 
              icon="mdi-information-outline"
              size="x-small"
              />
            <v-dialog activator="parent">
              <DirectoryInstructions />
            </v-dialog>
          </v-btn>
        </template>
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
          <div @click="sortBy('accountEmail')">
            <b>Email</b>
            <v-icon 
              v-if="filters.sortBy == 'accountEmail' && filters.sortReversed"
              icon="mdi-menu-up" 
              class="pb-1" 
              size="25" >
            </v-icon>
            <v-icon 
              v-else
              icon="mdi-menu-down" 
              class="pb-1" 
              :class="{notSelected: filters.sortBy != 'accountEmail'}"
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
      :items="filteredUsers"
      height="70vh"
    >
      <template v-slot:default="{ item }">
        <DirectoryRow :is-filtered="!!filters.role" :user-id="item.id">
          <template #name>{{ item.name?.length ? item.name : "(Unnamed)" }}</template>
          <template #interest v-if="filters.role">
            <v-chip 
              v-if="item.rolesOfInterest?.includes(filters.role)" 
              class="mr-1 mb-1"
              color="green"
              >
              Interested
            </v-chip>
            <v-chip 
              v-if="item.rolesToLearn?.includes(filters.role)"
              class="mr-1 mb-1"
              color="blue"
              >
              <i>Wants to Learn</i>
            </v-chip>
          </template>
          <template #interest v-else>
            <v-chip 
              v-for="role in item.rolesOfInterest?.sort()"
              v-on:click="filters.role = role; filters.interestLevels = [InterestLevel.Interested]"
              class="mr-1 mb-1"
              color="green"
              >
              {{ role }}
            </v-chip>
            <v-chip 
              v-for="role in item.rolesToLearn?.sort()"
              v-on:click="filters.role = role; filters.interestLevels = [InterestLevel.WantToLearn]"
              class="mr-1 mb-1"
              color="blue"
              >
              <i>{{ role }}</i>
            </v-chip>
          </template>
          <template #graduationYear>{{ item.graduationYear }}</template>
          <template #email>{{ item.accountEmail }}</template>
          <template #notes>
            {{ truncate(item.notes ?? "", 200) }}
          </template>
          <template #tags v-if="Categories.MUSICAL_ROLES.includes(filters.role)">
            <v-chip 
              v-for="instrument in item.instruments?.sort()"
              class="mr-1 mb-1"
              color="purple"
              >
              {{ instrument }}
            </v-chip>
          </template>
          <template #tags v-else>
            <v-chip 
              v-for="style in item.waysToLearn?.sort()"
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
.v-dialog {
  max-width: 400px;
}
.notSelected {
  opacity: 0.5;
}
.search {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 20px 0;
}
h2 {
  align-self: center;
  margin-top: 0px;
  margin-bottom: 0px;
}
h3 {
  margin-top: 20px;
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
import { Filters, InterestLevel } from '@/helpers/classes'
import DirectoryRow from '@/components/DirectoryRow.vue'
import DirectoryInstructions from '@/components/DirectoryInstructions.vue'
import Categories from '@/helpers/categories'
import router from '@/router'
import { User, type UserInfo } from '@/helpers/user'

// Refs and variables
const filters = ref(new Filters())
var allUsers: User[] | null

// Functions
// Truncates the given string to a specific length
const truncate = (text: string, length: number) => {
  if (text.length <= length) {
    return text
  }
  if (length < 3) {
    return "..."
  }
  return text.substring(0, length - 3) + "..."
}
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
// Calculates the filtered list of users
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
      var matchingLearningStyle = true
      var matchingInstrument = true

      // We want someone who is interested
      if (newFilters.interestLevels.includes(InterestLevel.Interested)) {
        // They are interested
        if (userInfo.rolesOfInterest?.includes(newFilters.role)) {
          matchingInterestLevelForRole = true
        }
      }
      
      // If we want someone who wants to learn
      if (newFilters.interestLevels.includes(InterestLevel.WantToLearn)) {
        // They want to learn
        if (userInfo.rolesToLearn?.includes(newFilters.role)) {
          matchingInterestLevelForRole = true
        }
        // Check against each learning style (if no learning styles, auto true)
        matchingLearningStyle = newFilters.learningStyles.length == 0 ? true : false 
        newFilters.learningStyles.forEach((style) => {
          if (userInfo.waysToLearn?.includes(style)) {
            matchingLearningStyle = true
          }
        })
      }

      // If we want a musical person
      if (Categories.MUSICAL_ROLES.includes(newFilters.role)) {
        matchingInstrument = newFilters.instruments.length == 0 ? true : false
        newFilters.instruments.forEach((instrument) => {
          if (userInfo.instruments?.includes(instrument)) {
            matchingInstrument = true
          }
        })
      }

      return matchingInterestLevelForRole && matchingLearningStyle && matchingInstrument
    })
  }
  // Sort it
  const emailSort = (a: UserInfo, b: UserInfo) => (a.accountEmail > b.accountEmail ? 1 : -1)
  const nameSort = (a: UserInfo, b: UserInfo) => {
    if (a.name == b.name) { // Sort by email if they have the same name
      return emailSort(a, b)
    }
    // If they have no name, sort them to the end
    if (!a.name) return 1
    if (!b.name) return -1
    return a.name > b.name ? 1 : -1
  }
  const graduationYearSort = (a: UserInfo, b: UserInfo) => {
    if (a.graduationYear == b.graduationYear) {
      return nameSort(a, b)
    }
    if (!a.graduationYear) return 1
    if (!b.graduationYear) return -1
    return a.graduationYear > b.graduationYear ? 1 : -1
  }

  switch (filters.value.sortBy) {
    case "accountEmail":
      filtered.sort(emailSort)
      break
    case "name":
      filtered.sort(nameSort)
      break
    case "graduationYear":
      filtered.sort(graduationYearSort)
      break
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
    allUsers = await User.allUsers()
    if (allUsers === null) {
      router.push("/")
    } else {
      // Remove anyone with basically zero helpful information
      allUsers = allUsers.filter((user) => user.name?.length || 
                                           user.rolesOfInterest?.length || 
                                           user.rolesToLearn?.length || 
                                           user.notes?.length)
    }
    return {
      Categories,
      InterestLevel,
      filters,
      filteredUsers,
      allUsers,
      sortBy,
      truncate
    }
  }
}
</script>