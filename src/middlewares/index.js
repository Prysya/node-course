const router = require('express').Router();

const parsers = require('./parsers');

router.use(parsers);

module.exports = router;
