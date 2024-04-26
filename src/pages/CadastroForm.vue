<template>
  <q-page padding class="form-cadastro-container">
    <h6 align="center">Formulário de cadastro</h6>
    <q-form class="form-cadastro row q-col-gutter-sm" @submit="onSubmit">
      <q-input
        class="col-md-12 col-xl-12 col-12"
        outlined
        label="Nome"
        v-model="form.nome"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório!']"
      />
      <q-input
        class="col-md-12 col-xl-12 col-12"
        outlined
        label="Sobrenome"
        v-model="form.sobreNome"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório!']"
      />
        <q-input
        class="col-md-6 col-xl-6 col-12"
        outlined
        label="Data de nascimento"
        v-model="form.dataNascimento"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório!']"
      />
        <q-select
          class="col-md-6 col-xs-6 col-12"
          outlined
          v-model="form.genero"
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
        <q-select
          class="col-md-6 col-xs-6 col-12"
          outlined
          v-model="form.cidade"
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
        <q-select
        class="col-md-3 col-xs-3 col-6"
        outlined
        v-model="form.estado"
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
      <q-select
      class="col-md-3 col-xs-3 col-6"
      outlined
      v-model="form.pais"
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
      <div class="col-md-6 col-xs-6 col-12">
        <q-btn class="float-right" type="submit" color="primary">Salvar</q-btn>
      </div>
      <div class="col-md-12 col-xs-12 col-12">
        <a class="float-right" href="#" >Informações Profisssionais</a>
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
      cidade: null,
      estado: null,
      pais: null
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
      opcoes2: ['Vitória', 'Serra', 'Vila Velha', 'Cariacica', 'Viana', 'Guarapari', 'Fundão'],
      estado: '',
      opcoes3: ['ES', 'RJ', 'SP', 'MG', 'RS', 'SC', 'DF'],
      pais: '',
      opcoes4: ['Brasil', 'Argentina', 'Portugal', 'Holanda', 'Japão', 'Taiwa', 'Marrocos'],
      form,
      onSubmit
    }
  }
})
</script>

<style scoped>
.form-cadastro-container {
  background-color: #fefefe;
}
.form-cadastro .q-input,
.q-select {
  border: none;
}
.q-btn {
  border-radius: 10px;
  top: 15px;
}

@media  (max-width: 576px ) {
  .q-btn {
    border-radius: 10px;
    top: 15px;
    margin-bottom: 20px;
    width: 100%;
  }
}
@media  (min-width: 576px ) {
  .q-btn {
    top: 15px;
    margin-bottom: 20px;
  }
}

</style>
