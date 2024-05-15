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
      <div class="container-competencias">
        <ul class="container-competencias-lista no-padding">
          <li class="col-md-4 col-12" @click="fullHeight = true">Desenvolvimento Front-end</li>
          <li class="col-md-4 col-12">competência - 2</li>
          <li class="col-md-4 col-12">competência - 3</li>
          <li class="col-md-4 col-12">competência - 4</li>
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
    <q-dialog
      v-model="medium"
    >
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card>
          <q-form class="q-pa-md q-gutter-sm" @submit="onSubmit">
            <p>Adicionar competências</p>
            <q-select
              v-model="form.competencias"
              use-input
              use-chips
              multiple
              input-debounce="0"
              @new-value="createValue"
              :options="filterOptions"
              @filter="filterFn"
            />
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
          <div class="col-md-6 col-12">
          </div>
          <div class="col-md-6 col-12 q-gutter-sm">
            <q-btn class="float-right" color="red"  v-close-popup>Excluir</q-btn>
            <q-btn class="float-right" color="green" @click="onSubmit()" v-close-popup>Salvar</q-btn>
          </div>
        </div>
        <q-form class="row q-col-gutter-sm" @submit="onSubmit">
          <div class="col-md-6">
            <label for="">Tipo de competência</label>
            <q-select
            v-model="form.competencias"
            use-input
            use-chips
            input-debounce="0"
            @new-value="createValue"
            :options="filterOptions"
            @filter="filterFn"
            />
          </div>
          <div class="col-md-6">
            <div style="max-width: 300px">
              <label for="">Evidência</label>
              <q-input
                v-model="form.evidencia"
                type="textarea"
                disable
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-descricao" style="max-width: 300px">
              <label for="">Descrição</label>
              <q-input
                v-model="form.descricao"
                type="textarea"
              />
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
import { ref } from 'vue'
const stringOptions = ['Desenvolvimento Front-end', 'Desenvolvimento Back-end', 'Gerenciamento de Redes', 'Segurança da Informação', 'Análise de Dados']
const options = ['Nivel 1 - Iniciante', 'Nivel 2 - Básico', 'Nível 3 - Intermediário', 'Nível 4 - Avançado', 'Nível 5 - Especialista']
export default {
  name: 'PdiForm',
  setup () {
    const model = ref(null)
    const filterOptions = ref(stringOptions)
    const form = ref({
      competencias: 'Desenvolvimento Front-end',
      evidencias: [],
      descricao: 'Capacidade de criar aplicativos e páginas web utilizando linguagens como HTML, CSS e JavaScript.',
      nivel: 'Nível 1 - Iniciante'
    })
    const onSubmit = async () => {
      console.log(await form.value)
      form.value = ['']
    }
    return {
      medium: ref(false),
      fullWidth: ref(false),
      fullHeight: ref(false),
      model,
      filterOptions,
      options,
      form,
      onSubmit,
      createValue (val, done) {
        // Calling done(var) when new-value-mode is not set or is "add", or done(var, "add") adds "var" content to the model
        // and it resets the input textbox to empty string
        // ----
        // Calling done(var) when new-value-mode is "add-unique", or done(var, "add-unique") adds "var" content to the model
        // only if is not already set and it resets the input textbox to empty string
        // ----
        // Calling done(var) when new-value-mode is "toggle", or done(var, "toggle") toggles the model with "var" content
        // (adds to model if not already in the model, removes from model if already has it)
        // and it resets the input textbox to empty string
        // ----
        // If "var" content is undefined/null, then it doesn't tampers with the model
        // and only resets the input textbox to empty string

        if (val.length > 0) {
          const modelValue = (model.value || []).slice()

          val
            .split(/[,;|]+/)
            .map((v) => v.trim())
            .filter((v) => v.length > 0)
            .forEach((v) => {
              if (stringOptions.includes(v) === false) {
                stringOptions.push(v)
              }
              if (modelValue.includes(v) === false) {
                modelValue.push(v)
              }
            })

          done(null)
          model.value = modelValue
        }
      },
      filterFn (val, update) {
        update(() => {
          if (val === '') {
            filterOptions.value = stringOptions
          } else {
            const needle = val.toLowerCase()
            filterOptions.value = stringOptions.filter(
              (v) => v.toLowerCase().indexOf(needle) > -1
            )
          }
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
