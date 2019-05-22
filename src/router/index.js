import Router from "vue-router"
import Vue from "vue"
import FinancialTransactions from "@/pages/FinancialTransactions/TransactionList.vue"
import PurchasesList from "@/pages/purchases/PurchasesList.vue"
import SalesList from "@/pages/sales/SalesList.vue"
import ContactList from "@/pages/Contacts/ContactList.vue"
import GlAccount from "@/pages/GlAccounts/GlAccounts.vue"
import Dashboard from "@/pages/dashboard/Dashboard.vue"
import DashboardLayout from "@/pages/Layout/DashboardLayout.vue"

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      component: DashboardLayout,
      redirect: "/dashboard",
      children: [
        {
          path: "contacts",
          name: "Contact List",
          component: ContactList,
          props: true
        },
        {
          path: "dashboard",
          name: "dashboard",
          component: Dashboard,
          props: true
        },
        {
          path: "gl_accounts",
          name: "gl_accounts",
          component: GlAccount,
          props: true
        },
        {
          path: "financial_transactions",
          name: "Financial Transactions",
          component: FinancialTransactions,
          props: true
        },
        {
          path: "purchases",
          name: "Purchases List",
          component: PurchasesList,
          props: true
        },
        {
          path: "sales",
          name: "Sales List",
          component: SalesList,
          props: true
        }
      ]
    }
  ]
})
