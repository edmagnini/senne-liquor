const db = require('../config/dbConfig')

class UsuarioService {
    constructor() {
    }

    async getUsuarioByEmail(email) {

        const user = await db("USUARIO")
            .where('DS_EMAIL', 'like', email)
            .first()


        return user ? user : null
    }

    async registerUsuario(usuario) {

        const { nm_usuario, ds_email, ds_senha } = usuario;

        const [newUser] = await db("USUARIO")
            .insert({ NM_USUARIO: nm_usuario, DS_EMAIL: ds_email, DS_SENHA: ds_senha })
            .returning('*')

        return newUser

    }
}

module.exports = UsuarioService