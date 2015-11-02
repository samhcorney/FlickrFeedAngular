flickrFeedApp.filter( "split", [ function () {
    'use strict';

    return function ( input, splitChar ) {

        return input.split( splitChar );
    };
}]);
