import Vue from "vue"

Vue.filter("capitalize", function (value) {
  value = value
    .toString()
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/^./, function (str) {
      return str.toUpperCase()
    })
  return value
})
