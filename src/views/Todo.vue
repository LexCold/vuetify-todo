<template>
 <div>
    <task-list 
      v-if="$store.state.tasks.length"
    />
    <no-tasks
      v-else
    />
    <done-sorting-button
      v-if="$store.state.sorting"
    />
 </div>
</template>

<script>
  import TaskList from '@/components/Todo/TaskList.vue'
  import NoTasks from '@/components/Todo/NoTasks.vue'
  import DoneSortingButton from '@/components/Todo/DoneSortingButton.vue'

  export default {
    name: 'Todo',
    components:{
      'task-list': TaskList,
      'no-tasks': NoTasks,
      'done-sorting-button' : DoneSortingButton,
    },
  }
</script>

<style lang="scss">
  .noTasks{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    opacity: 50%;
  }
</style>