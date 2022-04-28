<template>
  <div>
    <v-menu
      bottom
      left
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          icon
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          @click="itemClick(i)"
        >
          <v-list-item-icon>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-icon>
          
          <v-list-item-title>
            {{ item.title }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    
    <edit-dialog
      v-if="dialogs.edit"
      :task="task"
      @close="dialogs.edit = false"
   />

   <due-date-dialog
      v-if="dialogs.dueDate"
      :task="task"
      @close="dialogs.dueDate = false"
   />

   <delete-dialog 
      v-if="dialogs.delete"
      :task="task"
      @close="dialogs.delete = false"
    />
  </div>
</template>

<script>
import EditDialog from './Dialogs/EditDialog.vue'
import DueDateDialog from './Dialogs/DueDateDialog.vue'
import DeleteDialog from './Dialogs/DeleteDialog.vue'


export default {
  components:{
    "edit-dialog" : EditDialog,
    "delete-dialog" : DeleteDialog,
    "due-date-dialog" : DueDateDialog,
  },
  props:{
    task: Object
  },
  data: ()=>({
    dialogs: {
      edit: false,
      dueDate: false, 
      delete: false
    },
    items: [
      { 
        title: 'Edit',
        icon: "mdi-pencil",
        action(){
          this.dialogs.edit = true
        } 
      },
      { 
        title: 'Due date',
        icon: "mdi-calendar",
        action(){
          this.dialogs.dueDate = true
        } 
      },
      { 
        title: 'Delete',
        icon: "mdi-delete",
        action(){
          this.dialogs.delete = true
        },
      },
      { 
        title: 'Sort',
        icon: "mdi-sort",
        action(){
          if(!this.$store.state.search){
            this.$store.commit('toggleSorting')
          }
          else{
            this.$store.commit('showSnackbar',"Can't sort while searching")
          }
        },
      },
    ],
  }),
  methods:{
    itemClick(i){
      let functionToCall = this.items[i].action
      functionToCall.call(this) 
    }

  }
}
</script>

<style>

</style>