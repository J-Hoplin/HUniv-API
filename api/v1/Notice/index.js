const { Router } = require('express');
const component = require('./component');
const {
  cacheHit,
  validateAPIKey,
  serviceRateLimiter,
  paramValidate,
  queryValidate,
} = require('../../../middlewares');
const validator = require('../../../validator').Notice;

const router = Router();

router.get(
  '/:type',
  validateAPIKey,
  serviceRateLimiter,
  cacheHit,
  paramValidate(validator.validateInstanceType),
  queryValidate(validator.validateNoticeByTypeList),
  component.getTypeInstance,
  component.checkInstanceAvailable,
  component.getNoticeByTypeList,
);

router.get(
  '/:type/all',
  validateAPIKey,
  serviceRateLimiter,
  cacheHit,
  paramValidate(validator.validateInstanceType),
  component.getTypeInstance,
  component.checkInstanceAvailable,
  component.getNoticeByTypeListAll,
);

router.get(
  '/:type/:number',
  validateAPIKey,
  serviceRateLimiter,
  cacheHit,
  paramValidate(validator.validateInstanceType),
  paramValidate(validator.validateNoticeByTypeNumber),
  component.getTypeInstance,
  component.checkInstanceAvailable,
  component.getNoticeByTypeNumber,
);

module.exports = router;
