var express = require('express');
var router = express.Router();
var Cases = require('../models/Cases');

/* GET ALL CASES */
router.get('/', function(req, res, next) {
    Cases.find(function (err, cases) {
        if (err) return next(err);
        res.json(cases);
    });
});
  
/* GET SINGLE CASES BY ID */
router.get('/:id', function(req, res, next) {
    Cases.findById(req.params.id, function (err, cases) {
        if (err) return next(err);
        res.json(cases);
    });
});
  
/* POST CASES */
router.post('/', function(req, res, next) {
    Cases.create(req.body, function (err, cases) {
        if (err) return next(err);
        res.json(cases);
    });
});
  
/* UPDATE USER */
router.put('/:id', function(req, res, next) {
    Cases.findByIdAndUpdate(req.params.id, req.body, function (err, cases) {
        if (err) return next(err);
        res.json(cases);
    });
});
  
/* DELETE USER */
router.delete('/:id', function(req, res, next) {
    Cases.findByIdAndRemove(req.params.id, req.body, function (err, cases) {
        if (err) return next(err);
        res.json(cases);
    });
});

router.get('/daily/:status',  function(req, res, next) {
    Cases.aggregate([
        {
            $match: { status: req.params.status }
        },
        {
            $group: { 
                _id: {
                    date: {
                        $dateToString: {
                            format: "%Y-%m-%d", 
                            date: "$updated"
                        }
                    }
                }, 
                count: {
                    $sum: 1
                }
            }
        },
        { $sort: {_id: 1} }
    ], function (err, cases) {
        if (err) return next(err);
        res.json(cases);
    });
});

module.exports = router;