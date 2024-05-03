<template>
  <q-page>
    <h6 align="center">Editar Perfil</h6>
    <q-form class="form-perfil-detalhes-container row q-col-gutter-sm" @submit="onSubmit">
      <div class="col-md-6 col-xl-6 col-12">
        <span>Nome</span>
        <q-input
        outlined
        label="Nome"
        v-model="perfil.nome"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório!']"
        />
      </div>
      <div class="col-md-6 col-xl-6 col-12">
        <span>Sobrenome</span>
        <q-input
        outlined
        label="Sobrenome"
        v-model="perfil.sobreNome"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório!']"
        />
      </div>
      <div class="col-md-6 col-xl-6 col-12">
        <span>Data de Nascimento</span>
        <q-input
        outlined
        label="Data de Nascimento"
        v-model="perfil.dataNascimento"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório!']"
        />
      </div>
      <div class="col-md-6 col-xl-6 col-12">
        <span>Gênero</span>
        <q-select
        outlined
        v-model="perfil.genero"
        options-dense
        options-dark
        emit-value
        map-options
        use-input
        use-chips
        hide-dropdown-icon
        input-debounce="0"
        :options="opcoes1"
        label="Informe seu gênero"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório!']"
        />
      </div>
      <div class="col-md-6 col-xl-6 col-12">
        <span>Cidade</span>
        <q-select
          outlined
          v-model="perfil.cidade"
          options-dense
          options-dark
          emit-value
          map-options
          use-input
          use-chips
          hide-dropdown-icon
          input-debounce="0"
          :options="opcoes2"
          label="Informe sua cidade"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório!']"
          />
      </div>
      <div class="col-md-6 col-xl-6 col-12">
        <span>Estado</span>
        <q-select
        outlined
        v-model="perfil.estado"
        options-dense
        options-dark
        emit-value
        map-options
        use-input
        use-chips
        hide-dropdown-icon
        input-debounce="0"
        :options="opcoes3"
        label="Informe seu estado"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório!']"
       />
      </div>
      <div class="col-md-6 col-xl-6 col-12">
        <span>País</span>
        <q-select
      class="col-md-3 col-xs-3 col-6"
      outlined
      v-model="perfil.pais"
      options-dense
      options-dark
      emit-value
      map-options
      use-input
      use-chips
      hide-dropdown-icon
      input-debounce="0"
      :options="opcoes4"
      label="Informe seu país"
      lazy-rules
      :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório!']"
      />
      </div>
      <div class="col-md-12 col-xs-12 col-12">
        <q-btn class="float-right" type="submit" color="primary">Editar</q-btn>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import postService from 'src/services/posts'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useQuasar } from 'quasar'

export default {
  name: 'PerfilDetalhes',
  setup () {
    const perfil = ref({})
    const { getById, update } = postService()
    const route = useRoute()
    const router = useRouter()
    const $q = useQuasar()
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

    const form = ref({
      nome: '',
      sobreNome: '',
      dataNascimento: '',
      genero: null,
      cidade: null,
      estado: null,
      pais: null
    })

    const onSubmit = async () => {
      try {
        await update(perfil.value)
        $q.notify({
          message: 'cadastro atualizado com sucesso',
          icon: 'check',
          color: 'green'
        })
        router.push('/EquipesForm')
      } catch (error) {
        console.error(error)
      }
    }

    return {
      perfil,
      handleMinhasCompetencias,
      genero: '',
      opcoes1: ['Masculino', 'Feminino'],
      cidade: '',
      opcoes2: ['Vitória', 'Serra', 'Vila Velha', 'Cariacica', 'Viana', 'Guarapari', 'Fundão'],
      estado: '',
      opcoes3: ['ES', 'RJ', 'SP', 'MG', 'RS', 'SC', 'DF'],
      pais: '',
      opcoes4: ['Brasil', 'Argentina', 'Portugal', 'Holanda', 'Japão', 'Taiwa', 'Marrocos'],
      form,
      onSubmit
    }
  }
}
</script>

<style scoped>
  .q-input, .q-select {
    margin: 0 10px;
  }
  .q-btn {
    margin: 0 15px 15px 0;
  }
  span {
   position: relative;
   font-weight: bold;
   left: 10px;
  }
  @media  (max-width: 576px ) {
    .q-btn {
      display: block;
      border-radius: 10px;
      top: 15px;
      width: 100%;
      margin: 0 auto 20px;
      float: none;
    }
  }
  @media  (min-width: 576px ) {
    .q-btn {
      top: 15px;
      margin-bottom: 20px;
    }
  }
</style>
