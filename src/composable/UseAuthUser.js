import { api } from 'src/boot/axios'
import { ref } from 'vue'

const user = ref(null)

export default function useAuthUser () {
  const login = async ({ username, password }) => {
    const user = JSON.stringify(await api.post('/auth/login', { username, password }))
    localStorage.setItem('user', user)
    return user
  }
  const logout = async () => {}
  const isLoggedIn = async () => {
    return !!user.value
  }

  const register = async ({ email, senha, ...meta }) => {}

  const update = async (data) => {}

  const sendPasswordRestEmail = async () => {}

  return {
    login,
    logout,
    isLoggedIn,
    register,
    update,
    sendPasswordRestEmail
  }
}
