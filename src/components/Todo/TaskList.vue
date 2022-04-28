<template>
  <v-list 
    class="pt-0"
  >
    <draggable
      v-model="tasks"
      handle=".handle"
      ghost-class="ghost"
    >
      <task
        v-for="task in tasks" 
        :key="task.id" 
        :task="task"
      />
    </draggable>  
  </v-list>
</template>

<script>
import Task from './Task.vue'
import draggable from 'vuedraggable'

export default {
  components:{
    "task": Task,
    'draggable' : draggable
  },
  computed:{
    tasks:{
      get(){
        return this.$store.getters.tasksFiltered
      },
      set(value){
        this.$store.dispatch('setTasks',value)
      }
    }
  }
}
</script>

<style lang="scss">
  .ghost{
    opacity: 0;
  }
</style>