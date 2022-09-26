import React, { lazy } from 'react'

const Account = lazy(() => import('./views/account/Account'))
const Profile = lazy(() => import('./views/profile/Profile'))
const Beneficiaries = lazy(() => import('./views/beneficiaries/Beneficiaries'))
const TypeOfConsultations = lazy(() => import('./views/type_of_consultation/TypeOfConsultations'))
const PendingConsultations = lazy(() =>
  import('./views/pending_consultations/PendingConsultations'),
)
const Services = lazy(() => import('./views/services/Services'))
const PlanStettings = lazy(() => import('./views/PlanSetup/PlanSetup'))
const UserPlan = lazy(() => import('./views/UserPlan'))
const ExchangeRates = lazy(() => import('./views/exchange_rates/ExchangeRates'))
const Titulares = lazy(() => import('./views/admin_titulares/AdminTitulares'))
//const Home = lazy(() => import('./views/home/Home'))
const Report = lazy(() => import('./views/report'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/account', name: 'Account', component: Account },
  { path: '/profile', name: 'Profile', component: Profile },
  { path: '/beneficiaries', name: 'Beneficiaries', component: Beneficiaries },
  { path: '/typeofconsultations', name: 'TypeOfConsultations', component: TypeOfConsultations },
  { path: '/pendingconsultations', name: 'PendingConsultations', component: PendingConsultations },
  { path: '/services', name: 'Services', component: Services },
  { path: '/plan-setting', name: 'planSetting', component: PlanStettings },
  { path: '/user-plan', name: 'userPlan', component: UserPlan },
  { path: '/exchange_rates', name: 'ExchangeRates', component: ExchangeRates },
  { path: '/titulares', name: 'Titulares', component: Titulares },
  //{ path: '/home', name: 'Home', component: Home },
  { path: '/report', name: 'Reporte', component: Report },

]

export default routes
