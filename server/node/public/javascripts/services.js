// Angular service module for connecting to JSON APIs
angular.module('pollServices', ['ngResource']).
    factory('RssModel', function($resource) {
        return $resource('rssList/:rssId', {}, {
            // Use this method for getting a list of polls
            query: { method: 'GET', params: { rssId: 'rssList' }, isArray: true }
        })
    });