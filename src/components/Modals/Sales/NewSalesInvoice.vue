<template>
  <div>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="page-container">
            <main class="main-content">
              <div id="invoice-app">
                <div class="header">
                  <div>
                    <h2>Tax Invoice</h2>

                    <p>Date:  <Datepicker class="pull-right" format="YYYY-MM-DD" width="20%"/></p>
                  </div>
                  <div>
                    <div class="section-spacer">
                       <md-input placeholder="Company Name" class="textarea form-control"></md-input>
                    </div>
                    <div class="section-spacer">
                        <p><strong>Bill to:</strong></p>
                          <md-input placeholder="Company Name" class="textarea form-control"></md-input>
                      </div>
                  </div>
                </div>
                <table class="responsive-table">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Item</th>
                      <th>Price/unite</th>
                      <th>Vat</th>
                      <th>Quantity</th>
                      <th>Vat</th>
                      <th>Total</th>
                      <th></th>
                    </tr>
                  </thead>
                    <tr v-for="item in items">
                      <td data-label="id"> <md-input placeholder="Item" v-model="item.id" class="textarea form-control"></md-input></td>
                      <td data-label="Item"> <md-input placeholder="Item" v-model="item.description" class="textarea form-control"></md-input></td>
                      <td data-label="Price/unite"> <md-input placeholder="Price"  v-model="item.gross_price" class="textarea form-control"></md-input></td>
                      <td data-label="Vat Type"> <md-input placeholder="Price" v-model="item.vat_type" class="textarea form-control">{{item.vat_type }}</md-input></td>
                      <td data-label="Quantity"> <md-input placeholder="Quantity"  v-model="item.quantity" class="textarea form-control"></md-input></td>
                      <td data-label="Vat Toal">{{ calcVat(item.gross_price, item.quantity, item.vat_type) }}</td>
                      <td data-label="Total">{{ (item.gross_price * item.quantity) }}</td>
                      <td class="text-right"><button @click="deleteItem" class="is-danger">Delete item</button></td>
                    </tr>
                  </table>
                    <button v-on:click="addNewItem">Add item</button>
                    <button v-on:click="save">save</button>
                    <table>
                      <tr>
                        <td>Subtotal</td>
                        <td>{{ subTotal }}</td>
                      </tr>
                      <tr>
                        <td>Discount (%)</td>
                        <td><md-input type="number" min="0" max="100" v-model="discountRate"class="textarea form-control">%</md-input></td>
                      </tr>
                      <tr>
                        <td>Tax</td>
                        <td><md-input type="number" min="0" max="100" v-model="taxRate" class="textarea form-control">%</md-input></td>
                      </tr>
                      <tr class="text-bold">
                        <td>Grand Total</td>
                        <td>{{grandTotal}}</td>
                      </tr>
                    </table>

                    <!-- <div class="section-spacer">
                      <p>Notes:</p>
                      <textarea v-on:keyup="adjustTextAreaHeight"></textarea>
                    </div>
                    
                    <div class="section-spacer">
                      <p>Terms:</p>
                      <textarea v-on:keyup="adjustTextAreaHeight"></textarea>
                    </div>
                       -->
                    <button v-on:click="printInvoice">Print Invoice</button>
                    <md-button  class="close-button" @click="toggleNewSalesInvoice">Close</md-button >
                  </div>
              </main>

          </div>
        </div>
      </div>
    </div>
  </transition name="modal">
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import Datepicker from "vuejs-datetimepicker";
export default {
  props: ["sales"],
  components: { Datepicker },
  data() {
    return {
      allSales: this.sales,
      invoiceCurrency: {
        symbol: "$",
        name: "US Dollar",
        symbol_native: "$",
        decimal_digits: 2,
        rounding: 0,
        code: "USD",
        name_plural: "US dollars"
      },
      taxRate: 0,
      discountRate: 0,
      items: [],
      originalIds: [],
      // items: [
      //   { description: "Item name", vat: 1, quantity: 4, price: 100 },
      //   { description: "Item name", vat: 0, quantity: 2, price: 22 }
      // ],
      company: {
        name: "Your company name",
        contact: "Your address\nYour tel\nYour email"
      },
      client: "Client information",
      invoiceDate: ""
    };
  },
  methods: {
    ...mapGetters({
      allSales: "sales/getAllSales"
    }),
    ...mapActions({
      fetchAllSales: "sales/fetchAllSales",
      toggleNewSalesInvoice: "modals/toggleNewSalesInvoice",
      toggleNewContactModal: "modals/toggleNewContactModal"
    }),
    addNewItem: function() {
      this.items.push({
        description: "New Item",
        vat_type: "no_vat",
        quantity: 0,
        gross_price: 0
      });
    },
    calcVat(price, quantity, vat) {
      if (vat != "no_vat") {
        var amount = price * quantity - ((price * quantity) / 115) * 100;
        return Math.round(amount * 100) / 100;
      } else {
        return 0;
      }
    },
    deleteItem: function(index) {
      this.items.splice(index, 1);
    },
    decimalDigits: function(value) {
      return (
        this.invoiceCurrency.symbol +
        " " +
        value.toFixed(this.invoiceCurrency.decimal_digits)
      );
    },
    printInvoice: function() {
      window.print();
    },
    adjustTextAreaHeight: function(event) {
      var el = event.target;
      el.style.height = "1px";
      el.style.height = 25 + el.scrollHeight + "px";
    },
    updateEntry(entry) {
      console.log("UUUUUPPPPPPPPPDDDDDDDAAAAAAAATTTEEEEEEEE");
      // this.$store.dispatch("sales/postNewSaleEntry", entry);
    },
    newEntry(entry) {
      console.log("NEEEEEEEEEEEW");
      entry["sales_invoice_id"] = this.sales.attributes["id"];
      // let data = entry, salesID];
      this.$store.dispatch("sales/postNewSaleEntry", entry);
    },
    save() {
      this.items.forEach(i => {
        this.originalIds.includes(i.id)
          ? this.updateEntry(i)
          : this.newEntry(i);
      });
    }
  },
  computed: {
    subTotal: function() {
      var total = this.items.reduce(function(accumulator, item) {
        return accumulator + item.gross_price * item.quantity;
      }, 0);
      return total;
    },
    discountTotal: function() {
      var total = this.subTotal * (this.discountRate / 100);
      return total;
    },
    taxTotal: function() {
      var total = (this.subTotal - this.discountTotal) * (this.taxRate / 100);
      return total;
    },
    grandTotal: function() {
      var total = this.subTotal - this.discountTotal + this.taxTotal;
      return total;
    }
  },
  created() {
    console.log("Leeength");
    console.log(this.sales.attributes);

    if (this.sales.attributes["sales-entries"].length > 0) {
      this.items = this.sales.attributes["sales-entries"];
      this.originalIds = this.sales.attributes["sales-entries"].map(
        se => se.id
      );
    }
    console.log("IIIIIIIIIDDDDDDDDssssssss", this.originalIds);
    console.log(this.items);
  }
};
</script>s

