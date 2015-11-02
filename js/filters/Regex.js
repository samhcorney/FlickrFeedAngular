flickrFeedApp.filter( "regex", [ function () {
    'use strict';

    return function ( text, reg ) {

        var result = text.match( new RegExp(reg) );
        return result && result.length > 1 ? result[1] : '';
    };
}]);
