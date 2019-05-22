<template>
  <div class="content">
    <div class="md-layout"

      <!-- <div @click="toggleNewContactModal">
        <md-button>
          New
        </md-button>
      </div> -->
      <br>
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
      <div v-if="isLoading">
          <md-card>
            <!-- <md-card-header :style="{'background': getNavbarColour}">
              <h4 class="title">Contact Table</h4>
              <p class="category">Viewing all contacts</p>
            </md-card-header> -->
            <md-card-content>
              <div>
                <md-table v-model="allSales[0]['data']" >
                  <md-table-row slot="md-table-row" @click="toggleNewSalesInvoice()" slot-scope="{ item }">
                    <md-table-cell md-label="ID">{{ item.attributes['id'] }}</md-table-cell>
                    <md-table-cell md-label="Contact">{{ item.attributes.derived.contact }}</md-table-cell>
                    <md-table-cell md-label="Invoice Date">{{ item.attributes['invoice-date'] }}</md-table-cell>
                    <md-table-cell md-label="Invoice Number">{{ item.attributes['invoice-number'] }}</md-table-cell>
                    <md-table-cell md-label="Invoice Gross Amount">{{ item.attributes.derived.gross_amount }}</md-table-cell>
                    <md-table-cell md-label="Invoice Vat Amount">{{ item.attributes.derived.vat_price }}</md-table-cell>
                  </md-table-row>
                </md-table>
              </div>
            </md-card-content>
          </md-card>
        </div>
        <div v-if="showNewSaleInvoice">
          <salesInvoice> </salesInvoice>
        </div>
      </div>
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
      </div>
    </div>
  </div>
</template>

<script>
import salesInvoice from "@/components/Modals/Sales/NewSalesInvoice.vue";
import contactNew from "@/components/Modals/Contacts/newContact.vue";
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  components: {
    salesInvoice
    // OrderedTable,
  },
  data() {
    return {
      currentUser: null,
      isLoading: true,
      showModal: false
    };
  },
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },

  computed: {
    ...mapGetters({
      allSales: "sales/getAllSales",
      showNewSaleInvoice: "modals/getNewSaleInvoice",
      showNewContact: "modals/getNewShowContact"
    })
  },

  methods: {
    changeUser(user) {
      this.currentUser = user;
    },
    ...mapActions({
      fetchAllSales: "sales/fetchAllSales",
      toggleNewSalesInvoice: "modals/toggleNewSalesInvoice",
      toggleNewContactModal: "modals/toggleNewContactModal"
    })
  },

  created() {
    this.fetchAllSales().then(() => (this.loading = false));
    console.log("SSSSSSALEES", this.allSales);
  }
};
</script>

<style lang="css">
@import "https://dmrokfxvkn5v8.cloudfront.net/12.2.0/buoyant-app.css";
</style>