const Produto = require('../models/produtos')

module.exports = app => {
    app.post('/produtos', (req,res) => {
        // const loja = req.body
        // Loja.adiciona(loja, res)
        Produto.adiciona(req.body, res)
        // res.send('Rota de criação de produtos')
    })

    app.get('/produtos/:idloja', (req,res) => {
        const idloja = req.params.idloja

        Produto.procuraPorId(idloja, res)
    })
}