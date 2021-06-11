const conexao = require('../infraestrutura/conexao');
const Produto = require('./produtos');

class Loja {

    adiciona(loja, res) {

        
        const lojaa = {...loja}
        const id_loja = lojaa.id_loja
        const nome_loja = lojaa.nome_loja
        const info_loja = lojaa.info_loja
        const destaque_loja = lojaa.destaque_loja
        const image_loja = lojaa.image_loja
        const sql = "INSERT INTO Lojas (id_loja,nome_loja,info_loja,destaque_loja,image_loja) VALUES ($1, $2, $3, $4, $5) RETURNING *"

        // console.log(lojaa)
        conexao.query(sql, [id_loja,nome_loja,info_loja,destaque_loja,image_loja], (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
                console.log(erro)
            }else{
                const id = resultados.insertId
                res.status(201).json({...loja, id})
            }
        })
    }

    read(res) {
        const sql = 'SELECT * FROM Lojas'

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados.rows)
            }
        })
    }

    buscaPorId(id_loja,res) {
        const sql = `SELECT * FROM Lojas WHERE id_loja = ${id_loja}`

        conexao.query(sql, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            } else {
                const sql2 = `SELECT * FROM produtos WHERE fk_loja = ${id_loja}`
                conexao.query(sql2, (err, results) => {
                    if(err){
                        res.status(400).json(err)
                    }else{
                        res.status(200).json({
                            loja: resultados.rows,
                            produtos: results.rows
                        })
                    }
                })
            }
        })
    }

    alteraLoja(id_loja, loja, res){
        const lojaa = {...loja}
        

    }
}

module.exports = new Loja