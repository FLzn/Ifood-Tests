const { Client } = require('pg')
const conexao = new Client({
    user: 'postgres',
    password: 'root',
    host: 'localhost',
    port: 5432,
    database: 'lojas'
})

module.exports = conexao