(function() {
  'use strict';

  var now = new Date();

  angular.module("bangumi", ['ngCookies', 'angular.filter'])

  .controller('BangumiController', function($scope, $http, $cookies, $filter) {
    // initialize
    var cookieKey = 'favoriteAnime';

    $scope.lastUpdate = '';

    $scope.animeList = [];

    $scope.searchFilter = {
      isFavorite: false,
      onAir: false
    };

    $scope.favoriteList = $cookies.getObject(cookieKey);

    if (!$scope.favoriteList) {
      $scope.favoriteList = [];
    }

    $http.get('list.json').then(function(response) {
      return response.data;
    }).then(function(data) {
      $scope.lastUpdate = "最近更新: " + data.lastUpdate;
      //filter outdated data
      return data.list.filter(function(item) {
        return now < new Date(item.endDate);
      });
    }).then(function(data) {
      var favoriteList = [];
      angular.forEach(data, function(item) {
        if ($scope.favoriteList.indexOf(item.key) > -1) {
          favoriteList.push(item.key); //filter outdated data
          item.isFavorite = true;
        } else {
          item.isFavorite = false;
        }
      });
      updateCookie(favoriteList);
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
      updateCookie();
      anime.isFavorite = !anime.isFavorite;
    };

    // watch & event
    $scope.$watchCollection(function(scope) {
      return scope.favoriteList;
    }, function(value) {
      if (value.length === 0) {
        $scope.searchFilter.isFavorite = false;
      }
    });

    // private functions
    function updateCookie(favoriteList) {
      if (favoriteList) {
        $scope.favoriteList = favoriteList;
      }
      $cookies.putObject(cookieKey, $scope.favoriteList);
    }
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
  })

  .filter('selectFilter', function() {
    return function(list, filter) {
      return list.filter(function(item) {
        return (filter.onAir && now > new Date(item.startDate) || !filter.onAir) &&
          (filter.isFavorite && angular.equals(item.isFavorite, true) || !filter.isFavorite);
      });
    };
  });

}());