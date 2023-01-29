const { Router } = require('express');

const router = Router();

// Routers
const notice = require('./Notice');

router.use('/notice', notice);

module.exports = router;
