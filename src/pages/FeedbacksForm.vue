<template>
  <q-page>
    <h6 align="center">Feedback</h6>
    <q-form class="row feedbacks-container" @submit="onSubmit">
      <div class="col-md-6 col-xs-6 col-12">
        <span>Selecione a pessoa</span>
        <q-input
        label=""
        v-model="form.assunto"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório!']"
        />
       </div>
        <div class="col-md-6 col-xs-6 col-12">
        <span>Assunto</span>
       <q-input
        label=""
        v-model="form.assunto"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório!']"
        />
      </div>
      <div class="col-md-12 col-xs-6 col-12 q-pa-md">
        <span>Deixe seu feedback</span>
        <q-input
          style="width: 100%"
          type="textarea"
          label=""
          v-model="form.mensagem"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório!']"
        />
      </div>
      <div class="col-12 q-gutter-sm">
        <q-btn class="float-right" color="primary">Salvar Rascunho</q-btn>
        <q-btn class="float-right" color="primary">Enviar</q-btn>
      </div>
    </q-form>
  </q-page>
</template>
<script setup>
import { ref } from 'vue'
defineOptions({
  name: 'FeedbacksForm',
  data () {
    const form = ref({
      pessoa: '',
      assunto: '',
      mensagem: ''
    })

    const onSubmit = async () => {
      console.log(form)
    }
    return {
      form,
      onSubmit,
      pessoa: '',
      opcoes: []
    }
  }
})
</script>

<style scoped>
.q-input {
  margin-left: 15px;
}
span {
  font-size: 24px;
  color: #504949;
  margin-left: 15px;
}
@media (max-width: 576px) {
  .q-btn {
    width: 100%;
  }
}
</style>
