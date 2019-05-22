import axios from "axios"

export default {
  getAllGlAccounts(token) {
    var accounts = []
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${window.$cookies.get("jwt_token")}`
    axios
      .get("http://localhost:4001/api/gl_accounts")
      .then(response => {
        accounts.push(response.data)
      })
      .catch(e => {
        console.log("Error: ", e)
      })

    return accounts
  },
  // editContact(data) {
  //   console.log("HELOOOOOOOOOOOOO")
  //   axios({
  //     method: "patch",
  //     url: "http://localhost:4001/api/contact",
  //     data: data
  //   })
  // }
  updateGlAccount(data) {
    var responseData = []
    axios
      .patch("http://localhost:4001/api/gl_accounts", {
        id: parseInt(data[0]),
        gl_account: data[1]
      })
      .then(function (response) {
        responseData.push(response)
      })
      .catch(function (error) {
        console.log(error)
      })

    return responseData
  },
  postNewGlAccount(data) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${window.$cookies.get("jwt_token")}`
    var responseData = []
    axios
      .post("http://localhost:4001/api/gl_accounts", {
        type: "gl_accounts",
        data
      })
      .then(function (response) {
        responseData.push(data)
      })
      .catch(function (error) {
        console.log(error)
      })

    return responseData
  }
}
