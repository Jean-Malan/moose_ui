<template>
<div>
  <md-toolbar md-elevation="0" class="md-transparent">
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start">
        <h3 class="md-title">{{ $route.name }}</h3>
      </div>
      <div class="md-toolbar-section-end">
        <md-button
          class="md-just-icon md-simple md-toolbar-toggle"
          :class="{ toggled: $sidebar.showSidebar }"
          @click="toggleSidebar"
        >
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </md-button>

        <div class="md-collapse">
          <div class="md-autocomplete">
            <md-autocomplete
              class="search"
              v-model="selectedEmployee"
              :md-options="employees"
            >
              <p>{{}}</p>
              <label>Search...</label>
            </md-autocomplete>
          </div>
          <md-list>
            <md-list-item href="#/">
              <i class="material-icons">dashboard</i>
              <p class="hidden-lg hidden-md">Dashboard</p>
            </md-list-item>

            <md-list-item href="#/notifications" class="dropdown">
              <drop-down>
                <a slot="title" class="dropdown-toggle" data-toggle="dropdown">
                  <i class="material-icons">person</i>
                  <p class="hidden-lg hidden-md"></p>
                </a>
                <ul class="dropdown-menu dropdown-menu-right">
                  <li><a @click="toggleLogin">Login</a></li>
                  <li><a @click="userLogout">Logout</a></li>
                </ul>
              </drop-down>
            </md-list-item>

            <md-list-item href="#/user">
              <p class="hidden-lg hidden-md">Profile</p>
            </md-list-item>
          </md-list>
        </div>
      </div>
    </div>
    Login{{showLogin}}
    
    </md-toolbar>
    <div v-if="showLogin">
      <login></login>
    </div>
  </div>
</template>

<script>
import login from "@/components/Modals/Users/login.vue";
// import login from "@/components/Modals/Users/logout.vue";
import { mapState, mapGetters, mapActions } from "vuex";
import store from "@/store/index";

export default {
  components: { login },
  data() {
    return {
      selectedEmployee: null,
      employees: [
        "Jim Halpert",
        "Dwight Schrute",
        "Michael Scott",
        "Pam Beesly",
        "Angela Martin",
        "Kelly Kapoor",
        "Ryan Howard",
        "Kevin Malone"
      ]
    };
  },

  computed: {
    ...mapGetters({
      showLogin: "user/LoginScreenState"
    })
  },

  methods: {
    userLogout() {
      console.log(this.$store.state.user.token);
      // this.$store.dispatch("user/userLogout", []);
      // this.toggleLogin;
    },
    ...mapActions({
      toggleLogin: "user/showLoginScreen",
      userLogout: "user/userLogout"
    }),
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    }
  }
};
</script>

<style lang="css"></style>
