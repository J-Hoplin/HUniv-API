/* eslint-disable no-useless-escape */
/* eslint-disable no-control-regex */
/* eslint-disable prefer-regex-literals */

const Joi = require('joi');

exports.validateInstanceType = Joi.object({
    type: Joi.string().valid('normal', 'student', 'sejong-campus', 'events').required(),
}).unknown();

exports.validateNoticeByTypeList = Joi.object({
    limit: Joi.number().empty(''),
    offset: Joi.number().empty(''),
}).unknown();

exports.validateNoticeByTypeNumber = Joi.object({
    number: Joi.number().required(),
}).unknown();
