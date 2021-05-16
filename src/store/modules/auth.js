const TOKEN_KEY = 'jwt-token'
import {error} from '../../utils/error'
import axios from 'axios'

export default {
  namespaced : true,
  state(){
    return{
      token: localStorage.getItem(TOKEN_KEY)
    }
  },
  mutations: {
    setToken(state, token){
      state.token = token
      localStorage.setItem('jwt-token', token)
    },
    logout(state){
      state.token = null
      localStorage.removeItem(TOKEN_KEY)
    }
  },
  actions : {
    async login({ commit, dispatch }, payload){
      try {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_KEY}`
        const {data} = await axios.post(url, {...payload, returnSecureToken: true})
        commit('setToken', data.idToken)
        console.log(data)
     } catch (e) {
        dispatch('setMessage',{
          value: error(e.response.data.error.message),
          type: 'danger'
        }, {root: true})

        throw new Error()
      }


    }
  },
  getters:{
    token(state){
      return state.token
    },
    isAuthenticated(_, getters){
      return !!getters.token
    }
  }
}