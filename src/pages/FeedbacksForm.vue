<template>
  <q-page>
    <h6 align="center">Feedback</h6>
  </q-page>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { api } from 'src/boot/axios'
import { useRoute } from 'vue-router'
defineOptions({
  name: 'FeedbacksForm',
  data () {
    const competenciaDetalhes = ref()
    const form = ref({
      pessoa: '',
      assunto: '',
      mensagem: ''
    })

    const onSubmit = async () => {
      console.log(form)
    }

    const route = useRoute()
    onMounted(async () => {
      if (route.params.id) {
        getCompetenciaDetalhes(route.params.id)
      }
    })
    const getCompetenciaDetalhes = async (id) => {
      try {
        const response = await api.get('/teste/' + id)
        competenciaDetalhes.value = response.data
        console.log(competenciaDetalhes.value)
      } catch (error) {
        console.error(error)
      }
    }
    return {
      form,
      onSubmit,
      pessoa: '',
      opcoes: [],
      getCompetenciaDetalhes
    }
  }
})
</script>

<style scoped>
.q-input {
  margin-left: 15px;
}
span {
  font-size: 24px;
  color: #504949;
  margin-left: 15px;
}
@media (max-width: 576px) {
  .q-btn {
    width: 100%;
  }
}
</style>
