<template>
  <q-page padding>
   <div class="row LoginContainer">
      <img src="icons/leds.svg" alt="leds logo">
      <p align="center" class="logotipo_1">CORE<span class="logotipo_2">-O</span></p>
        <div class="col-md-6 col-xs-6 col-12">
          <label>Login</label>
          <q-input  label="" />
        </div>
        <div class="col-md-6 col-xs-6 col-12">
          <label>Senha</label>
          <q-input class="col-md-6 col-xs-6 col-12" label="" />
        </div>
      <div align="center">
          <a class="col-md-6 col-xs-6 col-12" href="#" >Esqueci minha senha</a>
      </div>
      <div class="col-md-6 col-xs-6 col-12" align="center">
        <q-btn color="primary">Entrar</q-btn>
      </div>
   </div>
  </q-page>
</template>

<script>
export default {
  name: 'LoginForm',
  setup () {
  }
}
</script>

<style scoped>
.LoginContainer  {
  width: 80%;
  display: block;
  margin: 0 auto;
}

img {
  display: block;
  height: 100px;
  margin: 20px auto;
}

.col-md-6, .col-xs-6 {
  margin: 15px auto;
}

label {
  font-size: 24px;
  color: #504949;
}

@media (max-width: 576px) {
  .q-btn {
    border-radius: 10px;
    width: 100%;
  }
}
</style>
