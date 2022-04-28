<template>
  <v-dialog
    ref="dialog"
    v-model="modal"
    :return-value.sync="date"
    persistent
    width="290px"
  >
    <v-date-picker
      v-model="date"
      scrollable
      :min="today"
    >
      <v-spacer></v-spacer>
      <v-btn
        text
        color="primary"
        @click="$emit('close')"
      >
        Cancel
      </v-btn>
      <v-btn
        text
        color="primary"
        @click="setDueDate"
      >
        OK
      </v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script>
export default {
  props:{
    task: Object
  },
  data () {
    return {
      modal: true,
      date: null,
      today: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    }
  },
  methods:{
    setDueDate(){
      let payload = {id: this.task.id, date: this.date}
      this.$store.dispatch('setDueDate',payload)
      this.$emit('close')
    }
  },
  mounted() {
    if(!this.task.dueDate){
      this.date = this.today
    }
    else{
      this.date = this.task.dueDate
    }
  }
}
</script>

<style>

</style>