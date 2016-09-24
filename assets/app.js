(function() {
  'use strict';

  angular.module("bangumi", ['angular.filter'])

  .controller('BangumiController', function($scope, $http) {
    // initialize
    $scope.animeList = [];

    $http.get('list.json').then(function(data) {
      $scope.animeList = data.data;
    });

    // scope functions
    $scope.getWeekdayClass = function(weekday) {
      var ret = {};
      ret['color-' + weekday] = true;
      return ret;
    };

    $scope.getImageStyle = function(path) {
      return {
        'background-image': 'url(' + path + ')'
      };
    };

    $scope.getHeartClass = function(anime) {
      return {
        'fa-heart-o': !anime.isFav,
        'fa-heart': anime.isFav
      };
    };

    // private functions
  })

  .filter('weekday', function() {
    return function(value) {
      var weekday = [
        '星期日',
        '星期一',
        '星期二',
        '星期三',
        '星期四',
        '星期五',
        '星期六'
      ];
      return weekday[value];
    };
  });

}());