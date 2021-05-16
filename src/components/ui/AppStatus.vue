<template>
 <span :class="['badge', className]">{{text}}</span>
</template>

<script>
import {ref , watch} from 'vue'
  export default {
    props: {
    type: {
      type: String,
      required: true,
      validator(value){
        return ['active','cancelled','done','pending'].includes(value)
       }
      }
    },
    setup(props) {

      const classesMap = {
        active: 'primary',
        cancelled: 'danger',
        done: 'primary',
        pending: 'warning'
      }

      const textMap = {
        active: 'Активен',
        cancelled: 'Отменен',
        done: 'Завершен',
        pending: 'Выполняется'
        }

      const className = ref(classesMap[props.type])
      const text = ref(textMap[props.type])


      watch(props, val => {
        className.value = classesMap[props.type]
        text.value = textMap[props.type]
      })

      return {
        className,
        text
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>