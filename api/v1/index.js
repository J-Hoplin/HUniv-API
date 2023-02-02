const { Router } = require('express');

const router = Router();

// Routers
const notice = require('./Notice');
const auth = require('./Auth');

router.use('/notice', notice);
router.use('/auth', auth);

module.exports = router;
