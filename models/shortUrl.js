'use strict';

var mongoose = require('mongoose');

function shortenURL(num) {
    const KEYS = 'bcdfghjkmnpqrstvwxyz23456789BCDFGHJKLMNPQRSTVWXYZ',
        BASE = KEYS.length;
    var str = '';
    while (num > 0) {
        str = KEYS.charAt(num % BASE) + str;
        num = Math.floor(num / BASE);
    }
    return str;
}
//create an auto incrementing number to tie to shortened URL
function sequenceGenerator(name) {
    var SequenceSchema, Sequence;
    SequenceSchema = new mongoose.Schema({
        nextSeqNumber: {
            type: Number,
            default: 1
        }
    });
    Sequence = mongoose.model(name + 'Seq', SequenceSchema);
    return {
        next: function(callback) {
            Sequence.find(function(err, data) {
                if (err) {
                    throw (err);
                }
                if (data.length < 1) {
                    // create if doesn't exist create and return first
                    Sequence.create({}, function(err, seq) {
                        if (err) {
                            throw (err);
                        }
                        callback(seq.nextSeqNumber);
                    });
                } else {
                    // update sequence and return next
                    Sequence.findByIdAndUpdate(data[0]._id, {
                        $inc: {
                            nextSeqNumber: 1
                        }
                    }, function(err, seq) {
                        if (err) {
                            throw (err);
                        }
                        callback(seq.nextSeqNumber);
                    });
                }
            });
        }
    };
}
// sequence instance
var sequence = sequenceGenerator('ShortURL');

var ShortURLSchema = new mongoose.Schema({
    originalURL: {
        type: String,
        validate: {
            validator: function(v) {
                return /^https?\:\/\/\w+\./.test(v);//super basic regex test
            },
            message: '{VALUE} is not a valid URL. It must start with http!'
        }
    },
    shortened: String,
});

ShortURLSchema.pre('save', function(next) {
    var doc = this;
    // get the next sequence
    sequence.next(function(nextSeq) {
        doc.shortened = shortenURL(nextSeq);
        next();
    });
});

module.exports = mongoose.model('ShortURL', ShortURLSchema);
