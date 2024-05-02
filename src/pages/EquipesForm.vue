<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-table title="" :rows="equipesLista" :columns="columns" row-key="name">
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-sm">
            <q-btn icon="visibility"
            color="primary"
            dense size="sm"
            @click="handlePerfilDetalhes(props.row.id)"
            ></q-btn>
            <q-btn icon="edit"
             color="primary"
             dense size="sm"
             ></q-btn>
            <q-btn
              icon="delete"
              color="negative"
              dense
              size="sm"
              @click="handleDelete(props.row.id)"
             />
             <q-dialog v-model="basic" transition-show="rotate" transition-hide="rotate">
              <q-card>
                <q-card-section>
                  <div class="text-h6">Profissional Detalhes</div>
                </q-card-section>
                <q-card-section class="q-pt-none">
                  <p>Nome: {{ perfil.nome }}</p>
                  <p>Sobrenome: {{ perfil.sobreNome }}</p>
                  <p>Data de Nascimento: {{ perfil.dataNascimento }}</p>
                  <p>Gênero: {{ perfil.genero }}</p>
                  <p>Cidade: {{ perfil.cidade }}</p>
                  <p>Estado: {{ perfil.estado }}</p>
                  <p>País: {{ perfil.pais }}</p>
                </q-card-section>
                <q-card-actions align="right">
                  <q-btn flat label="Sair" color="primary" v-close-popup />
                </q-card-actions>
              </q-card>
            </q-dialog>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script setup>
import { api } from 'src/boot/axios'
import { onMounted, ref } from 'vue'
import { useQuasar } from 'quasar'
import postService from 'src/services/posts'

defineOptions({
  name: 'EquipesForm',
  data () {
    onMounted(() => {
      getEquipes()
    })
    const equipesLista = ref([])
    const perfil = ref([])
    const $q = useQuasar()
    const { getById } = postService()
    const columns = [
      { name: 'id', field: 'id', label: 'Id', align: 'left', sortable: true },
      { name: 'nome', field: 'nome', label: 'Nome', align: 'left', sortable: true },
      { name: 'actions', field: 'actions', label: 'Ações' }
    ]
    const getEquipes = async () => {
      const res = await api.get(
        'https://661c1c06e7b95ad7fa69b6e1.mockapi.io/pessoas'
      )
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
          const res = await api.delete(
            'https://661c1c06e7b95ad7fa69b6e1.mockapi.io/pessoas/' + id
          )
          console.log(res)
          await getEquipes()
          $q.notify({
            message: 'Excluido com sucesso!',
            color: 'green',
            icon: 'check'
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
    return {
      equipesLista,
      handleDelete,
      columns,
      basic: ref(false),
      fixed: ref(false),
      perfil,
      handlePerfilDetalhes
    }
  }
})
</script>

<style scoped>
.equipe-lista-container {
   margin: 20px 0;
   border: 1px solid #23367b;
   padding: 15px;
}
.q-btn {
  margin: 0 10px;
}
</style>
