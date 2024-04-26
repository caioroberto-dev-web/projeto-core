<template>
  <q-page padding>
    <h5 align="center">Competências Profissionais</h5>
    <div v-if="competencias == ''">
      <p align="center">Nenhuma competencia registrada</p>
    </div>
    <div v-else class="q-pa-md">
      <q-table
        title="Competências registradas"
        :rows="competencias"
        :columns="columns"
        row-key="name"
      />
    </div>
    <q-form class="row" @submit="onSubmit">
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
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório!']"
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
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório!']"
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
        <q-btn class="float-right" type="submit" color="primary">Salvar</q-btn>
      </div>
    </q-form>
  </q-page>
</template>
<script setup>
import { ref } from 'vue'

defineOptions({
  name: 'competenciasProfissionais',
  data () {
    const competencias = ref([])
    const form = ref({
      tipo: null,
      nivel: null,
      descricao: ''
    })

    const onSubmit = async () => {
      console.log(form.value)
    }

    const columns = [
      {
        name: 'tipo',
        label: 'Tipo de competências',
        field: 'tipo',
        align: 'left',
        sortable: true
      },
      { name: 'nivel', label: 'Nível', align: 'left', field: 'nivel' }
    ]

    return {
      form,
      onSubmit,
      tipo: '',
      opcoes: ['Analista de Dados', 'Gerenciamento de Redes', 'Análise de Dados', 'Cloud Computing'],
      nivel: '',
      opcoes1: ['1 - Iniciante', '2 - Intermediário', '3 - Avançado', '4 - Experiênte', '5 - Especialista'],
      competencias,
      columns
    }
  }
})
</script>

<style scoped>
.q-select {
  margin: 10px;
}

@media (max-width: 576px) {
  .q-btn {
    width: 100%;
  }
}
</style>
