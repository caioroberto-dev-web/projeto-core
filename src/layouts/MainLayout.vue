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
        <p align="center" class="logotipo_1">CORE<span class="logotipo_2">-O</span></p>
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
    title: 'Início',
    caption: '',
    icon: '',
    to: { name: 'home' }
  },
  {
    title: 'Profissionais',
    caption: '',
    icon: '',
    to: { name: 'cadastroForm' }
  },
  {
    title: 'Competências',
    caption: '',
    icon: '',
    to: { name: 'competenciasForm' }
  },
  {
    title: 'Feedbacks',
    caption: '',
    icon: '',
    to: { name: 'feedbacksForm' }
  },
  {
    title: 'P.D.I',
    caption: '',
    icon: '',
    to: { name: 'pdiForm' }
  },
  {
    title: 'Analytics',
    caption: '',
    icon: '',
    to: { name: 'analyticsForm' }
  },
  {
    title: 'Equipes',
    caption: '',
    icon: '',
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
