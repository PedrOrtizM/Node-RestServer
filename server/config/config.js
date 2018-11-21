//process es un objeto global que está en toda la application


// ========================| PUERTO |=========================
        process.env.PORT = process.env.PORT || 3000

// ========================| Entorno |========================
        process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// ====================| Base de Datos |======================
        process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

        let urlDB;
        if( process.env.NODE_ENV === 'dev' ){
          urlDB = 'mongodb://localhost:27017/cafe';
        }
        else{
          urlDB = 'mongodb://cafe-user:1QAz2WSx@ds213259.mlab.com:13259/cafe';
        }
        process.env.URLDB = urlDB;  // process.env.URLDB es inventado
