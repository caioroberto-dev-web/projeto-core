<template>
  <q-page padding>
    <h5 align="center">Competências Pessoais</h5>
    <div v-if="competencias == '' ">
      <p align="center">Nenhuma competencia registrada</p>
    </div>
    <div v-else class="tabela-competencias q-pa-md">
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
import { ref, onMounted } from 'vue'
import postService from 'src/services/postCompetencias'

defineOptions({
  name: 'competenciasPessoais',
  data () {
    const { postCompetencias, getCompetenciasById } = postService()
    const competencias = ref([])
    const form = ref({
      tipo: null,
      nivel: null,
      descricao: ''
    })

    onMounted(() => {
      getCompetencias()
    })

    const getCompetencias = async () => {
      const res = await getCompetenciasById()
      competencias.value = res
    }

    const onSubmit = async () => {
      await postCompetencias(form.value)
      getCompetencias()
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
      { name: 'nivel', label: 'Nível', field: 'nivel', align: 'left', sortable: true }
    ]

    return {
      form,
      onSubmit,
      tipo: '',
      opcoes: ['Desenvolvimento front-end', 'Desenvolvimento Back-end'],
      nivel: '',
      opcoes1: [
        '1 - Iniciante',
        '2 - Intermediário',
        '3 - Avançado',
        '4 - Experiênte',
        '5 - Especialista'
      ],
      competencias,
      columns
    }
  }
})
</script>

<style scoped>
.tabela-competencias {
  background-color: #333;
}

.competencias-container {
  border: 1px solid #333;
  padding: 15px;
  margin: 15px 0;
}

.q-select {
  margin: 10px;
}

@media (max-width: 576px) {
  .q-btn {
    width: 100%;
  }
}
</style>
