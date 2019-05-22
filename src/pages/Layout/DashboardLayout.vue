<template>
  <div class="wrapper" 
    :class="{ 'nav-open': $sidebar.showSidebar }">

    <side-bar
        :style="{'background-color': getNavbarColour}">
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="">
        <md-icon>dashboard</md-icon>
        <p class="navbar-main-item">Dashboard</p>
      </sidebar-link>

      <div @click="showContacts =! showContacts">
        <sidebar-link to="">
          <md-icon>person</md-icon>
          <p class="navbar-main-item">Contacts</p>
        </sidebar-link>
      </div>

      <div v-if="showContacts">
        <div class="md-sub-list-item-contents">
          <p class="item-name" href="contacts">All contacts</p>
        </div>
      </div>

      <div @click="showSales =! showSales">
        <sidebar-link to="">
          <md-icon>content_paste</md-icon>
          <p class="navbar-main-item">Sales</p>
        </sidebar-link>
      </div>
      
      <div v-if="showSales">
        <div class="md-sub-list-item-contents" href="/sales">
          <p class="item-name">All Sales</p>
        </div>
        <div class="md-sub-list-item-contents">
          <p class="item-name">New Sale</p>
        </div>
        <div class="md-sub-list-item-contents">
          <p class="item-name">Credit Note</p>
        </div>
        <div class="md-sub-list-item-contents">
          <p class="item-name">Sales History</p>
        </div>
      </div>

      <div @click="showPurchases = !showPurchases">
        <sidebar-link to="">
          <md-icon>library_books</md-icon>
          <p class="navbar-main-item">Purchases</p>
        </sidebar-link>
      </div>

      <div v-if="showPurchases">
        <div class="md-sub-list-item-contents">
          <p class="item-name">All Purchases</p>
        </div>
        <div class="md-sub-list-item-contents">
          <p class="item-name">New Purchase</p>
        </div>
        <div class="md-sub-list-item-contents">
          <p class="item-name">Purchase History</p>
        </div>
      </div>

      <div @click="showJournals = !showJournals">
        <sidebar-link to="">
          <md-icon>bubble_chart</md-icon>
          <p class="navbar-main-item">Journals</p>
        </sidebar-link>
      </div>

        <div v-if="showJournals">
          <div class="md-sub-list-item-contents">
            <p class="item-name">General Journal</p>
          </div>
          <div class="md-sub-list-item-contents">
            <p class="item-name">Payroll Journal</p>
          </div>
          <div class="md-sub-list-item-contents">
            <p class="item-name">All Journals</p>
          </div>
        </div>

      <div @click="showReports = !showReports">
        <sidebar-link to="">
          <md-icon>location_on</md-icon>
          <p class="navbar-main-item">Reports</p>
        </sidebar-link>
      </div>

        <div v-if="showReports">
          <div class="md-sub-list-item-contents">
            <p class="item-name">Income Statement</p>
          </div>
          <div class="md-sub-list-item-contents">
            <p class="item-name">Balance Sheet</p>
          </div>
          <div class="md-sub-list-item-contents">
            <p class="item-name">Customer Age Anaylsis</p>
          </div>
          <div class="md-sub-list-item-contents">
            <p class="item-name">Supplier Age Analysis</p>
          </div>
        </div>

      <sidebar-link to="">
        <md-icon>notifications</md-icon>
        <p class="navbar-main-item">Payroll</p>
      </sidebar-link>

      <div class="navbar-colors">
        <div class="overlay" :style="{ 'background-color': getNavbarColour }"></div>

        <div class="colour-picker-container">
          <button @click="changeBackroundColor('blue')" class="colour-picker colour-picker--delta" data-colour="delta"></button>
          <button @click="changeBackroundColor('bravo')" class="colour-picker colour-picker--bravo" data-colour="bravo"></button>
          <button @click="changeBackroundColor('green')" class="colour-picker colour-picker--charlie" data-colour="charlie"></button>
          <button @click="changeBackroundColor('red')" class="colour-picker" data-colour="alpha"></button>
        </div>
      </div>
    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content> </dashboard-content>
      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss"></style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "@/pages/Layout/MobileMenu.vue";
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    MobileMenu
  },
  data() {
    return {
      showSales: false,
      showPurchases: false,
      showJournals: false,
      showReports: false,
      showContacts: false
    };
  },
  computed: {
    ...mapGetters({
      getNavbarColour: "design/getNavbarColour"
    })
  },
  methods: {
    changeBackroundColor: function(color) {
      if (color == "green") {
        this.$store.dispatch("design/updateNavColour", "#7fc6a4");
      } else if (color == "paleblue") {
        this.$store.dispatch("design/updateNavColour", "#bce7fd");
      } else if (color == "bravo") {
        this.$store.dispatch("design/updateNavColour", "#7faac6");
      } else if (color == "blue") {
        this.$store.dispatch("design/updateNavColour", "#424651");
      } else if (color == "orange") {
        this.$store.dispatch("design/updateNavColour", "#ffcb63");
      } else if (color == "red") {
        this.$store.dispatch("design/updateNavColour", "#db5461");
      }
    }
  }
};
</script>

<style lang="scss">
$base-spacing-unit: 2em;
$color-alpha: #db5461; // red

$color-list: (
  alpha $color-alpha,
  bravo #7faac6,
  // pale-blue
    charlie #7fc6a4,
  // green
    delta #424651,
  // blue
    echo #ffcb63,
  // orange
);

.navbar-colors {
}

.overlay {
  position: relative;
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  min-height: 100vh;
  transition: background-color 250ms;
}

.colour-picker-container {
  position: absolute;
  top: 95%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.colour-picker {
  display: inline-block;
  width: $base-spacing-unit;
  height: $base-spacing-unit;
  background-color: $color-alpha;
  border: 2px solid white;
  border-radius: 50%;
  margin-right: $base-spacing-unit / 4;
  margin-bottom: $base-spacing-unit / 4;
  cursor: pointer;
  position: relative;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  transition: all 250ms;
  transform-origin: 50% 50%;

  &:before {
    position: absolute;
    content: "✔";
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    opacity: 0;
    transition: opacity 250ms;
  }

  &:hover {
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
    transform: scale(1.025);
  }

  &.is-active:before {
    opacity: 1;
  }

  &:focus,
  &:active {
    transform: scale(0.975);
    box-shadow: none;
  }
}

@each $name, $color in $color-list {
  .colour-picker--#{$name} {
    background-color: $color;
  }

  .overlay--#{$name} {
    &:after {
      background-color: $color;
    }
  }
}
</style>
