import axios from "axios"

export default {
  getUserToken(email, password) {
    var responseData = []
    axios
      .post("http://localhost:4001/api/users/signin", {
        email: email,
        password: password
      })
      .then(function (response) {
        window.$cookies.set("jwt_token", response.data.token) //return this
        responseData.push(response.data.token)
      })
      .catch(function (error) {
        console.log(error)
      })

    return responseData
  },
  userLogout(token) {
    axios
      .post("http://localhost:4001/api/users/signout", {})
      .then(function (response) {
        // response
        console.log(reponse)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  userSignup(email, password) {
    var responseData = []
    axios
      .post("http://localhost:4001/api/users/signup", {
        user: {
          email: email,
          password: password
        }
      })
      .then(function (response) {
        // response
        window.$cookies.set("jwt_token", response.data.token) //return this
        responseData.push(response.data.token)
      })
      .catch(function (error) {
        console.log(error)
      })

    return responseData
  }
}
