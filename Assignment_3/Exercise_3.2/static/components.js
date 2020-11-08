const module = angular.module('weahterApp', [])

module.controller('WeatherController', function($http, $scope) {
  $scope.postdata = function (place, value, type, unit, time) {
  
    var data = {
    place: place,
    value: value,
    type: type,
    unit: unit,
    time: time 
  };
  
  const headers = { 'Content-Type': 'application/json', Accept: 'application/json' }
  $http.post('http://localhost:8080/data',data,{ headers })
  }
    
  $http.get('http://localhost:8080/data')
  .then(({data: weatherRecord}) => {
    $http.get('http://localhost:8080/forecast')
    .then(({data: forecastRecord}) => {
      $scope.weatherRecord = weatherRecord;
      $scope.forecastRecord = forecastRecord; 
    })
  })
  .catch(console.err)

  $scope.loadData = function () {
    $http.get('http://localhost:8080/data')
    .then(({data: weatherRecord}) => {
      $http.get('http://localhost:8080/forecast')
      .then(({data: forecastRecord}) => {
        $scope.weatherRecord = weatherRecord;
        $scope.forecastRecord = forecastRecord; 
      })
    })
    .catch(console.err)
  };


  $scope.filterDate = function (dateFrom, dateTo ) {
    var from_date = dateFrom;
    var to_date = dateTo;
    console.log(dateFrom)
    $scope.weatherRecord.filter(el => 
   ((new Date(el.time) >= new Date(from_date) || !from_date) && (new Date(el.time) <= new Date(to_date) || !to_date)))

   
   $scope.weatherRecord = $scope.weatherRecord.filter(el => 
    ((new Date(el.time) >= new Date(from_date) || !from_date) && (new Date(el.time) <= new Date(to_date) || !to_date)))
    console.log( $scope.weatherRecord)
  };
})

 





