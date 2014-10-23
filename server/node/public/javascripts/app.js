angular.module('polls', ['pollServices'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.
            when('/rsslist', { templateUrl: 'partials/list.html', controller:
                PollListCtrl }).
            when('/rssList/:rssId', { templateUrl: 'partials/item.html', controller:
                PollItemCtrl }).
            when('/new', { templateUrl: 'partials/new.html', controller:
                PollNewCtrl }).
            otherwise({ redirectTo: '/rsslist' });
    }]);