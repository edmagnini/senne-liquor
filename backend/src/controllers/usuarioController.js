const UsuarioService = require("../services/usuarioService")
const ExceptionHandler = require("../utils/exceptionHandler")
const HashManager = require("../utils/hashManager")
const Authenticator = require("../utils/authenticator")
const Usuario = require("../models/usuario")
const { emailSchema, loginSchema, registerSchema } = require("../utils/validator");


class UsuarioController {
    HashManager
    Authenticator
    constructor() {
        this.usuarioService = new UsuarioService()
        this.hashManager = new HashManager()
        this.authenticator = new Authenticator()
    }

    async getUsuarioByEmail(req, res, next) {
        try {

            await emailSchema.validate(req.body);
            const { email } = req.body

            const user = await this.usuarioService.getUsuarioByEmail(email)

            if (!user) throw ExceptionHandler.notFound('Usuário não encontrado');

            res.status(200).json(user)
        } catch (error) {
            next(error);
        }
    }

    async loginUsuario(req, res, next) {
        try {

            await loginSchema.validate(req.body)

            const { email, senha } = req.body

            const user = await this.usuarioService.getUsuarioByEmail(email)
            if (!user) throw ExceptionHandler.badRequest('Credenciais inválidas');

            const cypherPass = await this.hashManager.compare(senha, user.DS_SENHA)
            if (!cypherPass) throw ExceptionHandler.badRequest('Credenciais inválidas');

            const token = this.authenticator.generateToken(user.CD_USUARIO)

            res.status(200).json({ token: `Bearer ${token}` })
        } catch (error) {
            next(error)
        }
    }

    async registerUsuario(req, res, next) {
        try {

            await registerSchema.validate(req.body)

            const { nome, email, senha } = req.body


            const existingUser = await this.usuarioService.getUsuarioByEmail(email)
            if (existingUser) throw ExceptionHandler.badRequest('Usuário já existente')

            const cypherPass = await this.hashManager.hash(senha)

            const user = new Usuario(nome, email, cypherPass)

            await this.usuarioService.registerUsuario(user)

            res.status(201).send("Usuário criado com sucesso")
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UsuarioController