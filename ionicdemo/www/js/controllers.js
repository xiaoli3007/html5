angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$ionicTabsDelegate) {


  $scope.$on('$ionicView.enter', function() {
    //关闭tab选项卡
    console.log('进来之前');
    $ionicTabsDelegate.showBar(true);
  });

  console.log('1111');
  $scope.images = [];
  for (var i = 0; i < 5; i++) {
    $scope.images.push('http://192.168.1.100:8001/media/photo/lisi/774/8c824c103c5d0dadfac52b976251c225.jpg');
  }

  $scope.getItemHeight = function(item, index) {
    //使索引项平均都有10px高，例如
    return (index % 2) === 0 ? 50 : 60;
  };

})

.controller('ChatsCtrl', function($scope, Chats,$timeout,$rootScope,$ionicTabsDelegate) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  //$scope.chats = Chats.all();

   var page =1 ;
   var is_end = 1 ;
  Chats.getdata(page).success(function(data){

       $scope.chats = data;
      //alert(data[1]['item_result']);
    }).error(function(){
       alert('加载失败!111');
    });


  $scope.load_more = function(){
    $timeout(function(){

      //alert(1111);
      page++;
      Chats.getdata(page).success(function(moredata){

        for (items in moredata)
        {
           //alert(moredata[items]['item_result']);
          $scope.chats.push(moredata[items]);
        }
        //alert(moredata[1]['item_result']);


      }).error(function(){

        is_end = 0 ;
        alert('加载失败2222');

      });

      $scope.$broadcast("scroll.infiniteScrollComplete");
    },500);
  };


  //$scope.remove = function(chat) {
  //  Chats.remove(chat);
  //};
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats,$ionicTabsDelegate) {
  //$scope.chat = Chats.get($stateParams.chatId);

  //在此作用域下绑定监听ionic视图在进入之前的事件
  $scope.$on('$ionicView.beforeEnter', function() {
    //关闭tab选项卡
    console.log('进来之前');
    $ionicTabsDelegate.showBar(false);
  });
  //在此作用域下绑定监听ionic视图在离开之前的事件
  $scope.$on('$ionicView.beforeLeave', function() {
    //打开tab选项卡
    console.log('离开之前');
    $ionicTabsDelegate.showBar(true);
  });

  Chats.getone($stateParams.chatId).success(function(data){

    $scope.chat = data;
    //alert(data['title']);
  }).error(function(){
    alert('失败！ ');
  });


})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
