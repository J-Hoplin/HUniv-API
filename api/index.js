const { Router } = require('express');
const Code = require('../Code');

const router = Router();

const v1 = require('./v1');

router.get('/health', (req, res) => res.status(Code.OK.httpCode).json(
    Code.messageCommon(Code.OK),
));

router.use('/v1', v1);

module.exports = router;
