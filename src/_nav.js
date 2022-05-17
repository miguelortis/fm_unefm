import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilStar, cilUser, cilHome, cilGroup, cilPencil } from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  ////////HOME/////
  {
    code: '1',
    component: CNavItem,
    name: 'Inicio',
    to: '/account',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,

    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // },
  },
  ////////PERFIL/////
  {
    code: '2',
    component: CNavTitle,
    name: 'Perfil',
  },
  {
    code: '3',
    component: CNavGroup,
    name: 'Datos Personales',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Actualizar mis Datos',
        to: '/profile',
      },
      {
        component: CNavItem,
        name: 'Cambiar Contraseña',
        to: '/noexist',
      },
      {
        component: CNavItem,
        name: 'Plan de Cobertura',
        to: '/noexist',
      },
    ],
  },
  ////////FAMILIARES/////
  {
    code: '4',
    component: CNavTitle,
    name: 'Beneficiarios',
  },
  {
    code: '5',
    component: CNavItem,
    name: 'Familiares',
    to: '/beneficiaries',
    icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
  },
  // {
  //   code: '6',
  //   component: CNavItem,
  //   name: 'Reporte',
  //   to: '/report',
  //   icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
  //   // badge: {
  //   //   color: 'info',
  //   //   text: 'NEW',
  //   // },
  // },

  ////// titulo de panel administrativo
  {
    code: '7',
    component: CNavTitle,
    name: 'panel administrativo',
  },
  ////////RECEPCION////////
  {
    code: '8',
    component: CNavItem,
    name: 'Servicios',
    to: '/typeofconsultations',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  ////////MEDICO GENERAL////////
  {
    code: '9',
    component: CNavItem,
    name: 'Consultas Pendientes',
    to: '/pendingconsultations',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    badge: {
      color: 'success',
      text: 'M. General',
    },
  },

  ////////MEDICO EMERGENCIA////////
  {
    code: '10',
    component: CNavItem,
    name: 'Consultas Pendientes',
    to: '/pendingconsultations',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    badge: {
      color: 'success',
      text: 'M. Emergencia',
    },
  },
  ////////ADMINISTRAR USUARIOS////////
  {
    code: '11',
    component: CNavGroup,
    name: 'Administrar Usuarios',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Titulares',
        to: '/titulares',
      },
      {
        component: CNavItem,
        name: 'Familiares',
        to: '/noexist',
      },
      {
        component: CNavItem,
        name: 'Especialistas Externos',
        to: '/noexist',
      },
    ],
  },
  ////////ADMINISTRAR SERVICIOS////////
  {
    code: '12',
    component: CNavGroup,
    name: 'Administrar Servicios',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Servicios',
        to: '/services',
      },
      {
        component: CNavItem,
        name: 'Planes',
        to: '/plans',
      },
      {
        component: CNavItem,
        name: 'Valor de Tasas (divisas)',
        to: '/exchange_rates',
      },
    ],
  },
  //////////
  // {
  //   component: CNavItem,
  //   name: 'Modificar Familiar',
  //   to: '/theme/typography',
  //   icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavTitle,
  //   name: 'Beneficiarios',
  // },
  // {
  //   component: CNavTitle,
  //   name: 'Components',
  // },
  // {
  //component: CNavGroup,
  //  name: 'Base',

  // icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
  //items: [
  //     {
  //       component: CNavItem,
  //       name: 'Accordion',
  //       to: '/base/accordion',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Breadcrumb',
  //       to: '/base/breadcrumbs',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Cards',
  //       to: '/base/cards',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Carousel',
  //       to: '/base/carousels',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Collapse',
  //       to: '/base/collapses',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'List group',
  //       to: '/base/list-groups',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Navs & Tabs',
  //       to: '/base/navs',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Pagination',
  //       to: '/base/paginations',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Placeholders',
  //       to: '/base/placeholders',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Popovers',
  //       to: '/base/popovers',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Progress',
  //       to: '/base/progress',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Spinners',
  //       to: '/base/spinners',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Tables',
  //       to: '/base/tables',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Tooltips',
  //       to: '/base/tooltips',
  //     },
  //   ],
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Buttons',
  //   to: '/buttons',
  //   icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Buttons',
  //       to: '/buttons/buttons',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Buttons groups',
  //       to: '/buttons/button-groups',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Dropdowns',
  //       to: '/buttons/dropdowns',
  //     },
  //   ],
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Forms',
  //   icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Form Control',
  //       to: '/forms/form-control',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Select',
  //       to: '/forms/select',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Checks & Radios',
  //       to: '/forms/checks-radios',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Range',
  //       to: '/forms/range',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Input Group',
  //       to: '/forms/input-group',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Floating Labels',
  //       to: '/forms/floating-labels',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Layout',
  //       to: '/forms/layout',
  //     },
  //     { component: CNavItem, name: 'Validation', to: '/forms/validation' },
  //   ],
  // },
  // {
  //   component: CNavItem,
  //   name: 'Charts',
  //   to: '/charts',
  //   icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  /// },
  // {
  //   code: 'JfUmNuTnAeAfDmMIN',
  //   component: CNavGroup,
  //   name: 'Icons',
  //   icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'CoreUI Free',
  //       to: '/icons/coreui-icons',
  //       badge: {
  //         color: 'success',
  //         text: 'NEW',
  //       },
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'CoreUI Flags',
  //       to: '/icons/flags',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'CoreUI Brands',
  //       to: '/icons/brands',
  //     },
  //   ],
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Notifications',
  //   icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Alerts',
  //       to: '/notifications/alerts',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Badges',
  //       to: '/notifications/badges',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Modal',
  //       to: '/notifications/modals',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Toasts',
  //       to: '/notifications/toasts',
  //     },
  //   ],
  // },
  // {
  //   component: CNavItem,
  //   name: 'Widgets',
  //   to: '/widgets',
  //   icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
  //   badge: {
  //     color: 'info',
  //     text: 'NEW',
  //   },
  // },
  // {
  //   component: CNavTitle,
  //   name: 'Extras',
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Pages',
  //   icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Login',
  //       to: '/login',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Register',
  //       to: '/register',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Error 404',
  //       to: '/404',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Error 500',
  //       to: '/500',
  //     },
  //   ],
  // },
]

export default _nav
