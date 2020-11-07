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
  
})

function load($scope, $http) {
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
}


module.filter('dateRange', function() {
  return function(type, city, fromDate, toDate) {
    var from = new Date(fromDate);
    var to = new Date(toDate);
    var itemsInRange = [];
    for(var i = 0; i < items.length; i++) {
        var date = new Date(items[i][fieldName]);
        if(from <= date && date <= to)
            itemsInRange.push(items[i]);
    }
    return itemsInRange;
};
});

