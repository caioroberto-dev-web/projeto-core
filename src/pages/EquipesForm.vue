<template>
  <q-page padding>
    <div v-if="equipesLista == null">
      <h6 align="center">Carregando...</h6>
      <q-ajax-bar :hijack-filter="myFilterFn" />
    </div>
    <div v-else-if="equipesLista == ''">
      <h6 align="center">Nenhum profissional encontrado!</h6>
      <q-ajax-bar :hijack-filter="myFilterFn" />
    </div>
    <div v-else>
      <h6 align="center">Equipes</h6>
      <table class="equipes-container">
        <thead>
          <th align="start">Nome</th>
          <th>Visualizar</th>
          <th>Editar</th>
          <th>Excluir</th>
        </thead>
        <tbody>
          <tr v-for="equipe in equipesLista" :key="equipe.id">
            <td>{{ equipe.nome }}</td>
            <td class="acoes-btn">
              <q-btn
                icon="visibility"
                @click="showLoading"
                color="primary"
                dense
                size="sm"
                :to="(name = 'perfilDetalhes/' + equipe.id)"
              >
              </q-btn>
            </td>
            <td class="acoes-btn">
              <q-btn
                icon="edit"
                color="primary"
                dense
                size="sm"
                :to="(name = 'perfilDetalhes/' + equipe.id)"
              >
              </q-btn>
            </td>
            <td class="acoes-btn">
              <q-btn
                icon="delete"
                color="negative"
                dense
                size="sm"
                @click="handleDelete(equipe.id)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useQuasar } from 'quasar'
import postService from 'src/services/posts'

defineOptions({
  name: 'EquipesForm',
  data () {
    onMounted(() => {
      getEquipes()
    })
    const equipesLista = ref()
    const perfil = ref()
    const $q = useQuasar()
    const { getById, getAll, remove } = postService()
    $q.loadingBar.start()
    $q.loadingBar.stop()
    const getEquipes = async () => {
      const res = await getAll()
      equipesLista.value = res.data
    }
    const handleDelete = async (id) => {
      try {
        $q.dialog({
          title: 'Alerta!',
          message: 'Deseja deletar este item?',
          cancel: true,
          persistent: true
        }).onOk(async () => {
          const res = await remove(id)
          console.log(res)
          await getEquipes()
          $q.notify({
            message: 'Excluido com sucesso!',
            color: 'green',
            icon: 'delete'
          })
        })
      } catch (error) {
        console.error(error)
        $q.notify({
          message: 'Houve um erro ao realizar a requisição no servidor!',
          color: 'red'
        })
      }
    }
    const handlePerfilDetalhes = async (id) => {
      getPerfil(id)
      this.basic = true
    }
    const getPerfil = async (id) => {
      try {
        const response = await getById(id)
        perfil.value = response
      } catch (error) {
        console.error(error)
      }
    }

    $q.loadingBar.setDefaults({
      color: 'red',
      size: '50px',
      position: 'top'
    })
    return {
      equipesLista,
      handleDelete,
      perfil: {},
      handlePerfilDetalhes,
      myFilterFn (equipesLista) {
        // example (only https://my-service.com/* should trigger)
        return /^https:\/\/my-service\.com/.test(equipesLista)
      }
    }
  }
})
</script>

<style scoped>
.equipes-container {
  width: 60%;
  margin: 0 auto;
}
table td:first-child {
  width: 80%;
  font-size: 24px;
  color: #504949;
}

.acoes-btn {
  padding: 20px;
}

@media (max-width: 768px) {
  table {
    width: 100%;
  }
}
</style>
