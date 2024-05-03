<template>
  <q-page padding>
    <h5 align="center">Feedback</h5>
    <q-form class="row feedbacks-container" @submit="onSubmit">
      <div class="col-md-6 col-xs-6 col-12">
        <q-input
        outlined
        label="Selecione a pessoa"
        v-model="form.assunto"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório!']"
        />
      </div>
      <div class="col-md-6 col-xs-6 col-12">
       <q-input
        outlined
        label="Assunto"
        v-model="form.assunto"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório!']"
        />
      </div>
      <div class="col-md-6 col-xs-6 col-12 q-pa-md">
        <q-input
          outlined
          style="width: 100%"
          type="textarea"
          label="Deixe seu feedback"
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
h5, p {
  padding-left: 10px;
}

.q-input {
  margin: 0 10px;
}

.q-btn {
  border-radius: 10px;
}

@media (max-width: 576px) {
  .q-btn {
    width: 100%;
  }
}
</style>
