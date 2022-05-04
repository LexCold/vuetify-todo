<template>
  <v-app>

    <v-navigation-drawer 
      app 
      v-model="drawer"
    >
      <v-img
        src="beach.png"
        class="pa-6"
        dark
        height="190"
        gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
      >
        <user-profile
          :name="$store.state.userSettings.name"
          :username="$store.state.userSettings.username"
          :file="$store.state.userSettings.file"
        />
      </v-img>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.link"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    
    <v-app-bar
      color="primary"
      dark
      src="beach.png"
      app
      :height="$route.name === 'Todo'? '210' : '160'"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template>

      <v-container class="pa-0 ma-0 container fill-height">
        <v-row class="mt-1">
          <v-app-bar-nav-icon @click="drawer=!drawer"></v-app-bar-nav-icon>
          <v-spacer></v-spacer>
          <search-bar/>
        </v-row>
        <v-row class="mt-0 pt-0">
          <v-app-bar-title class="pl-3 text-h4">
            {{ $store.state.appTitle }}
          </v-app-bar-title>
        </v-row>
        <v-row class="mt-0 pt-0"> 
          <live-date-time/>
        </v-row>
        <v-row class="mt-0 pt-0">
          <add-task-input v-if="$route.name === 'Todo'"/>
        </v-row>
      </v-container>
      
    </v-app-bar>

    <v-main>
      <router-view/>
      <snackbar/>
    </v-main>

    <user-settings v-if="$store.state.showSettingsDialog"/>

  </v-app>
</template>

<script>
import Snackbar from '@/components/General/Snackbar.vue'
import SearchBar from  '@/components/Tools/SearchBar.vue'
import LiveDateTime from '@/components/Tools/LiveDateTime.vue'
import AddTaskInput from '@/components/Todo/AddTaskInput.vue'
import UserProfile from '@/components/General/UserProfile'
import UserSettings from '@/components/General/UserSettings'


export default {
  name: 'App',
  components:{
    "snackbar": Snackbar,
    "search-bar": SearchBar,
    "live-date-time": LiveDateTime,
    "add-task-input": AddTaskInput,
    "user-settings" : UserSettings,
    "user-profile" : UserProfile,
  },
  data: () => ({
    drawer: false,
    items: [
          { title: 'Todo', icon: 'mdi-format-list-checks', link: '/' },
          { title: 'About', icon: 'mdi-help-box', link: '/about' },
    ],
  }),
  mounted(){
    this.$store.dispatch('loadTasks')
    this.$store.dispatch('loadSettings')
  }
};
</script>

<style>
  .v-app-bar-title__content{
    width: fit-content !important;
  }
  .container{
    max-width: none !important;
  }
</style>
