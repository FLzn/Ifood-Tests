const Produto = require('../models/produtos')

module.exports = app => {
    app.post('/produtos', (req,res) => {
        // const loja = req.body
        // Loja.adiciona(loja, res)
        Produto.adiciona(req.body, res)
        // res.send('Rota de criação de produtos')
    })

    app.put('/produtos/:id_produto', (req, res) => {
        const id_produto = req.params.id_produto
        const produto = req.body
        Produto.alteraProduto(id_produto,produto,res)
    })

    app.get('/produtos/:idloja', (req,res) => {
        const idloja = req.params.idloja

        Produto.procuraPorId(idloja, res)
    })

    app.delete('/produto/:id_produto', (req,res) => {
        const id_produto = req.params.id_produto

        Produto.deletaProduto(id_produto, res)
    })

}