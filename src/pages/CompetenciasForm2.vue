<template>
  <q-page padding class="q-col-gutter-y-md">
    <div class="row">
      <div class="col-md-6 col-12">
        <p>Competências</p>
      </div>
      <div class="col-md-6 col-12">
        <q-btn class="float-right" @click="medium = true"
          >Adicionar Competência</q-btn
        >
      </div>
      <div
        class="container-competencias container-competencias-lista no-padding"
        v-if="profissional == ''"
      >
        <p>Não possui competências registradas..</p>
      </div>
      <div
        v-else
        class="container-competencias container-competencias-lista no-padding"
      >
        <ul v-for="profissionals in profissional" :key="profissionals.id">
          <li
            @click="
              (fullHeight = true), getCompetenciaDetalhes(profissionals.id)
            "
          >
            {{ profissionals.description }}
          </li>
        </ul>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 col-12">
        <p>Elementos da Competência</p>
      </div>
      <div class="col-md-6 col-12">
        <q-btn class="float-right">Adicionar Elementos</q-btn>
      </div>
      <div class="container-competencias">
        <ul class="container-competencias-lista no-padding">
          <li class="col-md-4 col-12">competência - 1</li>
          <li class="col-md-4 col-12">competência - 2</li>
          <li class="col-md-4 col-12">competência - 3</li>
          <li class="col-md-4 col-12">competência - 4</li>
        </ul>
      </div>
    </div>
    <q-dialog v-model="medium">
      <q-card style="width: 700px; max-width: 80vw">
        <q-card>
          <q-form class="q-pa-md q-gutter-sm" @submit="handleSubmit">
            <p>Adicionar competências</p>
            <q-select
              v-model="form"
              use-input
              input-debounce="0"
              :options="options2"
              @filter="filterFn"
              option-label="description"
              option-value="description"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    Nenhum resultado encontrado...
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
            <q-card-actions align="right" class="bg-white text-teal">
              <q-btn label="Salvar" type="submit" v-close-popup />
              <q-btn label="Cancelar" v-close-popup />
            </q-card-actions>
          </q-form>
        </q-card>
      </q-card>
    </q-dialog>
    <q-dialog v-model="fullHeight" full-height>
      <q-card class="column full-height q-pa-sm" style="width: 600px">
        <div class="row">
          <div class="col-md-6 col-12"></div>
          <div class="col-md-6 col-12 q-gutter-sm">
            <q-btn
              class="float-right"
              @click="handleDeleteCompetencia(form.id)"
              color="red"
              v-close-popup
              >Excluir</q-btn
            >
            <q-btn
              class="float-right"
              @click="handleEditCompetencia(form.id)"
              color="green"
              v-close-popup
              >Salvar</q-btn
            >
          </div>
        </div>
        <q-form class="row q-col-gutter-sm">
          <div class="col-md-6">
            <label for="">Tipo de competência</label>
            <q-select
              v-model="form"
              use-input
              input-debounce="0"
              :options="options2"
              @filter="filterFn"
              option-label="description"
              option-value="description"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    Nenhum resultado encontrado...
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
          <div class="col-md-6">
            <div style="max-width: 300px">
              <label for="">Evidência</label>
              <q-input v-model="form.evidencia" type="textarea" disable />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-descricao" style="max-width: 300px">
              <label for="">Descrição</label>
              <q-input v-model="form.descricao" type="textarea" />
            </div>
          </div>
          <div class="col-md-6">
            <label for="">Nível</label>
            <q-select v-model="form.nivel" :options="options" />
          </div>
        </q-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { onMounted, ref } from 'vue'
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'
const options = [
  'Nivel 1 - Iniciante',
  'Nivel 2 - Básico',
  'Nível 3 - Intermediário',
  'Nível 4 - Avançado',
  'Nível 5 - Especialista'
]
const stringOptions = [
  {
    id: 1,
    description: 'Software Enginer',
    evidencia: '',
    descricao: '',
    nivel: ''
  },
  {
    id: 2,
    description: 'DevOps',
    evidencia: '',
    descricao: '',
    nivel: ''
  },
  {
    id: 3,
    description: 'DBA',
    evidencia: '',
    descricao: '',
    nivel: ''
  }
]
export default {
  name: 'CompetenciasForm2',
  setup () {
    const $q = useQuasar()
    const profissional = ref({})
    const options2 = ref(stringOptions)
    const form = ref([])
    const handleSubmit = async () => {
      try {
        await api.post('/testes', form.value)
        getCompetencias()
        $q.notify({
          message: 'competência cadastrada com sucesso',
          icon: 'check',
          color: 'green'
        })
      } catch (error) {
        console.error(error)
      }
    }

    onMounted(() => {
      getCompetencias()
    })

    const getCompetencias = async () => {
      const res = await api.get('/testes')
      console.log((profissional.value = res.data))
    }
    const getCompetenciaDetalhes = async (id) => {
      const res = await api.get('/testes/' + id)
      console.log((form.value = res.data))
    }
    const handleEditCompetencia = async (id) => {
      const res = await api.put('/testes/' + id, form.value)
      console.log(res)
      getCompetencias()
      $q.notify({
        message: 'Competência atualizada sucesso!',
        color: 'green',
        icon: 'edit'
      })
    }
    const handleDeleteCompetencia = async (id) => {
      const res = await api.delete('/testes/' + id)
      console.log(res)
      getCompetencias()
      $q.notify({
        message: 'Competência excluida com sucesso!',
        color: 'green',
        icon: 'delete'
      })
    }
    return {
      medium: ref(false),
      fullWidth: ref(false),
      fullHeight: ref(false),
      model: ref(null),
      options,
      options2,
      profissional,
      form,
      handleSubmit,
      getCompetenciaDetalhes,
      handleEditCompetencia,
      handleDeleteCompetencia,
      filterFn (val, update) {
        if (val === '') {
          update(() => {
            options2.value = stringOptions
          })
          return
        }
        update(() => {
          const needle = val.toLowerCase()
          options2.value = stringOptions.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          )
        })
      }
    }
  }
}
</script>

<style scoped>
.container-competencias,
.container-elementos {
  height: 300px;
  width: 100%;
  background-color: #ededed;
  border-radius: 15px;
}
p {
  font-size: 24px;
}

ul li {
  background-color: #fff;
  text-align: center;
  padding: 10px;
  margin: 0 auto;
}

.container-competencias-lista {
  display: flex;
}

.container-adicionar-competencias {
  background-color: #f6f6f6;
}

.form-descricao {
  position: relative;
  bottom: 80px;
}
@media screen and (max-width: 576px) {
  .container-competencias,
  .container-elementos {
    height: auto;
  }
  .container-competencias-lista {
    width: 80%;
    display: block;
    margin: 10px auto;
  }
  ul li {
    margin: 10px auto;
  }
  .q-btn {
    width: 100%;
    margin: 20px 0;
  }
}
</style>
