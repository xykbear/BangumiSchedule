(function() {
  'use strict';

  angular.module("bangumi", ['ngCookies', 'angular.filter'])

  .controller('BangumiController', function($scope, $http, $cookies) {
    // initialize
    var favoriteKey = 'favoriteAnime';

    $scope.animeList = [];

    $scope.favoriteList = $cookies.getObject(favoriteKey);

    if (!$scope.favoriteList) {
      $scope.favoriteList = [];
    }

    $http.get('list.json').then(function(response) {
      return response.data;
    }).then(function(data) {
      angular.forEach(data, function(item) {
        if ($scope.favoriteList.indexOf(item.key) > -1) {
          item.isFavorite = true;
        } else {
          item.isFavorite = false;
        }
      });
      $scope.animeList = data;
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
        'fa-heart-o': !anime.isFavorite,
        'fa-heart': anime.isFavorite
      };
    };

    $scope.toggleFavorite = function(anime) {
      if (anime.isFavorite) {
        $scope.favoriteList = $scope.favoriteList.filter(function(key) {
          return key != anime.key;
        });
      } else {
        $scope.favoriteList.push(anime.key);
      }
      $cookies.putObject(favoriteKey, $scope.favoriteList);
      anime.isFavorite = !anime.isFavorite;
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