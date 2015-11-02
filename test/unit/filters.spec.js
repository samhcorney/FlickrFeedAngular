describe('filter', function () {

    beforeEach( module( 'flickrFeed' ) );

    describe('regex', function() {

        it( 'should extract from string given a particular regex', function () {
            inject( function ( regexFilter ) {
                expect( regexFilter( '<a href="https://www.google.com" title="potato">link</a></p> <p>abcd<br /> efg </p>', '<\/a><\/p> <p>(.*)<\/p>' ) ).toBe( 'abcd<br /> efg ' );
                expect( regexFilter( 'nobody@flickr.com (author_123)', '[(](.*)[)]' ) ).toBe( 'author_123' );
            });
        });
    });

    describe('dateSuffix', function() {

        it( "should format a date in the format '1st Nov 2015 at 13:00'", function () {
            inject( function ( dateSuffixFilter ) {
                expect( dateSuffixFilter( '2015-11-01T13:00:00Z' ) ).toBe( '1st Nov 2015 at 13:00' );
            });
        });
    });

    describe('split', function() {

        it( "should return an array from a string split using a given separator", function () {
            inject( function ( splitFilter ) {
                expect( splitFilter( 'a b c', ' ' ) ).toEqual( [ 'a', 'b', 'c' ] );
            });
        });
    });
});
