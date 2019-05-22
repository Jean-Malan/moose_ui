<template>
 <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <br>

           <md-card-content>
              <div class="md-layout">
                <div class="md-layout-item md-small-size-100 md-size-33">
                  <md-field>
                    <label>Company</label>
                    <md-input v-model="disabled" ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                  <md-field>
                    <label>User Name</label>
                    <md-input v-model="username" type="text"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                  <md-field>
                    <label>Email Address</label>
                    <md-input v-model="email" type="email"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-50">
                  <md-field>
                    <label>First Name</label>
                    <md-input v-model="firstName" type="text"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-50">
                  <md-field>
                    <label>Last Name</label>
                    <md-input v-model="lastName" type="text"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Address</label>
                    <md-input v-model="address" type="text"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                  <md-field>
                    <label>City</label>
                    <md-input v-model="city" type="text"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                  <md-field>
                    <label>Country</label>
                    <md-input v-model="country" type="text"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                  <md-field>
                    <label>Contact Number</label>
                    <md-input v-model="contact" type="number"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-size-100">
                  <md-field maxlength="5">
                    <label>Notes</label>
                    <md-textarea v-model="notes"></md-textarea>
                  </md-field>
                </div>
              </div>
            </md-card-content>
              
            <div class="md-layout-item md-size-200">
              <md-button 
                
                class="md-raised md-success" 
                @click="postNewContact"
              >
                  Update Contact
              </md-button>
              <md-button  class="close-button" @click="toggleNewContact">Close</md-button >
            </div>

        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import store from "@/store/index";

export default {
  data() {
    return {
      email: null,
      password: null,
      username: null,
      disabled: null,
      lastName: null,
      firstName: null,
      address: null,
      country: null,
      city: null,
      contact: null,
      notes: null
    };
  },
  name: "modal",

  computed: {
    ...mapGetters({
      showLogin: "user/LoginScreenState"
    })
  },

  methods: {
    showProps() {
      console.log(this.currentUser);
    },
    ...mapActions({
      toggleNewContact: "modals/toggleNewContactModal"
    }),

    postNewContact() {
      var contact = {
        email: this.email,
        address_one: this.address,
        contact: this.contact,
        country: this.country,
        first_name: this.firstName,
        last_name: this.lastName,
        city: this.city
      };

      this.$store.dispatch("contacts/postNewContact", contact);
    }
  }
};
</script>

<style>
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
  width: 60%;
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