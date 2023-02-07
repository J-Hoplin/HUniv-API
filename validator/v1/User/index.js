/* eslint-disable no-useless-escape */
/* eslint-disable no-control-regex */
/* eslint-disable prefer-regex-literals */

const Joi = require('joi');

exports.validateGetUserInfo = Joi.object({
    id: Joi.string().required(),
}).unknown();

exports.validateUserList = Joi.object({
    limit: Joi.number().empty(''),
    offset: Joi.number().empty(''),
}).unknown();

exports.validateChangePassword = Joi.object({
    password: Joi.string().required(),
    newpassword: Joi.string().required(),
}).unknown();
