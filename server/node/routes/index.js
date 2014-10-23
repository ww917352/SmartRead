var mongoose = require('mongoose');
var db = mongoose.createConnection('localhost', 'pollsapp');
var RssSchema = require('../models/RSS.js').RssSchema;
var RssModel = db.model('rss', RssSchema);

exports.rssIndex = function(req,res){
  res.render('rssIndex', {title:'RSS'} );
};


exports.indexpage = function(req, res){
    if (req.session.passport.user === undefined ){

        res.render('index', { title: 'Smart Reading', content: 'this is a smart reading app' });
    } else {
        res.redirect('/rssList');
    }
};


exports.anypage = function(req, res){
	res.render('index', {title: "this is" + req.params.page + 'page'});
};


exports.list = function(req, res) {
    console.log('list request');
    RssModel.find({userId:req.session.passport.user.identifier}, 'name', function (error, rssSet) {
        res.json(rssSet);
    });
};

exports.delete = function(req, res) {
    console.log('list request');
    var rssId = req.params.id;
    RssModel.findByIdAndRemove(rssId,{lean: true},function (error, result) {
        if (error){
            alert('delete error');
        } else {
            res.json({success:true});
        }
    });
};

exports.rss = function(req, res){
    var rssId = req.params.id;
    RssModel.findById(rssId, '', { lean: true }, function(err, rss) {
        if(rss) {
            res.json(rss);
        } else {
            res.json({error:true});
        }
    });
};

exports.create = function(req, res){
    var reqBody = req.body,
    // Filter out choices with empty text
    //  choices = reqBody.choices.filter(function(v) { return v.text != ''; }),
    // Build up poll object to save
        userId = req.session.passport.user.identifier,
        rssObj = {userId: userId, name: reqBody.name, url: reqBody.url};

    // Create poll model from built up poll object
    var rss = new RssModel(rssObj);

    // Save poll to DB
    rss.save(function(err, doc) {
        if(err || !doc) {
            throw 'Error';
        } else {
            res.json(doc);
        }
    });
};


