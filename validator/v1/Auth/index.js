/* eslint-disable no-useless-escape */
/* eslint-disable no-control-regex */
/* eslint-disable prefer-regex-literals */

const Joi = require('joi');

const emailPattern = "([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])";

exports.validateCheckEmail = Joi.object({
    email: Joi.string().pattern(new RegExp(emailPattern)).required(),
}).unknown();

exports.validateCheckNickname = Joi.object({
    nickname: Joi.string().required(),
}).unknown();

exports.validateJoin = Joi.object({
    nickname: Joi.string().required(),
    role: Joi.string().valid('user', 'admin').required(),
    email: Joi.string().pattern(new RegExp(emailPattern)).required(),
    password: Joi.string().max(100).required(),
}).unknown();

exports.validateLogin = Joi.object({
    nickname: Joi.string().required(),
    password: Joi.string().max(100).required(),
}).unknown();

exports.validateWithdraw = Joi.object({
    password: Joi.string().max(100).required(),
}).unknown();
