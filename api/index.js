const { Router } = require('express');
const Code = require('../Code');

const router = Router();

const v1 = require('./v1');

// api health check
router.get('/health', (req, res) => {
    console.log(req.url);
    console.log(req.baseUrl);
    console.log(req.route);
    return res.status(Code.OK.httpCode).json(
        Code.messageCommon(Code.OK),
    );
});

router.use('/v1', v1);

module.exports = router;
