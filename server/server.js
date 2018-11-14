require('./config/config');                                     // archivo con la configuración del puerto
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }))             // USE -> Middleware parse application/x-www-form-urlencoded
app.use(bodyParser.json())                                      // parse application/json
app.use ( require('./routes/usuario') );                        // Para poder usar las rutas de usuario (import)



mongoose.connect('mongodb://localhost:27017/cafe', (err,res)=>{

  if (err) { throw err; }
  else {   console.log('Base de datos ONLINE');   }

});

app.listen(process.env.PORT, ()=>{
  console.log("Escuchando el puerto: ",process.env.PORT);
});
