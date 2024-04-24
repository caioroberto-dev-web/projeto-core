const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('pages/IndexPage.vue') },
      { path: 'CadastroForm', name: 'cadastroForm', component: () => import('pages/CadastroForm.vue') },
      { path: 'PerfilDetalhes/:id?', name: 'perfilDetalhes', component: () => import('pages/PerfilDetalhes.vue') },
      { path: 'MinhasCompetencias/:id', name: 'minhasCompetencias', component: () => import('pages/MinhasCompetencias.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
