//process es un objeto global que está en toda la application


//_________________________| PUERTO |_________________________
        process.env.PORT = process.env.PORT || 3000
//____________________________________________________________


// _______________________| Entorno |________________________
        process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
//___________________________________________________________


// ____________________| Base de Datos |_____________________
        process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

        let urlDB;
        if( process.env.NODE_ENV === 'dev' ){
          urlDB = 'mongodb://localhost:27017/cafe';
        }
        else{
          urlDB = 'mongodb://cafe-user:1QAz2WSx@ds213259.mlab.com:13259/cafe';
        }
        process.env.URLDB = urlDB;      // process.env.URLDB es inventado

//___________________________________________________________
