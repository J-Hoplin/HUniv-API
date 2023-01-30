const { Router } = require('express');
const component = require('./component');

const router = Router();

router.get(
  '/:type',
  (req, res, next) => {
    try {
      const {
        type,
      } = req.params;
      req.instance = req.app.get(`scraper_${type}`);
      next();
    } catch (err) {
      next(err);
    }
  },
  component.checkInstanceAvailable,
  component.getNoticeByTypeList,
);

router.get(
  '/:type/:number',
  (req, res, next) => {
    try {
      const {
        type,
      } = req.params;
      req.instance = req.app.get(`scraper_${type}`);
      next();
    } catch (err) {
      next(err);
    }
  },
  component.checkInstanceAvailable,
  component.getNoticeByTypeNumber,
);

module.exports = router;
