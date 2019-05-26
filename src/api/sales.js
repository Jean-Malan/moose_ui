import axios from "axios"

export default {
  allSales(token) {
    var sales = []
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${window.$cookies.get("jwt_token")}`
    axios
      .get("http://localhost:4001/api/sales_invoice")
      .then(response => {
        console.log(JSON.stringify(response.data))
        sales.push(response.data)
      })
      .catch(e => {
        console.log("Error: ", e)
      })
    return sales
  },
  postNewSaleEntry(attributes) {
    var responseData = []
    axios
      .post("http://localhost:4001/api/sales_entries", {
        type: "sales_entries",
        data: {
          attributes
        }
      })
      .then(function (response) {
        console.log("API Success", data)
        responseData.push(data)
      })
      .catch(function (error) {
        console.log(error)
      })

    return responseData
  }
}
