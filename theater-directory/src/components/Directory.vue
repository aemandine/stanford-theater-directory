<template>
  <div class="directory">
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
        class="mx-4 my-2"
        hide-details
      ></v-autocomplete>
    </div>
    <div>
      <v-divider></v-divider>
      <DirectoryRow v-if="filteredUsers.length > 0" is-header>
        <template #name>Name</template>
        <template #interest v-if="filters.role">Interest Level</template>
        <template #graduationYear>Graduating</template>
        <template #email>Email</template>
      </DirectoryRow>
      <h3 v-else>No users satisfy that query, sorry!</h3>
    </div>
    <v-virtual-scroll
      :height="300"
      :items="filteredUsers"
    >
      <template v-slot:default="{ item }">
        <DirectoryRow>
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
              Wants to Learn
            </v-chip>
          </template>
          <template #graduationYear>{{ item.graduationYear }}</template>
          <template #email>{{ item.accountEmail }}</template>
        </DirectoryRow>
      </template>
    </v-virtual-scroll>
  </div>
</template>

<style scoped>
.search {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-bottom: 20px;
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
import { UserInfo, Filters, InterestLevel } from '@/mixins/classes'
import Login from '@/components/Login.vue'
import DirectoryRow from '@/components/DirectoryRow.vue'
import Categories from '@/mixins/categories'

// Refs
const filters = ref(new Filters())

// Functions
const getUsers = async() => {
  try {
    const { allUsers } = await (await fetch(`/api/users`)).json()
    return allUsers
  } catch {
    return []
  }
}

export default {
  props: {
    userId: String
  },
  components: {
    Login, DirectoryRow
  },
  async setup(props) {
    const allUsers: UserInfo[] = await getUsers()
    //const allUsers = [ { "id": "0f1a255c-31e9-48c7-9b9e-f713718f085f", "name": "Anna Mist", "graduationYear": 2024, "accountEmail": "amist@stanford.edu", "waysToLearn": [], "personalEmail": "amist@gmail.com", "rolesOfInterest": [ "Producer", "Actor", "Writer", "Deviser", "Run Crew", "Orchestra" ], "rolesToLearn": [ "Intimacy Director", "Actor", "Board Operator", "Hair and Makeup" ], "instruments": [ "Cymbals" ], "notes": "Nothing!" }, { "id": "992b22ca-2c91-4cc7-983d-c61f86c00e59", "name": "Jayda A", "graduationYear": 2024, "accountEmail": "jayda@stanford.edu", "waysToLearn": [], "personalEmail": "jayda@gmail.com", "rolesOfInterest": [ "Director", "Actor" ], "rolesToLearn": [ "Intimacy Director", "Board Operator", "Hair and Makeup" ], "instruments": [ "Cymbals" ], "notes": "Nothing!" } ]      
    const filteredUsers = computed(() => {
      if (filters.value.isEmpty()) {
        return allUsers
      }
      return allUsers.filter((userInfo: UserInfo) => {
        const newFilters = filters.value

        // If we want someone who is interested and they are
        if (newFilters.interestLevels.includes(InterestLevel.Interested) && userInfo.rolesOfInterest.includes(newFilters.role)) {
          return true
        }
        // If we want someone who wants to learn and they do
        if (newFilters.interestLevels.includes(InterestLevel.WantToLearn) && userInfo.rolesToLearn.includes(newFilters.role)) {
          return true
        }
        return false
      })
    })
    return {
      Categories,
      InterestLevel,
      filters,
      filteredUsers,
      allUsers
    }
  }
}
</script>