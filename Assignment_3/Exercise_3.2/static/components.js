const module = angular.module('weahterApp', [])

module.controller('WeatherController', function($http) {
  $http.get('http://localhost:8080/data')
  .then(({data: weather}) => {
    $http.get('http://localhost:8080/forecast')
    .then(({data: forecast}) => {
      console.log(weather)  
      console.log(forecast)    
    })  
  })
  .catch(console.err)
})


