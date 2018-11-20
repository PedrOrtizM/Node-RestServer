
const express = require('express')
const app = express()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');


app.post('/login',(req,res) =>{

  let body = req.body;

  Usuario.findOne({email: body.email} , (err,usuarioDB) =>{

        if (err) {
                    return res.status(500).json({
                          ok: false,
                          err
                        });
                  }

        if (!usuarioDB) {
                      return res.status(400).json({
                            ok: false,
                            err:{message: '(Usuario) o contraseña incorrectas'}
                              });
                        }


        if (!bcrypt.compareSync(body.password, usuarioDB.password)){

                      return res.status(400).json({
                            ok: false,
                            err:{message: 'Usuario o (contraseña) incorrectas'}
                          });
        }

        // let token = jwt.sign({
        //
        // })

        res.json({
          ok: true,
          usuario: usuarioDB,
          token: '123'
        });

    });

});





module.exports = app;
