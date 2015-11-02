flickrFeedApp.controller( 'FlickrFeedController', [ '$scope', '$http', function( $scope, $http ) {
    'use strict';

    $scope.listView = true;

    $scope.getJSONFlickrFeed = function () {
        var url = "https://api.flickr.com/services/feeds/photos_public.gne?callback=JSON_CALLBACK&tags=potato&tagmode=all&format=json#";
        $http.jsonp(url);
    };

    window.jsonFlickrFeed = function ( data ) {
        $scope.items = data.items;
    };

    $scope.openItem = function ( item ) {
        if( event.preventDefault ) {
            event.preventDefault();
        }
        else {
            event.returnValue = false;
        }

        if ( $scope.isItemOpen( item ) ) {
            $scope.openedItem = undefined;
        } else {
            $scope.openedItem = item;
        }
        $scope.listView = false;
    };

    $scope.isItemOpen = function ( item ) {
       return $scope.openedItem === item;
   };

    $scope.isAnyItemOpen = function ( item ) {
        return $scope.openedItem !== undefined;
    };

    $scope.closeItem = function () {
        if ( event.preventDefault ) {
            event.preventDefault();
        }
        else {
            event.returnValue = false;
        }
        $scope.openedItem = undefined;
        $scope.listView = true;
    };

    $scope.getJSONFlickrFeed();
}]);
