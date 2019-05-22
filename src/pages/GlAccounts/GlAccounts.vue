<template>
  <div class="content">
    <div class="md-layout">
      <div @click="toggleNewGlAccountModal">
        <md-button>
          New Account
        </md-button>
      </div>
      <br>
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
      <div v-if="isLoading">
          <md-card>
            <md-card-header :style="{'background': getNavbarColour }">
              <h4 class="title">Contact Table</h4>
              <p class="category">Viewing all General Ledger Accounts</p>
            </md-card-header>
            <md-card-content>
              <div>
                <md-table v-model="allGlAccounts[0]['data']" >
                  <md-table-row @click="togggleEditModal(item)" slot="md-table-row" slot-scope="{ item }">
                    <md-table-cell md-label="Account Title">{{ item['title']}}</md-table-cell>
                    <md-table-cell md-label="Account Type">{{ item['account_type'] | capitalize}}</md-table-cell>
                    <md-table-cell md-label="Account Code">{{ item['account_code']}}</md-table-cell>
                  </md-table-row>
                </md-table>
              </div>
            </md-card-content>
          </md-card>
        </div>
        <div v-if="showNewGlAccount">
          <NewGlAccount> </NewGlAccount>
        </div>
        <div v-if="getEditGlAccount">
          <EditGlAccount :glAccount="currentAccount"> </EditGlAccount>
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
import NewGlAccount from "@/components/Modals/GlAccounts/NewGlAccount.vue";
import EditGlAccount from "@/components/Modals/GlAccounts/EditGlAccount.vue";
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  components: {
    NewGlAccount,
    EditGlAccount
    // OrderedTable,
  },
  data() {
    return {
      currentAccount: null,
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
      getNavbarColour: "design/getNavbarColour",
      allGlAccounts: "glAccounts/allGlAccounts",
      showNewGlAccount: "modals/getShowNewGlAccount",
      getEditGlAccount: "modals/getEditGlAccount"
    })
  },

  methods: {
    togggleEditModal(item) {
      this.currentAccount = item;
      console.log(this.currentAccount);
      this.toggleEditGlAccount();
    },
    changeUser(user) {
      this.currentUser = user;
    },
    ...mapActions({
      getAllGlAccounts: "glAccounts/getAllGlAccounts",
      // toggleShowContact: "modals/displayContactModal",
      // toggleNewContactModal: "modals/toggleNewContactModal",
      toggleNewGlAccountModal: "modals/toggleNewGlAccount",
      toggleEditGlAccount: "modals/toggleEditGlAccount"
    })
  },

  created() {
    this.getAllGlAccounts().then(() => (this.loading = false));
  }
};
</script>
