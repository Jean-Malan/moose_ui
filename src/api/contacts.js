import axios from "axios"

export default {
  getAllContacts(token) {
    var contacts = []
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${window.$cookies.get("jwt_token")}`
    axios
      .get("http://localhost:4001/api/contact")
      .then(response => {
        contacts.push(response.data)
      })
      .catch(e => {
        console.log("Error: ", e)
      })

    return contacts
  },

  editGlAccount(data) {
    var responseData = []
    axios
      .patch("http://localhost:4001/api/contact", {
        data: data
      })
      .then(function (response) {
        responseData.push(response)
      })
      .catch(function (error) {
        console.log(error)
      })
    return responseData
  },
  newContact(data) {
    var responseData = []
    axios
      .post("http://localhost:4001/api/contact", {
        type: "gl_accounts",
        data: {
          attributes: {
            data
          }
        }
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
