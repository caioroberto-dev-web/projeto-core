<template>
  <q-page class="form-perfil-detalhes-container">
    <div v-if="perfil.length == 0">
      <h6 align="center">Carregando</h6>
    </div>
    <div v-else>
      <h6 align="center">Formulário de edição de perfil</h6>
      <q-form
        class="row q-col-gutter-sm"
        @submit="onSubmit"
      >
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
          <span>Instituição de ensino</span>
          <q-select
            class="col-6"
            outlined
            v-model="perfil.instituicaoEnsino"
            options-dense
            options-dark
            emit-value
            map-options
            use-input
            use-chips
            hide-dropdown-icon
            input-debounce="0"
            :options="opcoes3"
            label="Instituição de ensino"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório!']"
          />
        </div>
        <div class="col-md-6 col-xl-6 col-12">
          <span>Formação</span>
          <q-select
            outlined
            v-model="perfil.formacao.nome"
            options-dense
            options-dark
            emit-value
            map-options
            use-input
            use-chips
            hide-dropdown-icon
            input-debounce="0"
            :options="opcoes4"
            label="Informe sua formação"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório!']"
          />
          <q-radio
            v-model="perfil.formacao.status"
            val="Concluido"
            label="Concluido"
          />
          <q-radio
            v-model="perfil.formacao.status"
            val="Em andamento"
            label="Em andamento"
          />
        </div>
        <div class="col-md-6 col-xl-6 col-12">
          <span>Curso</span>
          <q-select
            class="col-6"
            outlined
            v-model="perfil.curso"
            options-dense
            options-dark
            emit-value
            map-options
            use-input
            use-chips
            hide-dropdown-icon
            input-debounce="0"
            :options="opcoes5"
            label="Informe seu curso"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório!']"
          />
        </div>
        <div class="col-md-6 col-xl-6 col-12">
          <span>Cargo</span>
          <q-input
            class="col-6"
            outlined
            label="Cargo"
            v-model="perfil.cargo"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório!']"
          />
        </div>
        <div class="col-md-6 col-xl-6 col-12">
          <span>Midia</span>
          <q-input
            class="col-6"
            outlined
            label="Mídia"
            v-model="perfil.midia"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório!']"
          />
        </div>
        <div class="col-md-12 col-xs-12 col-12 q-gutter-sm">
           <q-btn class="float-right" type="submit" color="primary">Editar</q-btn>
           <q-btn class="float-right" color="primary" :to='name = "/equipesForm"'>Voltar</q-btn>
        </div>
      </q-form>
    </div>
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
    const perfil = ref([])
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
      instituicaoEnsino: null,
      formacao: { nome: '', status: 'Em andamento' },
      curso: null,
      cargo: '',
      midia: ''
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
      opcoes2: [
        'Vitória',
        'Serra',
        'Vila Velha',
        'Cariacica',
        'Viana',
        'Guarapari',
        'Fundão'
      ],
      instituicaoEnsino: '',
      opcoes3: ['IFES', 'UFES', 'UCL', 'UVV', 'Estácio', 'Multivix'],
      formacao: '',
      opcoes4: [
        'Bacharelado',
        'Tecnologo',
        'Licenciatura',
        'Especialização',
        'Mestrado',
        'Doutorado',
        'Pós-doutorado'
      ],
      curso: '',
      opcoes5: [
        'Tecnologia da Informação',
        'Análise e Desenvolvimento de Sistemas',
        'Ciência de Dados',
        'Licenciatura em Computação',
        'Defesa Cibernética',
        'Ciência da Computação',
        'Sistemas de Informação'
      ],
      form,
      onSubmit
    }
  }
}
</script>

<style scoped>
.form-perfil-detalhes-container {
  width: 60%;
  margin: 0 auto;
}
.q-input,
.q-select {
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
@media (max-width: 576px) {
  .q-btn {
    display: block;
    border-radius: 10px;
    top: 15px;
    width: 100%;
    margin: 0 auto 20px;
    float: none;
  }
}
@media (min-width: 576px) {
  .q-btn {
    top: 15px;
    margin-bottom: 20px;
  }
}
</style>
