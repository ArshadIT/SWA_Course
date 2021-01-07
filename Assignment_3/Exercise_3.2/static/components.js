// Using AngularJs for two-way databinding 
// Defining module

const module = angular.module('weahterApp', [])

// Module controller using $scope(application data) and $http

module.controller('WeatherController', function ($http, $scope) {

  // post function
  $scope.postdata = function (place, value, type, unit, time) {
    var data = {
      place: place,
      value: value,
      type: type,
      unit: unit,
      time: time
    };

    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
    $http.post('http://localhost:8080/data', data, {
      headers
    })
  }

  // assynchronous fecthing data
  $http.get('http://localhost:8080/data')
    .then(({
      data: weatherRecord
    }) => {
      $http.get('http://localhost:8080/forecast')
        .then(({
          data: forecastRecord
        }) => {
          $scope.weatherRecord = weatherRecord;
          $scope.forecastRecord = forecastRecord;
        })
    })
    .catch(console.err)


  // reload function
  $scope.loadData = function () {
    $http.get('http://localhost:8080/data')
      .then(({
        data: weatherRecord
      }) => {
        $http.get('http://localhost:8080/forecast')
          .then(({
            data: forecastRecord
          }) => {
            $scope.weatherRecord = weatherRecord;
            $scope.forecastRecord = forecastRecord;
            console.log('hello world')
            return;
          })
      })
      .catch(console.err)
  };
})

// filter based on date
module.filter('dateRange', function () {
  return function (items, fromDate, toDate) {
    var filtered = [];
    var from_date = Date.parse(fromDate);
    var to_date = Date.parse(toDate);
    angular.forEach(items, function (item) {
      if ((new Date(item.time) >= new Date(from_date) || !from_date) && (new Date(item.time) <= new Date(to_date) || !to_date)) {
        filtered.push(item);
      }
    });
    return filtered;
  };
});

// filter based on averageCloud
module.filter('averageCloud', function () {
  return function (items) {
    var total = 0;
    var count = 0;
    var filtered = []
    angular.forEach(items, function (item) {
      if (item.type == "cloud coverage") {
        total += parseFloat(item.value)
        count++
      }
    });
    filtered.push(total / count);
    return filtered
  };
});

// filter based on totalPrec
module.filter('totalPrec', function () {
  return function (items) {
    var total = 0;
    var filtered = []
    angular.forEach(items, function (item) {
      if (item.type == "precipitation") {
        total += parseFloat(item.value)
      }
    });
    filtered.push(total);
    return filtered
  };
});

// filter based on averagewind
module.filter('averageWind', function () {
  return function (items) {
    var total = 0;
    var filtered = []
    angular.forEach(items, function (item) {
      if (item.type == "wind speed") {
        total += parseFloat(item.value)
      }
    });
    filtered.push(total / items.length);
    return filtered
  };
});

// filter based on direction
module.filter('direction', function () {
  return function (items) {
    var filtered = []
    var temp = []
    angular.forEach(items, function (item) {
      if (item.type == "wind speed") {
        temp.push(item.direction)
      }
    });
    filtered.push(temp.sort((a,b) =>
    temp.filter(v => v===a).length
        - temp.filter(v => v===b).length
        ).pop())
    return filtered
  };
});

// filter based on minTemp
module.filter('minTemp', function () {
  return function (items) {
    var filtered = []
    var temp = []
    angular.forEach(items, function (item) {
      if (item.type == "temperature") {
        temp.push(parseFloat(item.value))
      }
    });
    filtered.push(Math.min(...temp))
    return filtered;
  };
});

// filter based on maxTemp
module.filter('maxTemp', function () {
  return function (items) {
    var filtered = []
    var temp = []
    angular.forEach(items, function (item) {
      if (item.type == "temperature") {
        temp.push(parseFloat(item.value))
      }
    });
    filtered.push(Math.max(...temp))
    return filtered;
  };
});