<style lang="scss" scoped>
$red: #ff5f6d;
$yellow: #fff;
$green: #81cf71;
$white: #fff;
$grey: darken($white, 10%);

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

.modal-container {
  max-height: 90%;
  overflow-y: scroll;
  width: 80%;
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

body {
  background: linear-gradient(to right, $white, $white);
}

.main-content {
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  @media print {
    align-items: flex-start;
  }
}

#invoice-app {
  background-color: $white;
  padding: 0.2rem;
  width: 100%;
}

.header {
  @media (min-width: 761px) {
    display: flex;
  }

  > div {
    &:nth-child(-n + 1) {
      @media (min-width: 761px) {
        order: 1;
        flex: 1;
        text-align: right;
        padding-left: 1rem;
      }
    }
  }
}

.section-spacer {
  margin: 1rem 0;
}

select {
  @media only screen and (max-width: 760px) {
    width: 100%;
  }

  @media print {
    appearance: none;
  }
}

.company-name {
  font-size: 2rem;
}

table {
  width: auto;
  border-collapse: collapse;
  margin: 2rem 0;

  thead {
    th {
      padding: 0.5rem 1rem;

      &:nth-child(-n + 1) {
        padding-left: 0;
      }
      &:nth-last-child(-n + 1) {
        padding-right: 0;
      }
    }
  }

  tr {
    border-bottom: 1px solid $grey;

    td {
      padding: 0.5rem 1rem;

      &:nth-child(-n + 1) {
        padding-left: 0;
      }
      &:nth-last-child(-n + 1) {
        padding-right: 0;
      }

      input {
        width: 100%;
      }

      .cell-with-input {
        display: flex;

        input {
          margin: 0 0.2rem;
        }
      }
    }
  }
}

.responsive-table {
  width: 100%;
  @media only screen and (max-width: 760px) {
    table,
    thead,
    tbody,
    th,
    td,
    tr {
      display: block;
    }

    thead tr {
      position: absolute;
      top: -9999px;
      left: -9999px;
    }

    tr {
      padding: 2rem 0;
    }

    td[data-label] {
      position: relative;
      padding-left: 40%;
      display: flex;
      align-items: center;

      &:before {
        content: attr(data-label);
        position: absolute;
        top: 0.5rem;
        left: 0;
        width: 35%;
        padding-right: 10px;
        white-space: nowrap;
        font-weight: bold;
      }
    }
  }
}

button {
  background-color: $green;
  border: none;
  border-radius: 100px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:focus {
    outline-color: $white;
    background-color: darken($color: $green, $amount: 7%);
  }

  &:hover {
    background-color: darken($color: $green, $amount: 5%);
  }

  @media print {
    display: none;
  }

  &.is-danger {
    background-color: $red;

    &:focus {
      background-color: darken($color: $red, $amount: 7%);
    }

    &:hover {
      background-color: darken($color: $red, $amount: 5%);
    }
  }
}

.text-right {
  text-align: right;
}

.text-bold {
  font-weight: bold;
}
</style>