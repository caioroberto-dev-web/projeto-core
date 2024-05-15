const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('pages/IndexPage.vue') },
      { path: 'CadastroContaForm', name: 'cadastroContaForm', component: () => import('pages/CadastroContaForm.vue') },
      { path: 'CompetenciasForm', name: 'competenciasForm', component: () => import('pages/CompetenciasForm.vue') },
      { path: 'FeedbacksForm', name: 'feedbacksForm', component: () => import('pages/FeedbacksForm.vue') },
      { path: 'PdiForm', name: 'pdiForm', component: () => import('pages/PdiForm.vue') },
      { path: 'AnalyticsForm', name: 'analyticsForm', component: () => import('pages/AnalyticsForm.vue') },
      { path: 'EquipesForm', name: 'equipesForm', component: () => import('pages/EquipesForm.vue') },
      { path: 'CadastroForm', name: 'cadastroForm', component: () => import('pages/CadastroForm.vue') },
      { path: 'PerfilDetalhes/:id', name: 'perfilDetalhes', component: () => import('pages/PerfilDetalhes.vue') },
      { path: 'CompetenciasPessoais/:id', name: 'competenciasPessoais', component: () => import('pages/CompetenciasPessoais.vue') },
      { path: 'CompetenciasProfissionais/:id', name: 'competenciasProfissionais', component: () => import('pages/CompetenciasProfissionais.vue') }
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
