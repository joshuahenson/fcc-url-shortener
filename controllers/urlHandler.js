'use strict';

var ShortURL = require('../models/shortUrl.js');

function UrlHandler () {
    this.addUrl = function (req, res) {
        ShortURL.findOne({originalURL: req.params.url}, function(err, doc){
            if (err) {
                console.log(err);
            } else if(doc === null) { //doesn't exist so we create it
                ShortURL.create({
                    originalURL: req.params.url
                }, function(err, data){
                    if(err) {
                        console.log(err);
                        res.status(400).json({ error: err.errors.originalURL.message })
                    } else {
                        /*console.log(data);//debug*/
                        res.json({original_url: data.originalURL,
                        short_url: req.protocol + '://' + req.hostname + '/' + data.shortened})
                    }
                });
            } else {//already exists, return doc from db
                res.json({original_url: doc.originalURL,
                short_url: req.protocol + '://' + req.hostname + '/' + doc.shortened})
            }
        })
    };
    this.getUrl = function (req, res) {
        ShortURL.findOne({shortened: req.params.shortened}, function(err, doc){
            if (err) {
                console.log(err);
            } else if(doc === null) { //doesn't exist
                res.status(400).json({error: 'That shortcut does not exist'});
            } else {//found, redirect
                res.redirect(doc.originalURL);
            }
        })
    };
}

module.exports = UrlHandler;
