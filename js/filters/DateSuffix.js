flickrFeedApp.filter( 'dateSuffix', [ 'dateFilter', function( dateFilter ) {
    'use strict';

    const suffixes = ["th", "st", "nd", "rd"];

    return function( date ) {

        var filteredDate = dateFilter( date, "d MMM yyyy 'at' H:mm" );
        var day = parseInt( filteredDate.slice( 0, 2 ) );
        var relevantDigits = ( day < 30 ) ? day % 20 : day % 30;
        var suffix = ( relevantDigits <= 3 ) ? suffixes[ relevantDigits ] : suffixes[ 0 ];

        // Insert date suffix into filteredDate and return
        var position = day.toString().length;
        return [ filteredDate.slice( 0, position ), suffix, filteredDate.slice( position ) ].join('');
    };
}]);
