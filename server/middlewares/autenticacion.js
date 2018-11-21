const jwt = require('jsonwebtoken');


//______________________________| verifica token |______________________________

  let verificaToken = (req,res,next) =>{                                       // next es para seguir la ejecucion de donde se esta pasando el middleware

        let token = req.get('token') ;                                          // Para obtener los headers de una petición

        jwt.verify( token, process.env.SEMILLA,(err,decoded) =>{

            if( err ){
            return  res.status(401).json({
                ok : false,
                err
              });
            }
            
            req.usuario = decoded.usuario;

            next();

        });


  };

//______________________________________________________________________________



module.exports = {
  verificaToken
}
