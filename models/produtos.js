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
}

module.exports = new Produto