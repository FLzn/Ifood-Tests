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
        const local = moment.locale('pt-br')
        const day = moment().format('L')
        const hour = moment().format('LTS')
        const criadoEm = day + '-' + hour
        const createdAt = moment().format()

        const sql = "INSERT INTO Lojas (nome_loja,info_loja,destaque_loja,image_loja, createdAt) VALUES ($1, $2, $3, $4, $5) RETURNING *"

        conexao.query(sql, [nome_loja,info_loja,destaque_loja,image_loja, createdAt], (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
                console.log(erro)
            }else{
                const id = resultados.rows[0].id_loja
                res.status(201).json([{id,nome_loja, info_loja, destaque_loja, image_loja, criadoEm}])
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
                res.status(200).json(resultados.rows)
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
                                    const produtos = results.rows
                                    const linhasresult = resultados.rows
                                    linhasresult[0].produtos = produtos                        
                                    // console.log(moment(linhasresult[0].produtos[0].createdat).format("DD-MM-YYYY HH:mm:ss"))
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
                // console.log(deleted !== null)
                if(deleted !== null === false){
                    const lojaa = {...loja}
                    const nome_loja = lojaa.nome_loja
                    const info_loja = lojaa.info_loja
                    const destaque_loja = lojaa.destaque_loja
                    const image_loja = lojaa.image_loja
                    const updatedAt = moment().format()
                    const sql = `UPDATE Lojas SET nome_loja = $1, info_loja = $2, destaque_loja = $3, image_loja = $4, updatedAt = $5 WHERE id_loja = ${id_loja}`

                    conexao.query(sql, [nome_loja,info_loja,destaque_loja,image_loja, updatedAt], (err,result) => {
                        if(err){
                            res.status(400).json(err)
                            console.log(err)
                        }else{
                            // const id = result.rows[0].id_loja
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