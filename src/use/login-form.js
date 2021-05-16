import * as yup from "yup";
import { useField, useForm} from "vee-validate";
import {computed, watch} from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'

export function useLoginForm(){
    const store = useStore();
    const router = useRouter()

    const {handleSubmit, isSubmitting, submitCount} = useForm()

    const { value: email, errorMessage: eError, handleBlur: eBlur } = useField(
      "email",
      yup
        .string()
        .trim()
        .required('Пожалуйста введите email')
        .email('Некоректный email')
    );
    const {value: password, errorMessage: pError, handleBlur: pBlur} = useField(
      "password",
      yup
        .string()
        .trim()
        .required('Пожалуйста введите пароль')
        .min(6, 'Пароль не может быть меньше шести символов')
    );

    const isTooManyAttempts = computed(()=> submitCount.value >= 3)

    watch(isTooManyAttempts, val => {
        if (val)
            setTimeout(() => submitCount.value = 0, 1500)
    })

    const onSubmit = handleSubmit(async values => {
      try {
        await store.dispatch('auth/login', values)
        router.push('/')
     } catch (e) {

      }

    })

    return {
      email,
      eError,
      eBlur,
      password,
      pError,
      pBlur,
      onSubmit,
      isSubmitting,
      isTooManyAttempts
  }
}
