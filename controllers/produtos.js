const Produto = require('../models/produtos');

module.exports = app => {
    app.post('/produtos', (req,res) => {
        Produto.adiciona(req.body, res)
    })

    app.put('/produtos/:id_produto', (req, res) => {
        const id_produto = req.params.id_produto
        const produto = req.body
        Produto.alteraProduto(id_produto,produto,res)
    })

    app.delete('/produto/:id_produto', (req,res) => {
        const id_produto = req.params.id_produto

        Produto.deletaProduto(id_produto, res)
    })

}