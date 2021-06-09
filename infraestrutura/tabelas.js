class Tabelas {
    init(conexao) {
        this.conexao = conexao;

        this.criarLojas()
    }

    criarLojas(){
        const sql = 'CREATE TABLE IF NOT EXISTS Lojas (id serial PRIMARY KEY NOT NULL, nomeLoja varchar(50) NOT NULL, info varchar(200), destaque boolean NOT NULL, image varchar(255) NOT NULL)'

        this.conexao.query(sql, err => {
            if(err) {
                console.log(err)
            }else{
                console.log('Tabela lojas criada com sucesso!')
            }
        })
    }
}

module.exports = new Tabelas