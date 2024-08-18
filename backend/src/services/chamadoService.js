const db = require('../config/dbConfig')

class ChamadoService {
    constructor() {
    }

    async getChamado(queryParams) {
        const {
            page = 1,
            limit = 30,
            nr_chamado,
            cd_hospital,
            ie_tipo_chamado,
            nm_paciente,
            ie_sexo,
            ie_status_chamado,
            cd_medico
        } = queryParams;

        const offset = (page - 1) * limit;

        const query = db("CHAMADO")
            .select()
            .limit(limit)
            .offset(offset);

        if (nr_chamado) query.where('NR_CHAMADO', `${nr_chamado}`);
        if (cd_hospital) query.where('CD_HOSPITAL', `${cd_hospital}`);
        if (ie_tipo_chamado) query.where(db.raw('LOWER("IE_TIPO_CHAMADO")'), 'like', `%${ie_tipo_chamado.toLowerCase()}%`);
        if (nm_paciente) query.where(db.raw('LOWER("NM_PACIENTE")'), 'like', `%${nm_paciente.toLowerCase()}%`);
        if (ie_sexo) query.where(db.raw('LOWER("IE_SEXO")'), 'like', `%${ie_sexo.toLowerCase()}%`);
        if (ie_status_chamado) query.where(db.raw('LOWER("IE_STATUS_CHAMADO")'), 'like', `%${ie_status_chamado.toLowerCase()}%`);
        if (cd_medico) query.where('CD_MEDICO', 'like', `%${cd_medico}%`);


        const results = await query;
        return results.length ? results : null;
    }

    async createChamado(createChamadoPayload) {
        const { cd_hospital, ie_tipo_chamado, nm_paciente, ie_sexo, ie_status_chamado, cd_medico } = createChamadoPayload
    
        const chamado = await db("CHAMADO")
            .insert({ CD_HOSPITAL: cd_hospital, IE_TIPO_CHAMADO: ie_tipo_chamado, NM_PACIENTE: nm_paciente, IE_SEXO: ie_sexo, IE_STATUS_CHAMADO: ie_status_chamado, CD_MEDICO: cd_medico })
            .returning('*')
        
        return chamado ? chamado : null
    }
}

module.exports = ChamadoService