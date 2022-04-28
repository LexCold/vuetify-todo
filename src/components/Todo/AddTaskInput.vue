<template>
  <v-text-field
      label="New task"
      outlined
      class="pa-2"
      clearable
      hide-details="auto"
      v-model="newTaskText"
      @keydown.enter="addTask"
  >
    <template v-slot:append>
      <v-icon
        @click="addTask"
        :disabled="!newTaskText"
      >
        mdi-plus
      </v-icon>
    </template>
  </v-text-field>
</template>

<script>
export default {
  data: () => ({
      newTaskText: "",      
  }),
  methods:{
    addTask(){
      if(this.newTaskText){
        this.$store.dispatch('addTask',this.newTaskText)
        this.newTaskText = null
      }
    },
  }
}
</script>

<style>

</style>