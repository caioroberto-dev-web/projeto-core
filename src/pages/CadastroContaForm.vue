<template>
  <q-page padding>
        <img src="icons/leds.svg" alt="leds logo" />
        <p align="center" class="logotipo_1">
          CORE<span class="logotipo_2">-O</span>
        </p>
        <q-form @submit="handleLogin" class="row LoginContainer">
          <div class="col-md-6 col-xs-6 col-12">
            <label>Login</label>
            <q-input label="" v-model="form.email" />
          </div>
          <div class="col-md-6 col-xs-6 col-12">
            <label>Senha</label>
            <q-input class="col-md-6 col-xs-6 col-12" label="" v-model="form.senha" />
          </div>
          <div class="col-md-6 col-xs-6 col-12">
            <label>Confirma senha</label>
            <q-input class="col-md-6 col-xs-6 col-12" label="" v-model="form.confirmaSenha" />
          </div>
          <div class="col-md-6 col-xs-6 col-12" align="center">
            <q-btn color="green" type="submit">Cadastrar</q-btn>
          </div>
          <div align="center" class="q-mb-lg">
            <p class="col-md-6 col-xs-6 col-12 no-margin">Você já tem uma conta?</p>
            <a href="/">Clique aqui para entrar.</a>
          </div>
          <div align="center">
            <p class="col-md-6 col-xs-6 col-12 no-margin">Deseja fazer uma conta empresarial?</p>
            <a href="/">Saiba mais.</a>
          </div>
        </q-form>
  </q-page>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'CadastroContaForm',
  setup () {
    const form = ref({
      email: '',
      senha: '',
      confirmaSenha: ''
    })

    const handleLogin = async () => {
      try {
        console.log('cadastro:', form.value.email, form.value.senha, form.value.confirmaSenha)
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
  color: #0168B4;
}

@media (max-width: 576px) {
  .q-btn {
    border-radius: 10px;
    width: 100%;
  }
}
</style>
