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
        <v-avatar
          size="70"
        >
          <v-icon size="70">mdi-account-circle</v-icon>
        </v-avatar>
        <div class="mt-2 subtitle-1 font-weight-bold">
          Name Lastname
        </div>
        <div class="subtitle-2">
          @user_name
        </div>
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

  </v-app>
</template>

<script>
import Snackbar from '@/components/General/Snackbar.vue'
import SearchBar from  '@/components/Tools/SearchBar.vue'
import LiveDateTime from '@/components/Tools/LiveDateTime.vue'
import AddTaskInput from '@/components/Todo/AddTaskInput.vue'


export default {
  name: 'App',
  components:{
    "snackbar": Snackbar,
    "search-bar": SearchBar,
    "live-date-time": LiveDateTime,
    'add-task-input': AddTaskInput,
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
