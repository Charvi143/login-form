import Joi from "joi";

export const SignupValidation = (req, res, next) => {
    const JoiSchema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string()
            .min(8)
            .max(70)
            .pattern(new RegExp("[!@#$%^&*(),.?\":{}|<>]")) 
            .required()
            .messages({
                "string.min": "password must be atleast 8 character",
                "string.max": "password can't be more than 70 character",
                "string.pattern.base": "password must contain atleast one special character",
                "any.required": "passsword is required"
        })
    });
    const { error, value } = JoiSchema.validate(req.body);
    if (error){
        return res.status(400)
            .json({message: "Bad Request, " + error.details[0].message})
    }
    next();

}

export const LoginValidation = (req, res, next) => {
    const JoiSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string()
            .min(8)
            .max(70)
            .required()
            .messages({
                "string.min": "password must be atleast 8 character",
                "string.max": "password can't be more than 70 character",
                "string.pattern.base": "password must contain atleast one special character",
                "any.required": "passsword is required"
        })
    });
    const { error, value } = JoiSchema.validate(req.body);
    if (error){
        return res.status(400)
            .json({message: "Bad Request, " + error.details[0].message})
    }
    next();

}