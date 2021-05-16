<template>
  <app-page back title="Помощь">
    <question-item
      v-for="q in question"
      :key="q.title"
      :question="q"
    ></question-item>
  </app-page>
</template>


<script>
  import AppPage from '../components/ui/AppPage'
  import QuestionItem from '../components/question/questionItem'

  export default{
    setup() {
      const question = [
        {title:'Что есть в данной системе?' , text:'Тут есть все, для того, чтобы смотреть заявки'},
        {title:'Как работает авторизация' , text:'Все реализованно через Firebase'}
      ]

      return {question}
    },
    components:{AppPage,QuestionItem}
  }

</script>