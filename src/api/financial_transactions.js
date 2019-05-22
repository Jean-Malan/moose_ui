// var config = {
//   headers: { Authorization: "bearer " + token }
// }

import axios from "axios"

export default {
  allFinancialTransactions(token) {
    var transactions = []
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${window.$cookies.get("jwt_token")}`
    axios
      .get("http://localhost:4001/api/financial_transactions")
      .then(response => {
        console.log(response)
        transactions.push(response.data)
      })
      .catch(e => {
        console.log("Error: ", e)
      })
    console.log(transactions)
    return transactions
  }
}
