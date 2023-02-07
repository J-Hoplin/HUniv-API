const { Router } = require('express');

const router = Router();

// Routers
const notice = require('./Notice');
const auth = require('./Auth');
const weather = require('./Weather');
const key = require('./APIKey');
const user = require('./User');

router.use('/notice', notice);
router.use('/auth', auth);
router.use('/weather', weather);
router.use('/api-token', key);
router.use('/user', user);

module.exports = router;
