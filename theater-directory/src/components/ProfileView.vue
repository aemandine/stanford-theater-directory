<template>
  <div class="profile">
    <div
      v-if="user"
    >
      <h2>{{ user.name }}</h2>
      <h3>{{ user.pronouns }}</h3>
      <h3>{{ user.accountEmail }}</h3>
      <h3>{{ user.affiliation }}</h3>
      <h3>Class of {{ user.graduationYear }}</h3>
      <div 
        class="chips"
        v-if="user.rolesOfInterest?.length"
        >
        <h2>They are interested in...</h2>
        <h3>Wondering what any of these roles are? Check out
          our <a href="/roles" target="_blank">role descriptions</a>!</h3>
        <v-chip 
          v-for="role in user.rolesOfInterest.sort()"
          class="mr-1 mb-1"
          color="green"
          >
          {{ role }}
        </v-chip>
      </div>
      <div 
        class="chips"
        v-if="user.rolesToLearn?.length"
        >
        <h2>They want to learn more about...</h2>
        <h3>Wondering what any of these roles are? Check out
          our <a href="/roles" target="_blank">role descriptions</a>!</h3>
        <v-chip 
          v-for="role in user.rolesToLearn.sort()"
          class="mr-1 mb-1"
          color="blue"
          >
          <i>{{ role }}</i>
        </v-chip>
      </div>
      <div 
        class="chips"
        v-if="user.waysToLearn?.length"
        >
        <h2>They like to learn about new roles via...</h2>
        <v-chip 
          v-for="style in user.waysToLearn.sort()"
          class="mr-1 mb-1"
          color="orange"
          >
          <i>{{ style }}</i>
        </v-chip>
      </div>
      <div 
        class="chips" 
        v-if="user.rolesOfInterest?.some(role => Categories.MUSICAL_ROLES.includes(role)) && user.instruments?.length"
      >
        <h2>They play the...</h2>
        <v-chip 
          v-for="instrument in user.instruments.sort()"
          class="mr-1 mb-1"
          color="purple"
          >
          <i>{{ instrument }}</i>
        </v-chip>
      </div>
      <h2>Previous theaterical experience and other notes</h2>
      <v-textarea 
        v-model="user.notes"
        hide-details
        readonly
      ></v-textarea>
      <h2 v-if="user.fallPlans || user.winterPlans || user.springPlans || user.summerPlans || user.otherPlans">Their 2023-2024 plans</h2>
      <h3 v-if="user.fallPlans"><b>Fall 2023:</b> {{ user.fallPlans }}</h3>
      <h3 v-if="user.winterPlans"><b>Winter 2024:</b> {{ user.winterPlans }}</h3>
      <h3 v-if="user.springPlans"><b>Spring 2024:</b> {{ user.springPlans }}</h3>
      <h3 v-if="user.summerPlans"><b>Summer 2024:</b> {{ user.summerPlans }}</h3>
      <h3 v-if="user.otherPlans"><b>Other:</b> {{ user.otherPlans }}</h3>
      <br/>
    </div>
    <p v-else>User not found.</p>
  </div>
</template>

<style scoped>
h1 {
  margin-bottom: 20px;
}
h2 {
  margin-top: 20px;
  margin-bottom: 10px;
}
h3 {
  margin-top: -10px;
  margin-bottom: 10px;
}
.profile {
  width: 700px;
}
.profile #inline {
  display: grid;
  grid-template-columns: 2fr 1fr;
  column-gap: 20px;
}
@media (max-width: 800px) {
  .profile {
    width: 100%;
  }
  h2, h3 {
    text-align: center;
  }
  .button {
    text-align: center;
  }
  .chips {
    text-align: center;
  }
}
</style>

<script lang="ts">
// Imports
import { User } from '@/helpers/user'
import Categories from '@/helpers/categories'

var user: User | null = null

export default {
  props: {
    userId: String
  },
  async setup(props) {
    if (props.userId) {
      user = await User.init(props.userId)
    }
    return {
      user,
      Categories
    }
  }
}
</script>