var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json([
    {id: 1, name: 'John', city: 'Sydney'},
    {id: 2, name: 'Steve', city: 'Sydney'}
  ]);
});

router.get('/:userId', function(req, res, next) {
  res.json(
    {id: 1, name: 'John', city: 'Sydney'}
  );
});

module.exports = router;
