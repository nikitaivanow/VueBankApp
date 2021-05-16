import axios from 'axios'
import router from '../router'

const requestAxios = axios.create({
  baseURL: process.env.VUE_APP_FB_URL
})

requestAxios.interceptors.response.use(null, error =>{
  if(error.response === 401){
    router.push('/auth?message=auth')
  }

  return Promise.reject(reject)
})

export default requestAxios