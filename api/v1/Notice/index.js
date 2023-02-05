const { Router } = require('express');
const component = require('./component');
const {
  cacheHit,
  verifyToken,
  checkUserRole,
  serviceRateLimiter,
  paramValidate,
  queryValidate,
} = require('../../../middlewares');
const validator = require('../../../validator').Notice;

const router = Router();

router.get(
  '/:type',
  verifyToken,
  checkUserRole,
  paramValidate(validator.validateInstanceType),
  queryValidate(validator.validateNoticeByTypeList),
  serviceRateLimiter,
  cacheHit,
  component.getTypeInstance,
  component.checkInstanceAvailable,
  component.getNoticeByTypeList,
);

router.get(
  '/:type/all',
  verifyToken,
  checkUserRole,
  paramValidate(validator.validateInstanceType),
  serviceRateLimiter,
  cacheHit,
  component.getTypeInstance,
  component.checkInstanceAvailable,
  component.getNoticeByTypeListAll,
);

router.get(
  '/:type/:number',
  verifyToken,
  checkUserRole,
  paramValidate(validator.validateInstanceType),
  paramValidate(validator.validateNoticeByTypeNumber),
  serviceRateLimiter,
  cacheHit,
  component.getTypeInstance,
  component.checkInstanceAvailable,
  component.getNoticeByTypeNumber,
);

module.exports = router;
