<template>
  <q-page padding>
    <h4 align="center">Equipes</h4>
    <div v-if="equipesLista != ''">
      <hr />
      <p v-for="equipe in equipesLista" :key="equipe.id">
        ID: {{ equipe.id }}
      </p>
      <p v-for="equipe in equipesLista" :key="equipe.id">
        Nome: {{ equipe.nome }}
      </p>
      <p v-for="equipe in equipesLista" :key="equipe.id">
        Sobrenome: {{ equipe.sobreNome }}
      </p>
      <p v-for="equipe in equipesLista" :key="equipe.id">
        Data de Nascimento: {{ equipe.dataNascimento }}
      </p>
      <p v-for="equipe in equipesLista" :key="equipe.id">
        Gênero: {{ equipe.genero }}
      </p>
      <p v-for="equipe in equipesLista" :key="equipe.id">
        Cidade: {{ equipe.cidade }}
      </p>
      <q-btn v-for="equipe in equipesLista" color="red" @click="handleDelete(equipe.id)" :key="equipe.id">Excluir</q-btn>
      <q-btn v-for="equipe in equipesLista" color="blue" :to="name='competenciasPessoais/' + equipe.id" :key="equipe.id">Competências Pessoais</q-btn>
      <q-btn v-for="equipe in equipesLista" color="blue" :to="name='competenciasProfissionais/' + equipe.id" :key="equipe.id">Competências Profissionais</q-btn>
      <hr />
    </div>
    <div v-else>
      <p align="center">Nenhuma equipe foi carregada...</p>
    </div>
  </q-page>
</template>

<script setup>
import { api } from 'src/boot/axios'
import { onMounted, ref } from 'vue'
import { useQuasar } from 'quasar'
defineOptions({
  name: 'EquipesForm',
  data () {
    onMounted(() => {
      getEquipes()
    })
    const equipesLista = ref()
    const $q = useQuasar()
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
    return {
      equipesLista,
      handleDelete
    }
  }
})
</script>

<style scoped>
.q-btn {
  margin: 0 10px;
}
</style>
