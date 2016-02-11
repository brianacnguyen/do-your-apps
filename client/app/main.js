// do not tamper with this code in here, study it, but do not touch
// this Auth controller is responsible for our client side authentication
// in our signup/signin forms using the injected Auth service
angular.module('doYourApps.main', [])

.controller('MainController', function ($scope) {
  $scope.display = {
    daysApplied: null,
    minAppsNeeded: null,
    min: {
      lost: false,
      saved: false,
      breakEven: false
    },
    max: {
      lost: false,
      saved: false,
      breakEven: false
    }
  }
  $scope.moneyLost = function(salary, apps, start) {
    // needs to work 260 days a year - 52 weeks - 5 days/week
    var results = {
      lost: false,
      saved: false,
      breakEven: false
    };
    var dailySalary = salary/260;
    var currentDate = new Date();
    var daysApplied = Math.floor(((currentDate - start) / (1000*60*60*24)*6/7)) + 1;
    var minAppsNeeded = 5 * daysApplied;
    var convertMoney = function(amount) {
      var wholeAmount = Math.floor(amount);
      var decimals = (Math.floor((amount - wholeAmount) * 100)/100).toString().substring(1);
      var wholeAmountString = wholeAmount.toString();
      var pattern = /(-?\d+)(\d{3})/;
      while (pattern.test(wholeAmountString))
          wholeAmountString = wholeAmountString.replace(pattern, "$1,$2");
      return "$" + wholeAmountString + decimals;
    };
    if (apps < minAppsNeeded) {
      var appsBehind = minAppsNeeded - apps;
      var amountLost = (appsBehind / 5) * dailySalary;
      var daysToCatchUp = appsBehind / 3;
      results.lost = true;
      results.amountLost = convertMoney(amountLost);
      results.daysToCatchUp = Math.ceil(daysToCatchUp);
    } else if (apps > minAppsNeeded) {
      var appsAhead = apps - minAppsNeeded;
      var amountSaved = (appsAhead / 10) * dailySalary;
      results.saved = true;
      results.amountSaved = convertMoney(amountSaved);
    } else {
      results.breakEven = true;
    }
    results.daysApplied = Math.floor(daysApplied);
    results.minAppsNeeded = minAppsNeeded
    return results;
  }

  $scope.rangeCalculate = function() {
    var min = $scope.moneyLost($scope.minDesired, $scope.appsCompleted, new Date($scope.startDate));
    var max = $scope.moneyLost($scope.maxDesired, $scope.appsCompleted, new Date($scope.startDate));
    $scope.display = {
      daysApplied: min.daysApplied,
      minAppsNeeded: min.minAppsNeeded,
      min: min,
      max: max
    }
  };

  $scope.reset = function() {
    $scope.minDesired = null;
    $scope.maxDesired = null;
    $scope.appsCompleted = null;
    $scope.startDate = null;
    $scope.display = {
      daysApplied: null,
      minAppsNeeded: null,
      min: {
        lost: false,
        saved: false,
        breakEven: false
      },
      max: {
        lost: false,
        saved: false,
        breakEven: false
      }
    }
  }
  $scope.minDesired;
  $scope.maxDesired;
  $scope.appsCompleted;
  $scope.startDate;
  $scope.currentDate = new Date();
});
