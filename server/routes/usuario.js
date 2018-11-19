
const express = require('express')
const app = express()
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');
                                                                                // res.json('sdsad') envía en formato JSON |
                                                                                // res.send(); Envia en fomrato HTML
app.get('/usuario', function(req, res) {

  let desde = req.query.desde || 0;                                             // query tiene los parametros que se mandan
  desde = Number(desde);

  let limite = req.query.limite || 5;
  limite = Number(limite);


  Usuario.find({ estado: true})                                                             // Otro argumento {},'nombre email' para mostrar solo los atributos que quiero
         .skip(desde)                                                          // desde que número de registro
         .limit(limite)                                                        // Limita la cantidad de resutados
         .exec((err,usuarios)=>{                                               // Ejecuta el comando find de mongoose

             if (err) {
                        return res.status(400).json({
                             ok: false,
                             err
                        });
                      }

             Usuario.count({estado: true},(err,contar)=>{
               res.json({
                 ok:true,
                 usuarios,
                 cantidadTotal: contar
               });

             });
           })
});


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


app.put('/usuario/:id', function(req, res) {

    let body = _.pick(req.body,['nombre','email','img','role','estado'] );      // Las opciones que si se puedan actualzar
    let id   = req.params.id;

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


app.delete('/usuario/:id', function(req, res) {

      let id = req.params.id;                                                   // el que se pasa por url


      let cambiaEstado = {
        estado: false
      };

      //Usuario.findByIdAndRemove(id,(err,usuarioBorrado)=>{
      Usuario.findByIdAndUpdate(id,cambiaEstado,{new: true},(err,usuarioBorrado)=>{

        if (err) {
                    return res.status(400).json({
                          ok: false,
                          err
                        });
                  }
        res.json({
          ok:true,
          usuario: usuarioBorrado
        })

      })

});


module.exports = app;
