const conexao = require('../infraestrutura/conexao');
const moment = require('moment');
// const Produto = require('./produtos');

class Loja {

    adiciona(loja, res) {
        
        const lojaa = {...loja}
        const nome_loja = lojaa.nome_loja
        const info_loja = lojaa.info_loja
        const destaque_loja = lojaa.destaque_loja
        const image_loja = lojaa.image_loja
        const nota_loja = lojaa.nota_loja
        const local = moment.locale('pt-br')
        const createdAt = moment().format()

        const sql = "INSERT INTO Lojas (nome_loja,info_loja,destaque_loja,image_loja,nota_loja,createdAt) VALUES ($1, $2, $3, $4, $5,$6) RETURNING *"

        conexao.query(sql, [nome_loja,info_loja,destaque_loja,image_loja,nota_loja,createdAt], (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
                console.log(erro)
            }else{
                let criadoEm = resultados.rows[0]
                criadoEm.createdat = moment(criadoEm.createdat).format("DD-MM-YYYY HH:mm:ss")
                criadoEm = criadoEm.createdat
                const id = resultados.rows[0].id_loja
                res.status(201).json([{id,nome_loja, info_loja, destaque_loja, image_loja,nota_loja,criadoEm}])
            }
        })
    }

    read(res) {
        const sql = "SELECT * FROM Lojas WHERE deletedAt is NULL ORDER BY id_loja ASC"

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
                console.log(erro)
            } else {
                const newResult = resultados.rows
                for(let i in newResult){
                    newResult[i].createdat !== null ? newResult[i].createdat = moment(newResult[i].createdat).format("DD-MM-YYYY HH:mm:ss") : null;
                    newResult[i].updatedat !== null ? newResult[i].updatedat = moment(newResult[i].updatedat).format("DD-MM-YYYY HH:mm:ss") : null;

                    // if(newResult[i].updatedat !== null){
                    //     newResult[i].updatedat = moment(newResult[i].updatedat).format("DD-MM-YYYY HH:mm:ss")
                    // }else{
                    //     newResult[i].updatedat = null;
                    // }
                    // console.log(produtos[i])
                }
                res.status(200).json(newResult)
            }
        })
    }

    buscaPorId(id_loja,res) {
        const sqlVerifica = `SELECT deletedAt from Lojas WHERE id_loja = ${id_loja}`
        conexao.query(sqlVerifica, (err,resultVerifica) => {
            if(err){
                res.status(400).json(err)
            }else {
                const deleted = resultVerifica.rows[0].deletedat;
                if(deleted !== null === false){
                    const sql = `SELECT * FROM Lojas WHERE id_loja = ${id_loja}`

                    conexao.query(sql, (erro, resultados) => {
                        if(erro){
                            res.status(400).json(erro)
                        } else {
                            const sql2 = `SELECT * FROM produtos WHERE fk_loja = ${id_loja} AND deletedAt is NULL ORDER BY id_prod asc`
                            conexao.query(sql2, (err, results) => {
                                if(err){
                                    res.status(400).json(err)
                                }else{
                                    const produtos = results.rows;
                                    const linhasresult = resultados.rows;
                                    linhasresult[0].produtos = produtos
                                    const lojas = linhasresult[0];
                                    lojas.createdat = moment(lojas.createdat).format("DD-MM-YYYY HH:mm:ss")
                                    lojas.updatedat !== null ? lojas.updatedat = moment(lojas.updatedat).format("DD-MM-YYYY HH:mm:ss") : null;
                                    
                                    for(let i in produtos){
                                        produtos[i].createdat = moment(produtos[i].createdat).format("DD-MM-YYYY HH:mm:ss")
                                        produtos[i].updatedat !== null ? produtos[i].updatedat = moment(produtos[i].updatedat).format("DD-MM-YYYY HH:mm:ss"): null;
                                        // console.log(produtos[i])
                                    }
                                    res.status(200).json([{
                                        data: [{
                                            loja: linhasresult,
                                        }]
                                    }])
                                }
                            })
                        }
                    })
                }else{
                    res.status(400).json([])
                }
            }
        })
    }

    alteraLoja(id_loja, loja, res){
        const sqlVerifica = `SELECT deletedAt from Lojas WHERE id_loja = ${id_loja}`
        conexao.query(sqlVerifica, (err,resultVerifica) => {
            if(err){
                res.status(400).json(err)
            }else{
                const deleted = resultVerifica.rows[0].deletedat;
                if(deleted !== null === false){
                    const lojaa = {...loja}
                    const nome_loja = lojaa.nome_loja
                    const info_loja = lojaa.info_loja
                    const destaque_loja = lojaa.destaque_loja
                    const image_loja = lojaa.image_loja
                    const nota_loja = lojaa.nota_loja
                    const updatedAt = moment().format()
                    const sql = `UPDATE Lojas SET nome_loja = $1, info_loja = $2, destaque_loja = $3, image_loja = $4, nota_loja = $5 ,updatedAt = $6 WHERE id_loja = ${id_loja}`

                    conexao.query(sql, [nome_loja,info_loja,destaque_loja,image_loja,nota_loja,updatedAt], (err,result) => {
                        if(err){
                            res.status(400).json(err)
                            console.log(err)
                        }else{
                            res.status(200).json([{id_loja,...loja}])
                        }
                    })
                }else{
                    res.status(400).json([])
                }
            }
        })
    }

    deletaLoja(id_loja, res){
        const deletedAt = moment().format()
        const sql = `UPDATE Lojas SET deletedAt = $1 WHERE id_loja = ${id_loja}`
        conexao.query(sql, [deletedAt], (err, resultados) => {
            if(err){
                res.status(400).json(err)
            }else{
                res.status(200).json(resultados.rows)
            }
        })
    }
}

module.exports = new Loja