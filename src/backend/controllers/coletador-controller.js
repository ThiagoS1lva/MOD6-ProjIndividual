import ColetadorDAO from '../DAO/ColetadorDAO.js'
import Coletador from '../models/Coletador.js'


class ColetadorController {
    static rotas(app) {
        app.get('/Coletadores', ColetadorController.listar)
        app.get('/Coletador/id/:id', ColetadorController.buscarPorID)
        app.post('/Coletador', ColetadorController.inserir)
        app.put('/Coletador/id/:id', ColetadorController.atualizaColetador)
        app.delete('/Coletador/id/:id', ColetadorController.deletarColetador)
    }

    
    // GET para listar todos
    static async listar(req, res) {
        const coletadores = await ColetadorDAO.listar()
        res.status(200).send(coletadores)
    }


    // GET para buscar apenas 1 pela ID
    static async buscarPorID(req, res) {
        const coletador = await ColetadorDAO.buscarPorID(req.params.id)
        if (!coletador) {
            res.status(404).send("Coletador não encontrado")
            return
        }
        res.status(200).send(coletador)
    }



    // POST - Adicionar 1 coletador
    static async inserir(req, res) {
        const coletador = new Coletador(
            req.body.nome,
            req.body.email,
            req.body.cpf,
            req.body.data_nascimento
        )
        if (!coletador.nome || !coletador.email || !coletador.cpf || !coletador.data_nascimento) {
            res.status(400).send("Precisa passar todas as informações")
            return
        }
        const result = await ColetadorDAO.inserir(coletador)
        if (result.erro) {
            res.status(500).send(result)
            return
        }
        res.status(201).send({ "Mensagem": "Coletador criado com sucesso", "Novo Coletador: ": coletador })
    }


    // PUT - Editar um coletador
    static async atualizaColetador(req, res) {
        try {const coletador = new Coletador(
            req.body.nome,
            req.body.email,
            req.body.cpf,
            req.body.data_nascimento
            
        )
        if (!coletador || !coletador.nome || !coletador.email || !coletador.cpf || !coletador.data_nascimento) {
            res.status(400).send("Precisa passar todas as informações")
            return
        }
        if (!Object.keys(coletador).length) {
            res.status(400).send('O objeto está sem chave')
            return
        }
        const result = await ColetadorDAO.atualizar(req.params.id, coletador)
        if (result.erro) {
            res.status(500).send('Erro ao atualizar o coletador')
            return
        }
        res.status(200).send({ "Mensagem": "Dados atualizados", "Coletador: ": coletador })
    } catch (err) {
        console.log(err)
        res.status(500).send('Erro ao atualizar o coletador')
    }}


    // DELETE - Deletar 1 coletador
    static async deletarColetador(req, res) {
        const coletador = await ColetadorDAO.buscarPorID(req.params.id)
        if (!coletador) {
            res.status(404).send("Coletador não encontrado")
            return
        }
        const result = await ColetadorDAO.deletar(req.params.id)
        if (result.erro) {
            res.status(400).send({ 'Mensagem': 'Coletador não deletado' })
            return
        }
        res.status(200).send(result)
    }
}

export default ColetadorController

