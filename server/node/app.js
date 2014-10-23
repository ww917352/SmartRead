
/**
 * Module dependencies
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

//required for authentication with google passport
var passport = require('passport')
    , GoogleStrategy = require('passport-google').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('resources', path.join(__dirname, 'resources'));
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use( express.cookieParser() );
app.use(express.session({secret:'thisismysupersecret'}));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


//google passport configuration
var passport = require('passport')
    , GoogleStrategy = require('passport-google').Strategy;

passport.use(new GoogleStrategy({
        returnURL: 'http://localhost:3000/auth/google/return',
        realm: 'http://localhost:3000/'
    },
    function(identifier, profile, done) {

        process.nextTick(function () {

                // To keep the example simple, the user's Google profile is returned to
                // represent the logged-in user.  In a typical application, you would want
                // to associate the Google account with a user record in your database,
                // and return that user instead.
                profile.identifier = identifier;
                return done(null, profile);


    });
    }
));
app.get('/', routes.indexpage);
app.get('/rssList', routes.rssIndex);
app.get('/rssList/rssList', routes.list);
app.get('/rssList/:id', routes.rss);
app.post('/rssList', routes.create);
app.del('/rssList/:id', routes.delete);
app.get('/:page', routes.anypage);
app.get('/users', user.list);

// Redirect the user to Google for authentication.  When complete, Google
// will redirect the user back to the application at
//     /auth/google/return
app.get('/auth/google', passport.authenticate('google'));

// Google will redirect the user to this URL after authentication.  Finish
// the process by verifying the assertion.  If valid, the user will be
// logged in.  Otherwise, authentication has failed.
app.get('/auth/google/return',
    passport.authenticate('google', { successRedirect: '/rssList',
        failureRedirect: '/' }));


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
  console.log('__dirname :' + __dirname );
});
