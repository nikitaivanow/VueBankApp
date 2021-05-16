<template>
  <app-loader v-if="loading"></app-loader>
  <app-page v-else title="Список заявок">
    <template #header>
      <button class="btn primary" @click="modal = true">
        Создать
      </button>
    </template>

    <request-filter v-model="filter"></request-filter>
    <request-table :requests="request"></request-table>

    <teleport to='body'>
      <app-modal v-if="modal" title="Создавть заявку" @close="close">
        <request-modal @created="modal = false"></request-modal>
      </app-modal>
    </teleport>

  </app-page>
</template>

<script>
import {ref, computed, onMounted, watch} from 'vue'
import AppPage from '../components/ui/AppPage'
import AppLoader from '../components/ui/AppLoader'
import RequestTable from '../components/request/RequestTable'
import RequestModal from '../components/request/RequestModal'
import RequestFilter from '../components/request/RequestFilter'
import AppModal from '../components/ui/AppModal'
import { useStore } from 'vuex'

export default {
  setup() {
    const modal = ref(false)
    const store = useStore()
    const loading = ref(false)
    const filter = ref({})

    onMounted(async () => {
      loading.value = true
      await store.dispatch('request/load')
      loading.value = false
    })

    const request = computed(() => store.getters['request/requests']
    .filter(request => {
      if (filter.value.name){
        return request.fio.includes(filter.value.name)
      }
      return request
    })
      .filter(request => {
        if(filter.value.status){
          return filter.value.status === request.status
        }
        return request
      })
    )

   


    return {
      modal,
      request,
      close: () => modal.value = false,
      loading,
      filter
    }
  },
  components: {AppPage,RequestTable,AppModal,RequestModal,AppLoader,RequestFilter}
}
</script>
