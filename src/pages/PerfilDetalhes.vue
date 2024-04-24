<template>
  <q-page>
   <div class="row">
    <div class="col-12">
      <img class="perfilFoto" :src="perfil.midia" alt="">
       <q-btn class="float-right" color="primary" @click="handleMinhasCompetencias(perfil.id)">Minhas competências</q-btn>
    </div>
    <div class="perfilContainer row col-12">
      <div class="col-md-4 col-12">
        <span>Nome</span>
        <p>{{perfil.nomeCompleto}}</p>
      </div>
      <div class="col-md-4 col-12">
        <span>E-mail</span>
        <p>{{perfil.email}}</p>
      </div>
      <div class="col-md-4 col-12">
        <span>Curso</span>
        <p>{{perfil.curso}}</p>
      </div>
      <div class="col-md-4 col-12">
        <span>Formação</span>
        <p>{{perfil.formacao}}</p>
      </div>
    </div>
   </div>
  </q-page>
</template>

<script>
import postService from 'src/services/posts'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'

export default {
  name: 'PerfilDetalhes',
  setup () {
    const perfil = ref({})
    const { getById } = postService()
    const route = useRoute()
    const router = useRouter()
    onMounted(async () => {
      if (route.params.id) {
        getPerfil(route.params.id)
      }
    })
    const getPerfil = async (id) => {
      try {
        const response = await getById(id)
        perfil.value = response
      } catch (error) {
        console.error(error)
      }
    }

    const handleMinhasCompetencias = async (id) => {
      router.push({ name: 'minhasCompetencias', params: { id } })
    }

    return { perfil, handleMinhasCompetencias }
  }
}
</script>

<style scoped>
  .perfilFoto {
   height: 200px;
   display: block;
   margin: 20px auto;
   border-radius: 10px;
  }

  .q-btn {
    margin: 0 15px 15px 0;
  }

  .perfilContainer {
    height: 300px;
    background-color: #ccc;
    padding: 15px;
  }
  span {
   font-weight: bold;
  }
</style>
