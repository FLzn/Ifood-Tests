const Loja = require('../models/loja');

module.exports = app => {
    app.use(function (req, res, next) {
        //Enabling CORS
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
        next();
        });

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

    app.put('/loja/:id', (req, res) => {
        const loja = req.body
        const id = req.params.id
        Loja.alteraLoja(id,loja,res)
    })

    app.delete('/loja/:id', (req, res) => {
        const id_loja = req.params.id
        Loja.deletaLoja(id_loja, res)
    })
}