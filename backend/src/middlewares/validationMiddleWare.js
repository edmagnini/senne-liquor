
const { emailSchema, loginSchema, registerSchema, newChamadoSchema } = require("../utils/validator");
const ExceptionHandler = require("../utils/exceptionHandler")

const validate = (schema) => (req, res, next) => {
    schema
        .validate(req.body)
        .then(() => next())
        .catch(err => next(ExceptionHandler.badRequest(err.message)));
};

module.exports = {
    validateEmail: validate(emailSchema),
    validateLogin: validate(loginSchema),
    validateRegister: validate(registerSchema),
    validateNewChamado: validate(newChamadoSchema),
};