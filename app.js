const express = require('express');
const routeUser = require('./src/routes/usuario.routes')
const app = express()
const puerto = process.env.PORT || 3000;

app.use(express.json());

app.use('/socios/v1/users', routeUser);

app.listen(puerto,()=>{
    console.log("Servidor corriendo en el puerto: ", puerto)

})
