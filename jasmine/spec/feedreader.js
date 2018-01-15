/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
          expect(allFeeds).toBeDefined();
          expect(allFeeds.length).not.toBe(0);
        });


        /* This checks that each feed has a URL
         * defined for each atricle
         */

         it('URL is defined', function() {
           allFeeds.forEach(function(feed) {
             expect(feed.url).toBeDefined();
             expect(feed.url).not.toBe('');
           });
         });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

         it('Name is defined', function() {
           allFeeds.forEach(function(feed) {
             expect(feed.name).toBeDefined();
             expect(feed.name).not.toBe('');
           });
         });
       });


    /* This test suite ensures that the menu element is
     * hidden by default.
     */

    describe('The menu', function() {

      it('menu element is hidden by default', function() {
        expect($('body').hasClass('menu-hidden')).toBe(true);
      });

      /* This test ensures the menu changes
      * visibility when the menu icon is clicked.
      */

      it('menu icon click visibility toggles', function() {
        $('.menu-icon-link').click(); // first click to expand
        expect($('body').hasClass('menu-hidden')).toEqual(false);
        $('.menu-icon-link').click(); // second click to hide
        expect($('body').hasClass('menu-hidden')).toEqual(true);
      });
    });


    /* This test suite named "Initial Entries" ensures the
     * loadFeed fnction is called and completes its work and
     * has at least one .entry element within the .feed container.
     */

    describe('Initial Entries', function() {
      beforeEach(function(done) {
        loadFeed(0, done);
      });

      it('feed container has at least one entry', function() {
        var testEntry = $('.feed .entry').length;
        expect(testEntry).toBeGreaterThan(0);
      });
    });


    /* This is a test suite named "New Feed Selection"  that
     * ensures that when a new feed is loaded by the loadFeed
     * function that the content actually changes.
     */
    describe('New Feed Selection', function() {
      var feedChange1;
      var feedChange2;

      beforeEach(function(done){
        loadFeed(0, function() {
          feedChange1 = $('.feed').text(); //grab feed 1 and convert to text
          loadFeed(1, function(){
            feedChange2 = $('.feed').text(); //grab next feed and convert to text
            done();
          });
        });
      });

      //Compare the two feeds
      it('content has changed', function() {
        expect(feedChange1).not.toBe(feedChange2);
      });
    });
  }());
