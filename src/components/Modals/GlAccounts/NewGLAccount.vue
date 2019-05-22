<template>
 <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <br>

           <md-card-content>
              <div class="md-layout">
                <div class="md-layout-item md-small-size-100 md-size-90">
                  <md-field>
                    <label>Title</label>
                    <md-input v-model="title" ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-90">
                  <md-field>
                    <label>Code</label>
                    <md-input v-model="code" type="text"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-90">
                    <Dropdown
                      :options="accounts"
                      v-on:selected="updateNewAccount"
                      :data="accounts.id"
                      :disabled="false"
                      :minItem="10"
                      :maxItem="10"
                      placeholder="Select a client"
                      style="border:none;height:200%;width:300px;font-size:22px;">
                  </Dropdown>
                </div>
              </div>
            </md-card-content>
              
            <md-button :style="{'background': btnColour}"  @click="postAccount">Update Contact</md-button>
            <md-button @click="toggleNewContact">Close</md-button> 
            <br>

        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import store from "@/store/index";
import Dropdown from "vue-simple-search-dropdown";
import vSelect from "vue-select";

export default {
  components: {
    Dropdown,
    "v-select": vSelect
  },
  data() {
    return {
      object: {
        name: "Object Name"
      },
      accounts: [
        { id: 0, name: "Current Asset" },
        { id: 1, name: "Non Current Asset" },
        { id: 2, name: "Current Liability" },
        { id: 3, name: "Non Current Liability" },
        { id: 4, name: "Equity" },
        { id: 5, name: "Cost of Sales" },
        { id: 6, name: "Operating Expense" },
        { id: 7, name: "Sales" },
        { id: 8, name: "Other Income" }
      ],
      title: null,
      code: null,
      account: null
    };
  },
  name: "modal",

  computed: {
    ...mapGetters({
      showLogin: "user/LoginScreenState"
    }),
    btnColour() {
      var colour = this.navbarColour();
      console.log(colour);
      return colour + "!important";
    }
  },

  methods: {
    updateNewAccount(ev) {
      console.log(ev.id);
      this.account = ev.id;
    },
    methodToRunOnSelect(payload) {
      this.object = payload;
    },
    showProps() {
      console.log(this.currentUser);
    },
    ...mapActions({
      toggleNewContact: "modals/toggleNewContactModal"
    }),

    ...mapGetters({
      navbarColour: "design/getNavbarColour"
    }),

    postAccount() {
      var attributes = {
        title: this.title,
        account_code: this.code,
        account_type: this.account
      };

      this.$store.dispatch("glAccounts/postNewGlAccount", attributes);
    }
  }
};
</script>

<style>
.dropdown {
  width: 100%;
}
label {
  font-size: x-large;
  padding-bottom: 15%;
}
input {
  width: 80%;
  font-size: larger;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.4s ease;
}

button {
  border: none;
  background: #52af45;
  color: #fff;
  padding: 10px;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.login-content {
  margin-left: 10%;
  margin-top: 5%;
}
.modal-container {
  max-height: 100%;
  width: 30%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  -webkit-box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-default-button {
  margin-left: 40%;
  cursor: pointer;
}

///
.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(0.95);
  transform: scale(0.95);
}

.action-buttons {
  margin-left: 25%;
}
/* .wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
} */

.contact-card {
  margin: 25px;
  flex: 1 1 100%;
  max-width: 820px;
}

.contact-card > .mdl-card__supporting-text > .mdl-list {
  margin-top: 0;
  padding-top: 0;
}

.contact-card > .mdl-card__title {
  color: #fff;
  background: url("https://images.unsplash.com/photo-1445052520430-32c8ebc92fe3?crop=entropy&dpr=2&fit=crop&fm=jpg&h=825&ixjsv=2.1.0&ixlib=rb-0.3.5&q=50&w=1450")
    no-repeat center center;
  background-size: cover;
  position: relative;
}

.contact-card > .mdl-card__title > .mdl-card__title-text {
  padding-top: 30%;
  font-size: 12px;
  margin-left: 16px;
}

.contact-card > .mdl-card__title > .mdl-button--fab {
  position: absolute;
  right: 16px;
  bottom: -25px;
  overflow: hidden;
}

.contact-card > .mdl-card__menu {
  color: #fff;
}

@media (min-width: 720px) {
  .contact-card > .mdl-card__title {
    height: 360px;
  }

  .contact-card > .mdl-card__title > .mdl-card__title-text {
    font-size: 44px;
    margin-bottom: 16px;
    margin-left: 80px;
  }

  .contact-card > .mdl-card__supporting-text {
    padding: 32px;
  }
}
</style>