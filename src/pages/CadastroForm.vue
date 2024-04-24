<template>
  <q-page padding class="form-cadastro-container">
    <h6 align="center">Formulário de cadastro</h6>
    <q-form class="form-cadastro row q-col-gutter-sm" @submit="onSubmit">
      <q-input
        class="col-md-6 col-xl-6 col-12"
        outlined
        label="Nome completo"
        v-model="form.nomeCompleto"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório!']"
      />
      <q-input
        class="col-md-6 col-xl-6 col-12"
        outlined
        label="E-mail"
        v-model="form.email"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório!']"
      />
      <div class="col-md-6 col-xs-6 col-12">
        <q-select
          filled
          v-model="form.curso"
          options-dense
          options-dark
          emit-value
          map-options
          use-input
          use-chips
          hide-dropdown-icon
          input-debounce="0"
          :options="opcoes"
          label="selecione seu curso"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório!']"
        />
      </div>
      <div class="col-md-6 col-xs-6 col-12">
        <q-select
          filled
          v-model="form.formacao"
          options-dense
          options-dark
          emit-value
          map-options
          use-input
          use-chips
          hide-dropdown-icon
          input-debounce="0"
          :options="opcoes1"
          label="selecione sua formação"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório!']"
        />
      </div>
      <div class="col-md-6 col-xs-6 col-12">
        <q-select
          filled
          v-model="form.aspectos"
          multiple
          options-dense
          options-dark
          emit-value
          map-options
          use-input
          use-chips
          hide-dropdown-icon
          input-debounce="0"
          :options="opcoes2"
          label="selecione seus aspectos"
        />
      </div>
      <div class="col-md-6 col-xs-6 col-12">
        <q-input
          class="col-md-6 col-xl-6 col-12"
          outlined
          label="Mídia"
          v-model="form.midia"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório!']"
        />
      </div>
      <div>
        <q-btn type="submit" color="primary">Salvar</q-btn>
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import postService from 'src/services/posts'
import { api } from 'src/boot/axios'

defineOptions({
  name: 'CadastroForm',
  data () {
    const { post } = postService()
    const $q = useQuasar()
    const router = useRouter()
    const form = ref({
      nomeCompleto: '',
      email: '',
      curso: '',
      formacao: '',
      midia: ''
    })

    const cursos = ref()
    const formacao = ref()

    const onSubmit = async () => {
      try {
        await post(form.value)
        $q.notify({
          message: 'cadastro realizado com sucesso',
          icon: 'check',
          color: 'green'
        })
        router.push('PerfilDetalhes')
      } catch (error) {
        console.error(error)
      }
    }

    onMounted(() => {
      getCursos()
      getFormacao()
    })

    const getCursos = async () => {
      const res = await api.get('https://661c1c06e7b95ad7fa69b6e1.mockapi.io/dados')
      cursos.value = res.data[0].curso
    }

    const getFormacao = async () => {
      const res = await api.get('https://661c1c06e7b95ad7fa69b6e1.mockapi.io/dados')
      formacao.value = res.data[0].formacao
    }

    return {
      curso: '',
      opcoes: cursos,
      formacao: '',
      opcoes1: formacao,
      aspectos: [],
      opcoes2: [],
      form,
      onSubmit
    }
  }
})
</script>

<style lang="scss" scoped>
.form-cadastro-container {
  background-color: #fefefe;
}
.form-cadastro .q-input,
.q-select {
  border: none;
}
</style>
