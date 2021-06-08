const express = require('express');
const app = express();

app.post('/lojas', (req, res) => {
    res.send('Oi')
})

app.listen(3334, () => console.log('Rodando na porta 3334'))