class Tabelas {
    init(conexao) {
        this.conexao = conexao;

        this.criarLojas()
        this.criarProdutos()
    }

    criarLojas(){
        const sql = 'CREATE TABLE IF NOT EXISTS Lojas (id_loja serial PRIMARY KEY NOT NULL, nome_loja varchar(50) NOT NULL, info_loja varchar(200), destaque_loja boolean NOT NULL, image_loja varchar(255) NOT NULL, nota_loja decimal,createdAt timestamp, updatedAt timestamp, deletedAt timestamp)'

        this.conexao.query(sql, err => {
            if(err) {
                console.log(err)
            }else{
                console.log('Tabela lojas criada com sucesso!')
            }
        })
    }

    criarProdutos(){
        const sql = 'CREATE TABLE IF NOT EXISTS Produtos(id_prod serial PRIMARY KEY NOT NULL, fk_loja integer NOT NULL,nome_prod varchar(50) NOT NULL, info_prod varchar(200) NOT NULL,destaque_prod boolean NOT NULL,image_prod varchar(255) NOT NULL,preco_prod numeric(5,2) NOT NULL,categoria_prod varchar(50) NOT NULL, createdAt timestamp, updatedAt timestamp, deletedAt timestamp ,FOREIGN KEY(fk_loja) REFERENCES lojas(id_loja))'

        this.conexao.query(sql, err => {
            if(err) {
                console.log(err)
            }else{
                console.log('Tabela produtos criada com sucesso!')
            }
        })
    }
}

module.exports = new Tabelas