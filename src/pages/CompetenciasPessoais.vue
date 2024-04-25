<template>
  <q-page padding>
    <h5 align="center">Competências Pessoais</h5>
    <q-form class="row competencias-pessoais-container" @submit="onSubmit">
      <div class="col-md-6 col-xs-6 col-12">
        <q-select
          outlined
          v-model="form.tipo"
          options-dense
          options-dark
          emit-value
          map-options
          use-input
          use-chips
          hide-dropdown-icon
          input-debounce="0"
          :options="opcoes"
          label="Informe o tipo"
        />
      </div>
      <div class="col-md-6 col-xs-6 col-12">
        <q-select
          outlined
          v-model="form.nivel"
          options-dense
          options-dark
          emit-value
          map-options
          use-input
          use-chips
          hide-dropdown-icon
          input-debounce="0"
          :options="opcoes1"
          label="Informe o nível"
        />
      </div>
      <div class="col-md-6 col-xs-6 col-12 q-pa-md">
        <q-input
          outlined
          style="width: 100%"
          type="textarea"
          label="Descrição"
          v-model="form.descricao"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório!']"
        />
      </div>
      <div class="col-12">
        <q-btn class="float-right" color="primary">Salvar</q-btn>
      </div>
    </q-form>
  </q-page>
</template>
<script setup>

import { ref } from 'vue'

defineOptions({
  name: 'competenciasPessoais',
  data () {
    const form = ref({
      tipo: '',
      nivel: '',
      descricao: ''
    })

    const onSubmit = async () => {
      console.log(form)
    }

    return {
      form,
      onSubmit,
      tipo: '',
      opcoes: ['Desenvolvimento front-end', 'Desenvolvimento Back-end'],
      nivel: '',
      opcoes1: ['1 - Iniciante', '2 - Intermediário', '3 - Avançado', '4 - Experiênte', '5 - Especialista']
    }
  }
})
</script>

<style scoped>
.q-select {
  margin: 0 10px
}

@media (max-width: 576px) {
  .q-btn {
    width: 100%
  }
}
</style>
