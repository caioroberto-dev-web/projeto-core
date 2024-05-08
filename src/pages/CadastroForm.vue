<template>
  <q-page padding class="form-cadastro-container">
    <h6 align="start">Cadastrar profissional</h6>
    <q-form class="form-cadastro row q-col-gutter-xl" @submit="onSubmit">
        <div class="col-md-6 col-xl-6 col-12">
          <span>Nome</span>
          <q-input
            label=""
            v-model="form.nome"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório!']"
            />
        </div>
        <div class="col-md-6 col-xl-6 col-12">
          <span>Sobrenome</span>
          <q-input
            label=""
            v-model="form.sobreNome"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório!']"/>
        </div>
        <div class="col-md-6 col-xl-6 col-12">
          <span>Data de nascimento</span>
          <q-input
            v-model="form.dataNascimento"
            type="date"
            hint=""
            />
        </div>
        <div class="col-md-6 col-xl-6 col-12">
          <span>Gênero</span>
          <q-select
            v-model="form.genero"
            options-dense
            emit-value
            map-options
            use-input
            use-chips
            hide-dropdown-icon
            input-debounce="0"
            :options="opcoes1"
            label=""
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório!']"
            />
        </div>
        <div class="col-md-6 col-xl-6 col-12">
          <span>Localização</span>
          <q-select
            v-model="form.localizacao"
            options-dense
            emit-value
            map-options
            use-input
            use-chips
            hide-dropdown-icon
            input-debounce="0"
            :options="opcoes2"
            label=""
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório!']"
            />
        </div>
        <div class="col-md-6 col-xl-6 col-12">
          <span>Instituição de ensino</span>
          <q-select
            v-model="form.instituicaoEnsino"
            options-dense
            emit-value
            map-options
            use-input
            use-chips
            hide-dropdown-icon
            input-debounce="0"
            :options="opcoes3"
            label=""
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório!']"
            />
        </div>
        <div class="col-md-6 col-xl-6 col-12">
          <span>Formação</span>
          <q-select
          v-model="form.formacao.nome"
          options-dense
          emit-value
          map-options
          use-input
          use-chips
          hide-dropdown-icon
          input-debounce="0"
          :options="opcoes4"
          label=""
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório!']"
          />
          <q-radio v-model="form.formacao.status" val="Em andamento" label="Em andamento" />
          <q-radio v-model="form.formacao.status" val="Concluido" label="Concluido" />
        </div>
        <div class="col-md-6 col-xl-6 col-12">
          <span>Curso</span>
          <q-select
            v-model="form.curso"
            options-dense
            emit-value
            map-options
            use-input
            use-chips
            hide-dropdown-icon
            input-debounce="0"
            :options="opcoes5"
            label=""
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório!']"
            />
        </div>
        <div class="col-md-6 col-xl-6 col-12">
          <span>Cargo</span>
          <q-input
            label=""
            v-model="form.cargo"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório!']"
            />
        </div>
        <div class="col-md-6 col-xl-6 col-12">
          <span>Mídia</span>
          <q-input
            label=""
            v-model="form.midia"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório!']"
            />
            <q-btn class="float-left" color="primary">Escolher arquivo</q-btn>
        </div>
        <div class="col-md-12 col-xs-12 col-12 q-mb-md">
          <q-btn class="float-left" type="submit" color="primary">Salvar</q-btn>
        </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import postService from 'src/services/posts'

defineOptions({
  name: 'CadastroForm',
  data () {
    const { post } = postService()
    const $q = useQuasar()
    const router = useRouter()
    const form = ref({
      nome: '',
      sobreNome: '',
      dataNascimento: '',
      genero: null,
      localizacao: null,
      instituicaoEnsino: null,
      formacao: { nome: null, status: 'Em andamento' },
      curso: null,
      cargo: '',
      midia: ''
    })

    const onSubmit = async () => {
      try {
        await post(form.value)
        $q.notify({
          message: 'cadastro realizado com sucesso',
          icon: 'check',
          color: 'green'
        })
        router.push('EquipesForm')
      } catch (error) {
        console.error(error)
      }
    }

    return {
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
      opcoes3: [
        'IFES',
        'UFES',
        'UCL',
        'UVV',
        'Estácio',
        'Multivix'
      ],
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
      statusFormacao: ref('0'),
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
})
</script>

<style scoped>
.form-cadastro-container {
  width: 60%;
  margin: 0 auto;
}

.form-cadastro .q-input,
.q-select {
  border: none;
}

.q-btn {
  top: 15px;
}

span {
  font-size: 24px;
  color: #504949;
}

@media (max-width: 576px) {
  .form-cadastro-container {
    width: 100%;
  }
  .q-btn {
    border-radius: 10px;
    top: 15px;
    margin-bottom: 20px;
    width: 100%;
  }
}
@media (min-width: 400px) {
 .form-cadastro-container {
    width: 80%;
    }
}
</style>
