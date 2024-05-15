<template>
  <q-page class="q-pa-md">
    <q-table
      title=""
      :rows="equipesLista"
      :columns="columns"
      row-key="name"
      :filter="filter"
    >
      <template v-slot:top-right>
        <q-input
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="q-gutter-sm">
          <q-btn icon="edit"
           color="primary"
           dense size="sm"
           @click="getProfissionalById(props.row.id)"
           ></q-btn></q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { onMounted, ref } from 'vue'
import postService from 'src/services/posts'

const columns = [
  {
    name: 'nome',
    align: 'center',
    label: 'Nome',
    field: 'nome',
    sortable: true
  },
  {
    name: 'id',
    align: 'center',
    label: 'Id',
    field: 'id',
    sortable: true
  },
  { name: 'actions', field: 'actions', label: 'Visualização' }
]

const { getAll, getById } = postService()
const equipesLista = ref([])
export default {
  name: 'CompetenciasForm',
  setup () {
    onMounted(() => {
      getProfissionais()
    })
    const getProfissionais = async () => {
      const res = await getAll()
      equipesLista.value = res.data
      console.log(equipesLista)
    }
    const getProfissionalById = async (id) => {
      const res = await getById(id)
      console.log(res)
    }
    return {
      filter: ref(''),
      columns,
      equipesLista,
      getProfissionalById
    }
  }
}
</script>
