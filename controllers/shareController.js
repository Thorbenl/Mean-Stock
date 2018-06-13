const express = require('express');
const router = express.Router();

const Share = require('../models/share');


router.get('/', (req, res) => {
    Share.find((err, docs) => {
        if (!err) {
            res.send(docs);
        }
        else {
            console.log('Error in retrieving data :' + JSON.stringify((err, undefined, 2)))
        }
    });
});


router.post('/', (req, res) => {
    let newShare = {
        name: req.body.name,
        rates: [{
            value: req.body.value
        }]
    };
    Share.create(newShare, function(err, createdShare){
        if(err){
            console.log('Error in retrieving data :' + JSON.stringify((err, undefined, 2)))
        } else {
            res.redirect("/shares");
        }
    });
});


router.get('/:id', (req,res) => {
    Share.findById(req.params.id, function(err, foundShare) {
        if(err || !foundShare){
            res.redirect("back")
        } else {
            res.send(foundShare);
        }
    });
});

router.put('/:id', (req, res) => {
    Share.findByIdAndUpdate(req.params.id, {
            $push: {
                rates: {
                    value: req.body.value
                }
            }
        }, {
            upsert: true
        },
        (err, updatedShare) => {
            if (err) {
                res.send(err);
            } else {
                return res.json({ success: true, message: 'A single stock was updated!' });
            }
        });
});

router.delete("/:id", (req, res) => {
    Share.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("back");
        } else {
            res.send("deleted");
        }
    });
});

module.exports = router;