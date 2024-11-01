import React, { lazy } from "react";

const Account = lazy(() => import("./views/account/Account"));
const Profile = lazy(() => import("./views/profile/Profile"));
const Beneficiaries = lazy(() => import("./views/beneficiaries/Beneficiaries"));
const MedicalConsultationsView = lazy(() =>
  import("./views/MedicalConsultationsView/MedicalConsultationsView")
);
const PendingConsultations = lazy(() =>
  import("./views/pending_consultations/PendingConsultations")
);
const Services = lazy(() => import("./views/services/Services"));
const PlanStettings = lazy(() => import("./views/PlanSetup/PlanSetup"));
const UserPlan = lazy(() => import("./views/UserPlan"));
const ExchangeRates = lazy(() =>
  import("./views/exchange_rates/ExchangeRates")
);
const Titulares = lazy(() => import("./views/admin_titulares/AdminTitulares"));
const Appointments = lazy(() => import("./views/appointments/Appointments"));
const AssignRoleView = lazy(() =>
  import("./views/AssignRoleView/AssignRoleView")
);
const RegisterNewRoleView = lazy(() =>
  import("./views/RegisterNewRoleView/RegisterNewRoleView")
);
const Checkout = lazy(() => import("./views/renewalPage/Checkout"));
//const Home = lazy(() => import('./views/home/Home'))
const Report = lazy(() => import("./views/report"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/account", name: "Account", component: Account },
  { path: "/profile", name: "Profile", component: Profile },
  { path: "/beneficiaries", name: "Beneficiaries", component: Beneficiaries },
  {
    path: "/medical-consultation",
    name: "MedicalConsultationsView",
    component: MedicalConsultationsView,
  },
  {
    path: "/pendingconsultations",
    name: "PendingConsultations",
    component: PendingConsultations,
  },
  { path: "/services", name: "Services", component: Services },
  { path: "/plan-setting", name: "planSetting", component: PlanStettings },
  { path: "/user-plan", name: "userPlan", component: UserPlan },
  { path: "/exchange_rates", name: "ExchangeRates", component: ExchangeRates },
  { path: "/titulares", name: "Titulares", component: Titulares },
  { path: "/appointments", name: "Appointments", component: Appointments },
  {
    path: "/register-new-role",
    name: "RegisterNewRoleView",
    component: RegisterNewRoleView,
  },
  { path: "/assign-role", name: "AssignRoleView", component: AssignRoleView },
  //{ path: '/checkout', name: 'Checkout', component: Checkout },
  { path: "/report", name: "Reporte", component: Report },
];

export default routes;
