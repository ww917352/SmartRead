// Managing the poll list
function PollListCtrl($scope, RssModel) {
    $scope.rssList = RssModel.query();
}
// Voting / viewing poll results
function PollItemCtrl($scope, $location, $routeParams, RssModel) {
    $scope.rss = RssModel.get({rssId: $routeParams.rssId});

    $scope.deleteRSS = function(){

       RssModel.delete({rssId:$routeParams.rssId},function(p,res){
           if(!p.error) {
               // If there is no error, redirect to the main view
               console.log(('deletion successful'));
               $location.path('rssList');
           } else {
               alert('Could not delete rss');
           }
       })
    }
    ;
}
// Creating a new poll
function PollNewCtrl($scope, $location,  RssModel) {
    $scope.rss = {

        name: '',
        url: ''
    };

    $scope.createPoll = function() {
        var rss = $scope.rss;

        // Check that a question was provided
        if(rss.name.length > 0) {


            if(rss.url.length > 0) {
                // Create a new poll from the model
                var newRss = new RssModel(rss);

                // Call API to save poll to the database
                newRss.$save(function(p, resp) {
                    if(!p.error) {
                        // If there is no error, redirect to the main view
                        $location.path('rssList');
                    } else {
                        alert('Could not create rss');
                    }
                });
            } else {
                alert('You must enter a url');
            }
        } else {
            alert('You must enter a name');
        }
    };


}



