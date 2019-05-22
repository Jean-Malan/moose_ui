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
                    <h1>Invoice Builder</h1>
                    <p>Date:  <input type="date" ></p>
                  </div>
                  <div>
                    <div class="section-spacer">
                      <input type="text" placeholder="Company Name" class="company-name">
                      <textarea v-on:keyup="adjustTextAreaHeight"></textarea>
                    </div>
                    <div class="section-spacer">
                        <p><strong>Bill to:</strong></p>
                        <textarea v-on:keyup="adjustTextAreaHeight"></textarea>
                      </div>
                  </div>
                </div>
                <!-- <div>
                  <label for="currency-picker">Currency:</label>
                  <select id="currency-picker" v-model="invoiceCurrency">
                      <option v-for="currency in currencies" :value="currency">{{ currency.code }} - {{ currency.name }}</option>
                  </select>
                </div> -->
                <table class="responsive-table">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Item</th>
                      <th>Price/unite</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th></th>
                    </tr>
                  </thead>
                    <tr v-for="item in items">
                      <td data-label="No"></td>
                      <td data-label="Item"><input type="text" /></td>
                      <td data-label="Price/unite"><div class="cell-with-input"> <input type="number" min="0" /></div></td>
                      <td data-label="Quantity"><input type="number" min="0"  /></td>
                      <td data-label="Total"></td>
                      <td class="text-right"><button @click="deleteItem" class="is-danger">Delete item</button></td>
                    </tr>
                  </table>

                    <button v-on:click="addNewItem">Add item</button>
                    <table>
                      <!-- <tr>
                        <td>Subtotal</td>
                        <td>{{ decimalDigits(subTotal) }}</td>
                      </tr> -->
                      <tr>
                        <td><div class="cell-with-input">Discount <input class="text-right" type="number" min="0" max="100" v-model="discountRate" />%</div></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td><div class="cell-with-input">Tax <input class="text-right" type="number" min="0" max="100" v-model="taxRate" />%</div></td>
                        <td></td>
                      </tr>
                      <tr class="text-bold">
                        <td>Grand Total</td>
                        <td></td>
                      </tr>
                    </table>

                    <div class="section-spacer">
                      <p>Notes:</p>
                      <textarea v-on:keyup="adjustTextAreaHeight"></textarea>
                    </div>
                    
                    <div class="section-spacer">
                      <p>Terms:</p>
                      <textarea v-on:keyup="adjustTextAreaHeight"></textarea>
                    </div>
                      
                    <button v-on:click="printInvoice">Print Invoice</button>
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
export default {
  data() {
    return {
      invoiceCurrency: {
        symbol: "$",
        name: "US Dollar",
        symbol_native: "$",
        decimal_digits: 2,
        rounding: 0,
        code: "USD",
        name_plural: "US dollars"
      },
      taxRate: 20,
      discountRate: 0,
      items: [
        { description: "Item name", quantity: 0, price: 0 },
        { description: "Item name", quantity: 0, price: 0 }
      ],
      currencies: [
        {
          symbol: "$",
          name: "US Dollar",
          symbol_native: "$",
          decimal_digits: 2,
          rounding: 0,
          code: "USD",
          name_plural: "US dollars"
        },
        {
          symbol: "CA$",
          name: "Canadian Dollar",
          symbol_native: "$",
          decimal_digits: 2,
          rounding: 0,
          code: "CAD",
          name_plural: "Canadian dollars"
        },
        {
          symbol: "€",
          name: "Euro",
          symbol_native: "€",
          decimal_digits: 2,
          rounding: 0,
          code: "EUR",
          name_plural: "euros"
        },
        {
          symbol: "AED",
          name: "United Arab Emirates Dirham",
          symbol_native: "د.إ.‏",
          decimal_digits: 2,
          rounding: 0,
          code: "AED",
          name_plural: "UAE dirhams"
        },
        {
          symbol: "Af",
          name: "Afghan Afghani",
          symbol_native: "؋",
          decimal_digits: 0,
          rounding: 0,
          code: "AFN",
          name_plural: "Afghan Afghanis"
        }
      ],
      company: {
        name: "Your company name",
        contact: "Your address\nYour tel\nYour email"
      },
      client: "Client information",
      invoiceDate: ""
    };
  },
  methods: {
    addNewItem: function() {
      this.items.push({ description: "Item name", quantity: 0, price: 0 });
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
    }
  },
  computed: {
    // subTotal: function() {
    //   var total = this.items.reduce(function(accumulator, item) {
    //     return accumulator + item.price * item.quantity;
    //   }, 0);
    //   return total;
    // },
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
  }
};
</script>s

<style lang="scss" scoped>
$red: #ff5f6d;
$yellow: #ffc371;
$green: #81cf71;
$white: #faebd7;
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

body {
  background: linear-gradient(to right, $red, $yellow);
}

.main-content {
  min-height: 100vh;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  @media print {
    align-items: flex-start;
  }
}

#invoice-app {
  background-color: $white;
  padding: 2rem;
  border-radius: 0.5rem;
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

input,
select,
textarea {
  background-color: transparentize($color: white, $amount: 0.7);
  border: none;
  display: inline-block;
  transition: background-color 0.3s ease-in-out;
  width: 100%;

  &:focus {
    outline-color: $yellow;
    background-color: transparentize($color: white, $amount: 0.4);
  }

  &:hover {
    background-color: transparentize($color: white, $amount: 0.5);
  }

  @media print {
    background-color: transparent;
  }

  @media only screen and (min-width: 761px) {
    width: auto;
  }
}

textarea {
  width: 100%;
  min-height: 80px;
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
    outline-color: $yellow;
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