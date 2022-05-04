<template>
  <div 
    class="user-info"
  >
    <v-avatar
      size="70"
      color="primary"
      @click="$store.commit('toggleUserSettings')"
      class="user-info-picture"
    >
      <v-img 
        :src="file"
        v-if="file"
      />
      <span 
        class="white--text text-h4"
        v-if="!file"
      >
        {{nameInitials}}
      </span>
    </v-avatar>
    <div class="mt-2 subtitle-1 font-weight-bold">
      {{showName}}
    </div>
    <div class="subtitle-2">
      {{showUserName}}
    </div>
  </div>
</template>

<script>
export default {
  props:{
    name: String,
    username: String,
    file: null
  },
  computed:{
    nameInitials(){
      if(this.name){
        let names = this.name.split(' ', 2)
        if(names.length < 2){
          return `${names[0].slice(0,1)}`
        }
        else{
          let initials = names.map((element)=>element.slice(0,1)) 
          return `${initials[0]}${initials[1]}`
        }
      }
      else{
        return 'NU'
      }
    },
    showName(){
      if(this.name){
        return this.name
      }
      else{
        return "New User"
      }
    },
    showUserName(){
      if(this.username){
        return this.username
      }
      else{
        return "newuser"
      }
    },
  } 
}
</script>

<style lang="scss">
  .user-info{
    &-picture{
      cursor: pointer;
    }
  }
</style>>
  
</style>