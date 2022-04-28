<template>
  <div class="subtitle-2 ml-3">
    {{ time }}
  </div>
</template>

<script>
export default {
  data(){
    return{
      time : null
    }
  },
  methods:{
    setTime(){
      let date = new Date
      this.time = `${date.toString().substring(0,10)}, ${date.toString().substring(15,24)} `
       setTimeout(this.setTime,1000)
    }
  },
  mounted(){
    this.setTime()
  }
}
</script>

<style>

</style>