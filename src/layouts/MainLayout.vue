<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>
          <img src="icons/leds.svg" alt="logo" />
          <p align="center" class="logotipo_1">
            CORE<span class="logotipo_2">-O</span>
          </p>
        </q-item-label>

        <div v-if="userDados == null">
          <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
          />
        </div>
        <div v-if="userDados != null">
          <EssentialLink
          v-for="link in linksList2"
          :key="link.title"
          v-bind="link"
          />
        </div>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { useQuasar } from 'quasar'

defineOptions({
  name: 'MainLayout',
  setup () {
    return {}
  }
})
const $q = useQuasar()
const userDados = ref()

const linksList = [
  {
    title: 'Login',
    caption: '',
    icon: '',
    to: { name: 'loginForm' }
  },
  {
    title: 'Competências',
    caption: '',
    icon: '',
    to: { name: 'competenciasForm2' }
  },
  {
    title: 'Buscar',
    caption: '',
    icon: '',
    to: { name: 'equipesForm' }
  }
]
const linksList2 = [
  {
    title: 'Meu Perfil',
    caption: '',
    icon: '',
    to: { name: 'perfilDetalhes' }
  },
  {
    title: 'Competências',
    caption: '',
    icon: '',
    to: { name: 'competenciasForm2' }
  },
  {
    title: 'Buscar',
    caption: '',
    icon: '',
    to: { name: 'equipesForm' }
  }
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

userDados.value = $q.localStorage.getItem('user')

</script>

<style scoped>
.q-drawer {
  background-color: #d8e9f5;
}

.q-btn {
  color: #fff;
}

img {
  height: 50px;
  display: block;
  margin: 30px auto;
}

a {
  font-size: 28px;
  font-weight: bold;
  color: #0168b4;
  text-align: left;
}
</style>
