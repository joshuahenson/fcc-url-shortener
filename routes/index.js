'use strict';
var UrlHandler = require('../controllers/urlHandler.js');

module.exports = function (app) {

	var urlHandler = new UrlHandler();

    app.get('/', function(req, res) {
        res.render('index');
    });

    app.get('/new/:url(*)', urlHandler.addUrl);

    app.get('/:shortened', urlHandler.getUrl);

    app.use(function(req, res){
        res.status(404).json({error: "This is not the page you're looking for"});
    });
};
