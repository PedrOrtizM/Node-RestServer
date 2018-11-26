
require('./config/config');                                     // archivo con la configuración del puerto
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }))             // USE -> Middleware parse application/x-www-form-urlencoded
app.use(bodyParser.json())                                      // parse application/json
app.use ( require('./routes/index') );                          // Para poder usar las rutas de usuario, login etc (import)


mongoose.connect(process.env.URLDB,{ useNewUrlParser: true } , (err,res)=>{

  if (err) { throw err; }
  else     { console.log('Base de datos: OK!'); }

  });

app.listen(process.env.PORT, ()=>{
  console.log("Escuchando el puerto: ",process.env.PORT);
});

console.log("URL DB: ",process.env.URLDB);
