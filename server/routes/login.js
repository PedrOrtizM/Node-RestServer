
const express = require('express')
const app = express()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
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


         let token = jwt.sign({usuario: usuarioDB},
                              process.env.SEMILLA,
                              {expiresIn: process.env.VENCIMIENTO_TOKEN});

        res.json({
          ok: true,
          usuario: usuarioDB,
          token: token
        });

    });

});



// configuraciones de Google

async function verify(token) {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();

  return{
    nombre: payload.name,
    email: payload.email,
    img: payload.picture,
    google: true
  }
}



app.post('/google',async (req,res) =>{

 let token = req.body.idtoken

 let googleUser = await verify(token)
                  .catch(err => {

                                res.status(403).json({
                                  ok: false,
                                  err: e
                                });
                  });

  Usuario.findOne({ email: googleUser.email}, (err,usuarioDB)=>{

    if (err) {
                return res.status(500).json({
                      ok: false,
                      err
                    });
              }

    if(usuarioDB){
          if(usuarioDB.google === false){

                        return res.status(400).json({
                              ok: false,
                              err:{message: 'Debe de usar la autenticación normal'}
                            });

          }
          else{

            let token = jwt.sign({usuario: usuarioDB},
                                 process.env.SEMILLA,
                                 {expiresIn: process.env.VENCIMIENTO_TOKEN});

            return res.json({
                  ok: true,
                  usuario: usuarioDB,
                  token
               });
          }
    }else{
      // si el usuario no existe en la BD hay que crearlo

      let usuario = new Usuario();
      usuario.nombre = googleUser.nombre;
      usuario.email = googleUser.email;
      usuario.img = googleUser.img;
      usuario.google =true;
      usuario.password =':)';

      usuario.save( (err,usuarioDB)=>{

        if (err) {
                    return res.status(500).json({
                          ok: false,
                          err
                        });
                  }

      let token = jwt.sign({usuario: usuarioDB},
                           process.env.SEMILLA,
                           {expiresIn: process.env.VENCIMIENTO_TOKEN});

      return res.json({
                        ok: true,
                        usuario: usuarioDB,
                        token
                     });
      })
    }

  })


})
module.exports = app;








//
