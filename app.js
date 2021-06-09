const conexao = require('./infraestrutura/conexao')
const customExpress = require('./config/customExpress')

conexao.connect(err => {
    if(err){
        console.log(err)
    }else{
        console.log('Conectado com sucesso!');
        const app = customExpress()
        app.listen(3334)
    }
})