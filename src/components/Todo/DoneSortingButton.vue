<template>
  <v-btn
    class="done-sorting-button"
    color="primary"
    @click="$store.commit('toggleSorting')"
  >
      Done Sorting
  </v-btn>
</template>

<script>
export default {

}
</script>

<style lang="scss">
  .done-sorting-button{
    position: fixed;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
  }
</style>