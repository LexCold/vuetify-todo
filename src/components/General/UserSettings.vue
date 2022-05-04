<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12"> 
                <v-avatar
                  size="70"
                  class="picture"
                  color="primary"
                  @click="pictureChange"
                >
                  <v-img 
                    :src="file"
                    v-if="file"
                  />
                  <span 
                    class="white--text text-h4"
                    v-if="!file"
                  >
                    U
                  </span>
                  <input 
                    type="file" 
                    class="inputPicture"
                    @change="onFileInputChange"
                  />
                </v-avatar>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Name"
                  v-model="name"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Username"
                  v-model="username"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="$store.commit('toggleUserSettings')"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="saveSettings"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data(){
    return {
      dialog: true,
      name: null,
      username: null,
      file: null,
    }
  },
  methods:{
    pictureChange(){
      let inputPicture = document.querySelector('.inputPicture')
      inputPicture.click()
    },
    onFileInputChange(e){
      if(!e.target.files || !e.target.files[0]) return
      let file = e.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (e)=>{
        this.file = e.target.result
      }
    },
    saveSettings(){
      let settings = {name: this.name, username: this.username, file: this.file} 
      this.$store.dispatch('saveSettings', settings)
      this.$store.commit('toggleUserSettings')
    } 
  },
  mounted(){
    this.name = this.$store.state.userSettings.name
    this.username = this.$store.state.userSettings.username
    this.file = this.$store.state.userSettings.file
  }
}
</script>

<style lang="scss">
  .picture{
    cursor: pointer;

    .inputPicture{
      display: none;
    }
  }
</style>>

