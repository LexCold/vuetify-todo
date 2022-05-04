import Vue from 'vue'
import Vuex from 'vuex'
import Localbase from 'localbase'

Vue.use(Vuex)

let db = new Localbase('db')


export default new Vuex.Store({
  state: {
    showSettingsDialog : false,
    userSettings: {
      name: '',
      username: '',
      file: null
    },
    appTitle: process.env.VUE_APP_TITLE,
    search: null,
    sorting: false,
    tasks:[
      // {
      //   id: 1, 
      //   text: 'Wake up', 
      //   done: false,
      //   dueDate: null
      // },
      // {
      //   id: 2, 
      //   text: 'Brush teeth', 
      //   done: false,
      //   dueDate: null
      // },
      // {
      //   id: 3, 
      //   text: 'Eat breakfast', 
      //   done: false,
      //   dueDate: null
      // },
    ],
    snackbar:{
      show: false,
      text: ""
    }
  },
  mutations: {
    loadTasks(state, tasks){
      state.tasks = tasks
    },
    setSearch(state,value){
      state.search = value
    },
    addTask(state,newTask){
      state.tasks.push(newTask)
    },
    deleteTask(state,id){
      state.tasks = state.tasks.filter(task => task.id !== id)
    },
    doneTask(state,task){
      task.done = !task.done
    },
    editTask(state,{id, text}){
      let task = state.tasks.filter(task => task.id === id)[0]
      task.text = text
    },
    setTasks(state,tasks){
      state.tasks = tasks
    },
    setDueDate(state, {id, date}){
      let task = state.tasks.filter(task => task.id === id)[0]
      task.dueDate = date
    },
    showSnackbar(state, text){
      let timeout = 0;
      if(state.snackbar.show){
        state.snackbar.show = false
        timeout = 300
      }
      setTimeout(()=>{
        state.snackbar.text = text
        state.snackbar.show = true
      },timeout)
    },
    hideSnackbar(state){
      state.snackbar.show = false
    },
    toggleSorting(state){
      state.sorting = !state.sorting
    },
    toggleUserSettings(state){
      state.showSettingsDialog = !state.showSettingsDialog
    },
    saveSettings(state, {name,username,file}){
      state.userSettings.name = name
      state.userSettings.username = username
      state.userSettings.file = file
    },
    loadSettings(state, settings){
      state.userSettings = settings
    },
  },
  actions: {
    loadTasks(context){
      db.collection('tasks').get().then(tasks => {
        context.commit('loadTasks', tasks)
      })
    },
    addTask(context,newTaskText){
      let newTask = {id: Date.now(), text: newTaskText, done: false, dueDate: null}
      db.collection('tasks').add(newTask).then(()=>{
        context.commit('addTask', newTask)
        context.commit('showSnackbar','Task added!')
      })     
    },
    deleteTask(context,id){
      db.collection('tasks').doc({ id: id }).delete().then(()=>{
        context.commit('deleteTask',id)
        context.commit('showSnackbar','Task deleted!')
      })
    },
    doneTask(context,id){
      let task = context.state.tasks.filter(task => task.id === id)[0]
      db.collection('tasks').doc({ id: id }).update({
        done: !task.done
      }).then(()=>{
        context.commit('doneTask',task)
      })
    },
    editTask(context,{id, text}){
      db.collection('tasks').doc({ id: id }).update({
        text: text
      }).then(()=>{
        context.commit('editTask',{id, text})
        context.commit('showSnackbar','Task edited!')
      })
    },
    setTasks(context,tasks){
      db.collection('tasks').set(tasks).then(()=>{
        context.commit('setTasks', tasks)
      })
    },
    setDueDate(context,{id, date}){
      db.collection('tasks').doc({ id: id }).update({
        dueDate: date
      }).then(()=>{
        context.commit('setDueDate',{id, date})
        context.commit('showSnackbar','Due date updated!')
      })
    },
    saveSettings(context, settings){
      db.collection('settings').set([settings]).then(()=>{
        context.commit('saveSettings', settings)
      })
    },
    loadSettings(context){
      db.collection('settings').get().then(settings => {
        context.commit('loadSettings', ...settings)
      })
    }
  },
  getters: {
    tasksFiltered(state){
      if(!state.search){
        return state.tasks
      }
      else{
        const key = new RegExp(state.search,'i')
        return state.tasks.filter(task => 
        key.test(task.text))
      }
    }
  }
})

