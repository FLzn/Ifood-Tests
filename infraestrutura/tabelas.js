class Tabelas {
    init(conexao) {
        this.conexao = conexao;
    }

    criarLojas(){
        const sql = 'CREATE TABLE IF NOT EXISTS Lojas (id int NOT NULL AUTO_INCREMENT, nome varchar(50) NOT NULL, info varchar(200), destaque int(1))'

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