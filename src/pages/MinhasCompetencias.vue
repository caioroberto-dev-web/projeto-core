<template>
  <q-page>
    <div class="row">
     <div class="col-12">
       <img class="perfilFoto" :src="perfilDetalhes.midia" alt="">
       <div class="competenciasContainer row col-12">
        <h1>Em construção...</h1>
       </div>
     </div>
    </div>
   </q-page>
</template>

<script>
import postService from 'src/services/posts'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'MinhasCompetencias',
  setup () {
    const { getById } = postService()
    const perfilDetalhes = ref({})
    const route = useRoute()
    onMounted(async () => {
      if (route.params.id) {
        getPerfilDetalhes(route.params.id)
      }
    })
    const getPerfilDetalhes = async (id) => {
      try {
        const response = await getById(id)
        perfilDetalhes.value = response
      } catch (error) {
        console.error(error)
      }
    }
    return { perfilDetalhes }
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

  .competenciasContainer {
    height: 300px;
    background-color: #ccc;
    padding: 15px;
  }
  span {
   font-weight: bold;
  }
</style>
