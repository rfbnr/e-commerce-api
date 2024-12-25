import { NextFunction, type Request, type Response } from "express";
import Joi from "joi";
import { MESSAGE_CODE } from "../utils/error-code";
import { HandleResponse } from "../utils/handle-response";

export const validateRequest = (body: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const bv = body.validate(req.body, { abortEarly: false });

    const errors = [];

    if (bv.error) {
      errors.push(...bv.error.details.map((i) => i.message.replace(/"/g, "")));
    }

    if (errors.length) {
      return HandleResponse(res, 400, MESSAGE_CODE.BAD_REQUEST, errors[0]);
    }

    next();
  };
};
