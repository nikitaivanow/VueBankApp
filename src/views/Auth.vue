<template>
  <form class="card" @submit.prevent="onSubmit">
    <h1>Войти в систему</h1>

    <div :class="['form-control', { invalid: eError }]">
      <label for="email">Email</label>
      <input type="email" id="email" v-model="email" />
      <small v-if="eError">{{ eError }}</small>
    </div>

    <div :class="['form-control', { invalid: pError }]">
      <label for="password">Пароль</label>
      <input type="password" id="password" v-model="password" />
      <small v-if="pError">{{ pError }}</small>
    </div>

    <button class="primary btn" type="submit" :disabled="isSubmitting || isTooManyAttempts">Войти</button>
    <span class="text-danger" v-if="isTooManyAttempts">Более трех попыток, попробуйте позже</span>
  </form>
</template>

<script>
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import {useLoginForm} from '../use/login-form'
import {error} from '../utils/error'

export default {
  setup() {
    const route = useRoute()
    const store = useStore()

    if (route.query.message){
      store.dispatch('setMessage', {
          value: error(route.query.message),
          type: 'warning'
        }, {root: true})
    }

    return {...useLoginForm()}
  }
};
</script>

<style lang="scss" scoped></style>
