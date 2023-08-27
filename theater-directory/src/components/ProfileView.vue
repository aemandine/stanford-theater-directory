<template>
  <div class="profile">
    <div
      v-if="userInfo !== null"
    >
      <h2>{{ userInfo.name }}</h2>
      <h3>{{ userInfo.pronouns }}</h3>
      <h3>{{ userInfo.accountEmail }}</h3>
      <h3>Class of {{ userInfo.graduationYear }}</h3>
      <div 
        class="chips"
        v-if="userInfo.rolesOfInterest.length > 0"
        >
        <h2>They are interested in...</h2>
        <h3>Wondering what any of these roles are? Check out
          our <a href="/roles" target="_blank">role descriptions</a>!</h3>
        <v-chip 
          v-for="role in userInfo.rolesOfInterest.sort()"
          class="mr-1 mb-1"
          color="green"
          >
          {{ role }}
        </v-chip>
      </div>
      <div 
        class="chips"
        v-if="userInfo.rolesToLearn.length > 0"
        >
        <h2>They want to learn more about...</h2>
        <h3>Wondering what any of these roles are? Check out
          our <a href="/roles" target="_blank">role descriptions</a>!</h3>
        <v-chip 
          v-for="role in userInfo.rolesToLearn.sort()"
          class="mr-1 mb-1"
          color="blue"
          >
          <i>{{ role }}</i>
        </v-chip>
      </div>
      <div 
        class="chips"
        v-if="userInfo.waysToLearn.length > 0"
        >
        <h2>They like to learn about new roles via...</h2>
        <v-chip 
          v-for="style in userInfo.waysToLearn.sort()"
          class="mr-1 mb-1"
          color="orange"
          >
          <i>{{ style }}</i>
        </v-chip>
      </div>
      <div 
        class="chips" 
        v-if="Categories.MUSICAL_ROLES.some(r => userInfo!.rolesOfInterest.includes(r)) && userInfo.instruments.length > 0"
      >
        <h2>They play the...</h2>
        <v-chip 
          v-for="instrument in userInfo.instruments.sort()"
          class="mr-1 mb-1"
          color="purple"
          >
          <i>{{ instrument }}</i>
        </v-chip>
      </div>
      <h2>Previous theaterical experience and other notes</h2>
      <v-textarea 
        v-model="userInfo.notes"
        hide-details
        readonly
      ></v-textarea>
      <br/>
    </div>
    <p v-else>User not found.</p>
  </div>
</template>

<style scoped>
h1 {
  margin-bottom: 20px;
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
import { UserInfo } from '@/helpers/classes'
import Categories from '@/helpers/categories'
import { getUserInfo} from '@/helpers/api'

var userInfo: UserInfo | null = new UserInfo()

export default {
  props: {
    userId: String
  },
  async setup(props) {
    if (props.userId) {
      userInfo = await getUserInfo(props.userId)
    }
    return {
      userInfo,
      Categories
    }
  }
}
</script>