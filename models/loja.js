const conexao = require('../infraestrutura/conexao');

class Loja {

    adiciona(loja, res) {

        
        const lojaa = {...loja}
        const id = lojaa.id
        const nomeLoja = lojaa.nomeloja
        const info = lojaa.info
        const destaque = lojaa.destaque
        const image = lojaa.image

        console.log(lojaa)

        const sql = 'INSERT INTO Lojas (id,nomeLoja,info,destaque,image) VALUES ($1, $2, $3, $4, $5) RETURNING *'

        conexao.query(sql, [id,nomeLoja,info,destaque,image], (erro, resultados) => {
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

    buscaPorId(id,res) {
        const sql = `SELECT * FROM Lojas WHERE id = ${id}`

        conexao.query(sql, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados.rows)
            }
        })
    }
}

module.exports = new Loja