/* eslint-disable no-useless-escape */
/* eslint-disable no-control-regex */
/* eslint-disable prefer-regex-literals */

const Joi = require('joi');

exports.validateInstanceType = Joi.object({
    campus: Joi.string().valid('seoulcampus', 'sejongcampus'),
}).unknown();
