const conexao = require('./infraestrutura/conexao')
const customExpress = require('./config/customExpress')
const Tabelas = require('./infraestrutura/tabelas')

conexao.connect(err => {
    if(err){
        console.log(err)
    }else{
        console.log('Conectado com sucesso!');

        Tabelas.init(conexao);

        const app = customExpress()
        app.listen(3334)
    }
})