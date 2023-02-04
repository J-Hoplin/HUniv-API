const { Router } = require('express');

const router = Router();

// Routers
const notice = require('./Notice');
const auth = require('./Auth');
const weather = require('./Weather');

router.use('/notice', notice);
router.use('/auth', auth);
router.use('/weather', weather);

module.exports = router;
