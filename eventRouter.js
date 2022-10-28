var express = require('express');
var router = express.Router();
const Helper  = require('./helper.js');

router.get('/', (req, res) => {
    Helper.getTodaysPastEvents()
        .then((event) => {
            res.status(200).json(event);
        });
});

module.exports = router;