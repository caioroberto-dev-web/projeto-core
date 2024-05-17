const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', name: 'loginDefault', component: () => import('pages/LoginForm.vue') },
      { path: '', name: 'loginForm', component: () => import('pages/LoginForm.vue') },
      { path: 'CadastroContaForm', name: 'cadastroContaForm', component: () => import('pages/CadastroContaForm.vue') },
      { path: 'CompetenciasForm2', name: 'competenciasForm2', component: () => import('pages/CompetenciasForm2.vue') },
      { path: 'FeedbacksForm/:id', name: 'feedbacksForm', component: () => import('pages/FeedbacksForm.vue') },
      { path: 'PdiForm', name: 'pdiForm', component: () => import('pages/PdiForm.vue') },
      { path: 'AnalyticsForm', name: 'analyticsForm', component: () => import('pages/AnalyticsForm.vue') },
      { path: 'EquipesForm', name: 'equipesForm', component: () => import('pages/EquipesForm.vue') },
      { path: 'CadastroForm', name: 'cadastroForm', component: () => import('pages/CadastroForm.vue') },
      { path: 'PerfilDetalhes', name: 'perfilDetalhes', component: () => import('pages/PerfilDetalhes.vue') },
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
