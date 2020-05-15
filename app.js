import './import.css';

angular
.module("myApp", ["ngRoute"]);

angular
.module("myApp")
.config(config)

config.$inject = ["$routeProvider"];

function config($routeProvider) {
  $routeProvider
  .when("/", {
    template : require('./partials/main.html')
  })
  .when("/red", {
    template : require("./partials/red.html")
  })
  .when("/green", {
    template : require("./partials/green.html")
  })
}