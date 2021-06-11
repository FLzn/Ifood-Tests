const Loja = require('../models/loja')
const Produto = require('../models/produtos')

module.exports = app => {
    app.get('/lojas', (req,res) => {
        Loja.read(res)
    })

    app.get('/loja/:id', (req, res) => {
        const id_loja = parseInt(req.params.id)

        Loja.buscaPorId(id_loja,res)

    })

    app.post('/lojas', (req,res) => {
        const loja = req.body
        Loja.adiciona(loja, res)
    })
}