const conexao = require('../infraestrutura/conexao')
const moment = require('moment')

class Produto {

    adiciona(produto,res) {
        const produtoo = {...produto};
        const fkLoja = produtoo.fk_loja
        const nomeProd = produtoo.nome_prod
        const infoProd = produtoo.info_prod
        const destaqueProd = produtoo.destaque_prod
        const imageProd = produtoo.image_prod
        const precoProd = Number(produtoo.preco_prod)
        const categoryProd = produtoo.categoria_prod
        const createdAt = moment().format()
        precoProd.toFixed(2)


        // precoProd = precoProd.replace('.', ',')
        const sql = 'INSERT INTO Produtos (fk_loja,nome_prod,info_prod,destaque_prod, image_prod, preco_prod, categoria_prod, createdAt) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *'
        
        conexao.query(sql, [fkLoja, nomeProd, infoProd, destaqueProd, imageProd, precoProd, categoryProd, createdAt], (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
                console.log(erro)
            }else{
                const id = resultados.rows[0].id_prod
                res.status(201).json([{id,...produto}])
            }
        })
    }

    alteraProduto(id_produto,produto,res){
        const sqlVerifica = `SELECT deletedAt FROM Produtos WHERE id_prod = ${id_produto}`
        conexao.query(sqlVerifica, (err,resultVerifica) => {
            if(err){
                res.status(400).json(err)
                console.log(err)
            }else{
                const deleted = resultVerifica.rows[0].deletedat
                if(deleted !== null === false){
                    const produtoo = {...produto}
                    const nome_prod = produtoo.nome_prod
                    const info_prod = produtoo.info_prod
                    const destaque_prod = produtoo.destaque_prod
                    const image_prod = produtoo.image_prod
                    const preco_prod = produtoo.preco_prod
                    const categoria_prod = produtoo.categoria_prod
                    const updatedAt = moment().format()
                    const sql = `UPDATE Produtos SET nome_prod = $1, info_prod = $2, destaque_prod = $3, image_prod = $4, preco_prod = $5, categoria_prod = $6, updatedAt = $7 WHERE id_prod = ${id_produto}`

                    conexao.query(sql, [nome_prod, info_prod, destaque_prod, image_prod, preco_prod, categoria_prod, updatedAt], (err, result) => {
                        if(err){
                            res.status(400).json(err)
                            console.log(err)
                        }else{
                            res.status(200).json([{id_produto,...produto}])
                        }
                    })
                }
            }
        })
    }

    deletaProduto(id_prod, res){
        const deletedAt = moment().format()
        const sql = `UPDATE Produtos SET deletedAt = $1 WHERE id_prod = ${id_prod}`

        conexao.query(sql, [deletedAt], (err,resultados) => {
            if(err){
                res.status(400).json(err)
                console.log(err)
            }else{
                res.status(200).json(resultados.rows)
            }
        })
    }
}

module.exports = new Produto