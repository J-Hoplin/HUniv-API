const { Router } = require('express');
const component = require('./component');
const {
  cacheHit,
} = require('../../../middlewares');

const router = Router();

router.get(
  '/:type',
  cacheHit,
  component.getTypeInstance,
  component.checkInstanceAvailable,
  component.getNoticeByTypeList,
);

router.get(
  '/:type/all',
  cacheHit,
  component.getTypeInstance,
  component.checkInstanceAvailable,
  component.getNoticeByTypeListAll,
);

router.get(
  '/:type/:number',
  cacheHit,
  component.getTypeInstance,
  component.checkInstanceAvailable,
  component.getNoticeByTypeNumber,
);

module.exports = router;
