const AxiosError = require('./AxiosError');
const InvalidNoticeNumber = require('./InvalidNoticeNumber');
const InvalidNoticeType = require('./InvalidNoticeType');
const KeynotExist = require('./KeynotExist');
const OffsetUnitMultiple = require('./OffsetUnitMultiple');

module.exports = {
    ...AxiosError,
    ...InvalidNoticeNumber,
    ...InvalidNoticeType,
    ...KeynotExist,
    ...OffsetUnitMultiple,
};
