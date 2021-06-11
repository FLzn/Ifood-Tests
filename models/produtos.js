const conexao = require('../infraestrutura/conexao')

class Produto {

    adiciona(produto,res) {
        const produtoo = {...produto};
        const idProd = produtoo.id_prod
        const fkLoja = produtoo.fk_loja
        const nomeProd = produtoo.nome_prod
        const infoProd = produtoo.info_prod
        const destaqueProd = produtoo.destaque_prod
        const imageProd = produtoo.image_prod
        const precoProd = Number(produtoo.preco_prod)
        const categoryProd = produtoo.categoria_prod
        precoProd.toFixed(2)


        // precoProd = precoProd.replace('.', ',')
        const sql = 'INSERT INTO Produtos (id_prod,fk_loja,nome_prod,info_prod,destaque_prod, image_prod, preco_prod, categoria_prod) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *'
        
        conexao.query(sql, [idProd, fkLoja, nomeProd, infoProd, destaqueProd, imageProd, precoProd, categoryProd], (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
                console.log(erro)
            }else{
                const id = resultados.insertId
                res.status(201).json({...produto, id})
            }
        })
    }

    alteraProduto(idloja,idproduto,produto,res){
        const produtoo = {...produto}
        const id_prod = produtoo.id_prod
        const fk_loja = produtoo.fk_loja
        const nome_prod = produtoo.nome_prod
        const info_prod = produtoo.info_prod
        const destaque_prod = produtoo.destaque_prod
        const image_prod = produtoo.image_prod
        const preco_prod = produtoo.preco_prod
        const categoria_prod = produtoo.categoria_prod
        const sql = `UPDATE Produtos SET id_prod = $1, fk_loja = $2, nome_prod = $3, info_prod = $4, destaque_prod = $5, image_prod = $6, preco_prod = $7, categoria_prod = $8 WHERE fk_loja = ${idloja} AND id_prod = ${idproduto}`

        conexao.query(sql, [id_prod, fk_loja, nome_prod, info_prod, destaque_prod, image_prod, preco_prod, categoria_prod], (err, result) => {
            if(err){
                res.status(400).json(err)
                console.log(err)
            }else{
                res.status(200).json(produtoo)
            }
        })

    }
}

module.exports = new Produto