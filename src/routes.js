import React, { lazy } from 'react'

const Account = lazy(() => import('./views/account/Account'))
const Profile = lazy(() => import('./views/profile/Profile'))
const Beneficiaries = lazy(() => import('./views/beneficiaries/Beneficiaries'))
const TypeOfConsultations = lazy(() => import('./views/type_of_consultation/TypeOfConsultations'))
const Consultafiliados = lazy(() => import('./views/consultafiliados/Consultafiliados'))
const PendingConsultations = lazy(() =>
  import('./views/pending_consultations/PendingConsultations'),
)
const Services = lazy(() => import('./views/services/Services'))
const Plans = lazy(() => import('./views/plans/Plans'))
const ExchangeRates = lazy(() => import('./views/exchange_rates/ExchangeRates'))
const Titulares = lazy(() => import('./views/admin_titulares/AdminTitulares'))
const Report = lazy(() => import('./views/report'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/profile', name: 'Profile', component: Profile },
  { path: '/account', name: 'Account', component: Account },
  { path: '/beneficiaries', name: 'Beneficiaries', component: Beneficiaries },
  { path: '/typeofconsultations', name: 'TypeOfConsultations', component: TypeOfConsultations },
  { path: '/consultafiliados', name: 'Consultafiliados', component: Consultafiliados },
  { path: '/pendingconsultations', name: 'PendingConsultations', component: PendingConsultations },
  { path: '/services', name: 'Services', component: Services },
  { path: '/plans', name: 'Plans', component: Plans },
  { path: '/exchange_rates', name: 'ExchangeRates', component: ExchangeRates },
  { path: '/titulares', name: 'Titulares', component: Titulares },
  { path: '/report', name: 'Reporte', component: Report },

]

export default routes
