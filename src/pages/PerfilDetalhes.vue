<template>
  <q-page class="container-perfil">
    <h6 align="center">Testando Perfil</h6>
    <div class="row">
      <div class="offset-4">
        <p>Nome: {{user.firstName}}</p>
        <p>Sobrenome: {{user.lastName}}</p>
        <p>Gênero: {{user.gender}}</p>
        <p>E-mail: {{user.email}}</p>
        <q-img :src="user.image" style="width: 300px"></q-img>
      </div>
      <q-btn class="offset-5 q-my-md" @click="logout()">Logout</q-btn>
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import { useQuasar } from 'quasar'

export default {
  name: 'PerfilDetalhes',
  setup () {
    const $q = useQuasar()
    const user = ref()

    user.value = $q.localStorage.getItem('user')

    const logout = async () => {
      localStorage.clear()
      location.replace('/')
    }
    return {
      user,
      logout
    }
  }
}
</script>

<style scoped>
.container-perfil {
  width: 80%;
  margin: 0 auto;
}
</style>
