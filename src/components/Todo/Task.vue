<template>
  <div>
    
    <v-list-item
      @click="doneTask(task.id)"
      :class="{'blue lighten-5' : task.done}"
      :ripple="false"
    >
      <template v-slot:default>
        
        <v-list-item-action>
          <v-checkbox :input-value="task.done"></v-checkbox>
        </v-list-item-action>

        <v-list-item-content 
          :class="{'text-decoration-line-through': task.done}"
        >
          <v-list-item-title>{{task.text}}</v-list-item-title>
        </v-list-item-content>
        
        <v-list-item-action
          v-if="task.dueDate"
        >
          <v-list-item-action-text>
            <v-icon small>mdi-calendar</v-icon>
            {{ task.dueDate | dateFormatted }}
          </v-list-item-action-text>
        </v-list-item-action>

        <v-list-item-action>
          <task-menu :task="task"/>
        </v-list-item-action>

        <v-list-item-action v-if="$store.state.sorting" class="handle">
          <v-icon>
            mdi-drag
          </v-icon>
        </v-list-item-action>

      </template>
    </v-list-item>
    <v-divider></v-divider>

  </div>
</template>

<script>

import TaskMenu from './TaskMenu.vue'

export default {
  components:{ 
    "task-menu" : TaskMenu
  },
  props:{
    task: Object
  },
  filters:{
    dateFormatted(value){
      let date = new Date(value)
      date = `${date.toString().substring(4,7)} ${date.getDate()+1}`
      return date
    }
  },
  methods:{   
    doneTask(id){
      this.$store.dispatch('doneTask',id)
    },
  }
}
</script>

<style>

</style>