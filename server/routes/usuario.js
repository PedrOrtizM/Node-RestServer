
const express = require('express')
const app = express()
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');


//---------------------------------------------
app.get('/usuario', function(req, res) {
    res.json('get usuario');                                                    // Envía en formato JSON | res.send(); Envia en fomrato HTML
});

//--------------------------------------------
app.post('/usuario', function(req, res) {

    let body = req.body;

    let usuario = new Usuario({
          nombre:   body.nombre,
          email:    body.email,
          password: bcrypt.hashSync(body.password, 10),                         // encriptar contraseña
          role:     body.role
    });

    usuario.save((err, usuarioDB) => {

          if (err) {
              return res.status(400).json({
                  ok: false,
                  err
                });
              }

        res.json({
                  ok: true,
                  usuario: usuarioDB
                });
    });

});

//----------------------------------------

app.put('/usuario/:id', function(req, res) {

    let body = _.pick(req.body,['nombre','email','img','role','estado'] );      // Las opciones que si se puedan actualzar
    let id = req.params.id;

    Usuario.findByIdAndUpdate( id, body, { new: true, runValidators: true},(err,usuarioDB) =>{     // { new: true} para que regrese el user modificado

      if (err) {
               return res.status(400).json({
                 ok: false,
                 err
               });
          }

      res.json({
                ok: true,
                usuario: usuarioDB
              });
      })
    });

//----------------------------------------

app.delete('/usuario', function(req, res) {
    res.json('delete Uusario');
});

//----------------------------------------

module.exports = app;
