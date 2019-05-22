<template>
 <transition name="modal">
    <div class="modal-mask" v-on:click="$emit('close')">
      <div class="modal-wrapper">
        <div class="modal-container">
          <br>
          <div class="login-content">

            <label>Email</label> <br>
            <input 
              class="form-control"
              v-model="email"
              type="email"
              placeholder="email"
              label="email" />

            <br>
            <br>

            <label>Password</label> <br>
              <input 
                class="form-control"
                v-model="password"
                placeholder="password"
                type="password"
                label="password" />


              <br><br>
          </div>
          <div class="inline action-buttons">
            <button class="modal-default-button" @click="getLoginStatus">Login</button>
            <button class="modal-default-button" @click="userSignUp">Signup</button>
            <button class="modal-default-button" @click="toggleLogin">Close</button>
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
      email: "",
      password: ""
    };
  },
  name: "modal",

  methods: {
    ...mapActions({
      signIn: "user/getSignin",
      toggleLogin: "user/showLoginScreen"
    }),

    userSignUp() {
      this.$store.dispatch("user/getSignup", [this.email, this.password]);
      this.toggleLogin;
    },

    getLoginStatus() {
      this.$store.dispatch("user/getSignin", [this.email, this.password]);
      this.toggleLogin;
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
  max-height: 65%;
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
</style>