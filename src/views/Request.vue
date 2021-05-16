<template>
  <app-loader v-if="loading"></app-loader>
  <app-page title='Заявка' v-else-if="request" back>
    <p><strong>Имя владельца</strong>: {{request.fio}}</p>
    <p><strong>Телефон</strong>: {{request.phone}}</p>
    <p><strong>Сумма</strong>: {{currency(request.amount)}}</p>
    <p><strong>Статус</strong>: <app-status :type="request.status"></app-status> </p>

    <div class="form-control" >
      <label for="status">Статус</label>
      <select id="status" v-model="status">
        <option value="done">Завершен</option>
        <option value="cancelled">Отменен</option>
        <option value="active">Активен</option>
        <option value="pending">Выполняется</option>
      </select>
    </div>

    <button class="btn danger" @click="remove">Удалить</button>
    <button class="btn primary" @click="update" v-if="hasChanges">Изменить</button>
  </app-page>
  <h3 v-else class="text-center text-white">
    Заявки с ID = {{id}} нет.
  </h3>
</template>

<script>
import { useRoute,useRouter } from 'vue-router'
import {ref, onMounted,computed} from 'vue'
import AppLoader from '../components/ui/AppLoader'
import AppStatus from '../components/ui/AppStatus'
import AppPage from '../components/ui/AppPage'
import {currency} from '../utils/currency'

import { useStore } from 'vuex'
  export default {
    setup() {
      const route = useRoute()
      const router = useRouter()
      const store = useStore()
      const status = ref()
      const loading = ref(true)
      const request = ref({})

    onMounted(async()=> {

      request.value = await store.dispatch('request/loadOne', route.params.id)
      status.value = request.value?.status
      loading.value = false
    })

    const hasChanges = computed(() => request.value.status !== status.value)

    const remove = async () => {
      await store.dispatch('request/remove', route.params.id)
      router.push('/')
    }

    const update = async () => {
      const data = {...request.value,status: status.value, id: route.params.id}
      await store.dispatch('request/update', data)
      request.value.status = status.value
    }

      return{loading, request, id: route.params.id,currency,remove,update,status,hasChanges,router }
    },
    components: {AppPage,AppStatus,AppLoader }
  }
</script>

<style lang="scss" scoped>

</style>