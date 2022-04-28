<template>
  <v-dialog
    v-model="dialog"
    max-width="290"
    persistent
  >
    <v-card>
      <v-card-title class="text-h5">
        Edit task
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="newText"
          label="Edit the title of this task"
          required
          @keydown.enter="done"
        ></v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          text
          @click="$emit('close')"
        >
          Cancel
        </v-btn>

        <v-btn
          color="red"
          text
          @click="done"
          :disabled="invalidText"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props:{
    task: Object
  },
  data () {
    return {
      dialog: true,
      newText: this.task.text
    }
  },
  computed:{
    invalidText(){
      return this.newText === this.task.text || !this.newText
    }
  },
  methods:{
    done(){
      if(!this.invalidText){
        let payload = {id: this.task.id, text: this.newText}
        this.$store.dispatch('editTask',payload)
        this.$emit('close')
      }
    }
  }
}
</script>

<style>

</style>