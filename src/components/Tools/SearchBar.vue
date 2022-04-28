<template>
  <v-text-field
    dense
    clearable
    filled
    hide-details="auto"
    placeholder="Search"
    prepend-inner-icon="mdi-magnify"
    class="pt-1 search"
    :class="{'collapsed' : collapsed && !$store.state.search}"
    @focus="collapsed = false"
    @blur="collapsed = true"
    @input="$store.commit('setSearch', $event)"
    :value="$store.state.search"
    :disabled="$store.state.sorting"
  >
  </v-text-field>
</template>

<script>
export default {
  data(){
    return{
      collapsed: true,
    }
  }
}
</script>

<style lang="scss">
  .search{
    transition: max-width 0.3s;
    .v-input__slot{
      &::before{
        display: none !important;
      }
      &::after{
        display: none !important;
      }
      .v-input__prepend-inner{
        cursor: pointer;
      }
    }
    &.collapsed{
        max-width: 45px !important;
        .v-input__slot{
          background: transparent !important;
        }
    }
  }

  

</style>

