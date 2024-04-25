<template>
  <q-page padding>
   <div class="row LoginContainer">
      <img src="icons/leds.svg" alt="logo">
      <div class="col-md-6 col-xs-6 col-12">
        <q-input label="Login" />
      </div>
      <div class="col-md-6 col-xs-6 col-12">
        <q-input label="Senha" />
        <small><a href="#">Esqueci minha senha</a></small>
      </div>
      <div class="col-md-6 col-xs-6 col-12">
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

.q-page {
  background-color:#d8e9f5;
}

.LoginContainer  {
  display: block;
  height: 525px;
}

img {
  display: block;
  height: 100px;
  margin: 115px auto 50px;
}

.col-md-6, .col-xs-6 {
  margin: 15px auto;
}

.q-btn {
  border-radius: 10px;
}

@media (max-width: 576px) {
  .q-btn {
    border-radius: 10px;
    width: 100%;
  }
}
</style>
