<template>
  <q-page padding>
    <img src="icons/leds.svg" alt="leds logo" />
    <p align="center" class="logotipo_1">
      CORE<span class="logotipo_2">-O</span>
    </p>
    <q-form @submit="handleLogin" class="row LoginContainer">
      <div class="col-md-6 col-xs-6 col-12">
        <label>Login</label>
        <q-input label="" v-model="form.username" />
      </div>
      <div class="col-md-6 col-xs-6 col-12">
        <label>Senha</label>
        <q-input
          class="col-md-6 col-xs-6 col-12"
          label=""
          v-model="form.password"
        />
      </div>
      <div class="col-md-6 col-xs-6 col-12" align="center">
        <q-btn color="green" type="submit">Entrar</q-btn>
      </div>
      <div align="center" class="q-mb-lg">
        <p class="col-md-6 col-xs-6 col-12 no-margin">
          Ainda não tem uma conta?
        </p>
        <router-link to="/CadastroContaForm"
          >Faça seu cadastro aqui.</router-link
        >
      </div>
      <div align="center">
        <p class="col-md-6 col-xs-6 col-12 no-margin">
          Deseja fazer uma conta empresarial?
        </p>
        <a href="/">Saiba mais.</a>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import { api } from 'src/boot/axios'
import { useQuasar } from 'quasar'

export default {
  name: 'LoginForm',
  setup () {
    const $q = useQuasar()
    const form = ref({
      username: '',
      password: ''
    })

    const handleLogin = async () => {
      try {
        const res = await api.post(
          'https://dummyjson.com/auth/login',
          form.value,
          {
            body: JSON.stringify({
              username: 'kminchelle',
              password: '0lelplR',
              expiresInMins: 30 // optional, defaults to 60
            })
          }
        )
        $q.localStorage.set('user', res.data)
        location.replace('perfilDetalhes')
      } catch (error) {
        console.log(error.response.data.message)
      }
    }

    return {
      form,
      handleLogin
    }
  }
}
</script>

<style scoped>
.LoginContainer {
  width: 80%;
  display: block;
  margin: 0 auto;
}

img {
  display: block;
  height: 100px;
  margin: 20px auto;
}

.col-md-6,
.col-xs-6 {
  margin: 15px auto;
}

label {
  font-size: 24px;
  color: #504949;
}

a {
  color: #0168b4;
}

@media (max-width: 576px) {
  .q-btn {
    border-radius: 10px;
    width: 100%;
  }
}
</style>
