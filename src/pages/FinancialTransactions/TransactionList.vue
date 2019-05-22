<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
      <div v-if="isLoading">
          <md-card>
            <md-card-header data-background-color="red">
              <h4 class="title">Simple Table</h4>
              <p class="category">Here is a subtitle for this table</p>
            </md-card-header>
            <md-card-content>
              <div>
                <md-table v-model="allTransactions[0]['data']" >
                  <md-table-row slot="md-table-row" slot-scope="{ item }">
                    <md-table-cell md-label="ID">{{ item.id }}</md-table-cell>
                    <md-table-cell md-label="Name">{{ item.transaction_date }}</md-table-cell>
                    <md-table-cell md-label="Email">{{ item.transaction_title }}</md-table-cell>
                    <md-table-cell md-label="City">{{ item.notes }}</md-table-cell>
                    <md-table-cell md-label="Contact">{{ item.gross_amount }}</md-table-cell>
                  </md-table-row>
                </md-table>
              </div>
            </md-card-content>
          </md-card>
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
// import { SimpleTable, OrderedTable } from "@/components";
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  components: {
    // OrderedTable,
    // SimpleTable
  },
  name: "simple-table",
  data() {
    return {
      isLoading: true
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
      allTransactions: "financialTransactions/allFinancialTransactions"
    })
  },

  methods: {
    ...mapActions({
      getAllTransactions: "financialTransactions/getAllFinancialTransactions"
    })
  },

  created() {
    this.getAllTransactions().then(() => (this.loading = false));
  }
};
</script>
