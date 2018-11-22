
const jwt = require('jsonwebtoken');

//______________________________| verifica token |______________________________

  let verificaToken = (req,res,next) =>{                                       // next es para seguir la ejecucion de donde se esta pasando el middleware

        let token = req.get('token') ;                                          // Para obtener los headers de una petición

        jwt.verify( token, process.env.SEMILLA,(err,decoded) =>{

            if( err ){
            return  res.status(401).json({
                ok : false,
                err:{
                    message: "Token no válido"
                }
              });
            }

            req.usuario = decoded.usuario;                                      // decode es el payload

            //console.log("token: ",token);
            next();
        });
  };

//____________________________| verifica adminRole |____________________________

  let verificaAdminRole = (req,res,next) => {

    let usuario = req.usuario;

    if (usuario.role != 'ADMIN_ROLE'){
      return res.json({
        ok : false,
        err:{
          message: "El usuario debe ser administrador"
        }
      });
    }
    next();

  }

//______________________________________________________________________________
module.exports = {
  verificaToken,
  verificaAdminRole
}
