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

        <q-toolbar-title>
          Projeto Core-O
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
        <img src="icons/leds.svg" alt="logo"/>
        </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
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

defineOptions({
  name: 'MainLayout'
})

const linksList = [
  {
    title: 'Login',
    caption: 'login',
    icon: 'login',
    to: { name: 'home' }
  },
  {
    title: 'Cadastro',
    caption: 'cadastro',
    icon: 'shield',
    to: { name: 'cadastroForm' }
  },
  {
    title: 'Competências',
    caption: 'competências',
    icon: '_',
    to: { name: 'competenciasForm' }
  },
  {
    title: 'Feedbacks',
    caption: 'feedbacks',
    icon: '_',
    to: { name: 'feedbacksForm' }
  },
  {
    title: 'P.D.I',
    caption: 'p.d.i',
    icon: '_',
    to: { name: 'pdiForm' }
  },
  {
    title: 'Analytics',
    caption: 'analytics',
    icon: '_',
    to: { name: 'analyticsForm' }
  },
  {
    title: 'Equipes',
    caption: 'equipes',
    icon: '_',
    to: { name: 'equipesForm' }
  }
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<style scoped>
.q-drawer {
  background-color:#d8e9f5;
 }
 img {
  height: 50px;
  display: block;
  margin: 30px auto;
 }
</style>
