<template>
  <div class="content">
    <div class="md-layout">
      <div @click="toggleNewContactModal">
        <md-button>
          Hi
        </md-button>
      </div>
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
                <md-table v-model="allContacts[0]['data']" >
                  <md-table-row @click="ContactModal(item.attributes)"  slot="md-table-row" slot-scope="{ item }">
                    <md-table-cell md-label="ID">{{ item.attributes['id'] }}</md-table-cell>
                    <md-table-cell md-label="Name">{{ item.attributes['first-name'] }}</md-table-cell>
                    <md-table-cell md-label="Email">{{ item.attributes.email }}</md-table-cell>
                    <md-table-cell md-label="City">{{ item.attributes.city }}</md-table-cell>
                    <md-table-cell md-label="Contact">{{ item.attributes['contact-number'] }}</md-table-cell>
                  </md-table-row>
                </md-table>
              </div>
            </md-card-content>
          </md-card>
        </div>
        <div v-if="showContactModal">
          <contactShow :user="currentUser"> </contactShow>
        </div>
        <div v-if="showNewContact">
          <contactNew> </contactNew>
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
import contactShow from "@/components/Modals/Contacts/showContact.vue";
import contactNew from "@/components/Modals/Contacts/newContact.vue";
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  components: {
    contactShow,
    contactNew
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
      getNavbarColour: "design/getNavbarColour",
      allContacts: "contacts/allContacts",
      showContactModal: "modals/getEditGlAccount",
      showNewContact: "modals/getNewShowContact"
    })
  },

  methods: {
    ContactModal(user) {
      console.log("hi");
      this.changeUser(user);
      this.toggleEditContact();
      console.log(this.currentUser);
    },
    changeUser(user) {
      this.currentUser = user;
    },
    ...mapActions({
      getAllContacts: "contacts/getAllContacts",
      toggleEditContact: "modals/toggleEditGlAccount",
      toggleNewContactModal: "modals/toggleNewContactModal"
    })
  },

  created() {
    this.getAllContacts().then(() => (this.loading = false));
  }
};
</script>
