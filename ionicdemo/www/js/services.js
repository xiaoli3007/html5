angular.module('starter.services', [])

.factory('Chats',['$http','ApiEndpoint', function($http,ApiEndpoint) {
  // Might use a resource here that returns a JSON array
  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }];

  var appapi= 'http://192.168.1.100:8001';

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    },
    getdata: function(page) {
      //var  myUrl ="http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page=1&callback=JSON_CALLBACK";
      var  myUrl = appapi+"/applist/?page="+page+"&callback=JSON_CALLBACK";
      //return $http.jsonp(myUrl,{cache:false});
      return $http.get(myUrl);
    },
    getone: function(chatId) {
      var  myUrl = appapi+"/app_photo_show/?id="+chatId+"&callback=JSON_CALLBACK";
      //return $http.jsonp(myUrl,{cache:false});
      return $http.get(myUrl);
    }

  };
}]);
