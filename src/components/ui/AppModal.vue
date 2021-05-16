<template>
<div>
  <div class="modal-backdrop" @click="$emit('close')"></div>
    <div class="modal">
      <h3>{{title}}</h3>

      <slot/>
    </div>
  </div>
</template>

<script>
  export default {
    emits:['close'],
    props: {
      title: {
        type: String
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>