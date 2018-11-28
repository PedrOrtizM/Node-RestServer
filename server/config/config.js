//process es un objeto global que está en toda la application


//__________________________________| PUERTO |__________________________________
            process.env.PORT = process.env.PORT || 3000;
//______________________________________________________________________________



// _________________________________| Entorno |_________________________________
            process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
//______________________________________________________________________________



// __________________________| Vencimiento del token |__________________________
//          60 Segundos - 60 Minutos - 24 Horas - 30 Dias
            process.env.VENCIMIENTO_TOKEN =  60 * 60 * 24 *30;
//______________________________________________________________________________



// _________________________|Semilla de autenticación|__________________________
            process.env.SEMILLA =  process.env.SEMILLA || 'seed-en-desarrollo';
//______________________________________________________________________________



// ______________________________| Base de Datos |______________________________
          process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

          let urlDB;
          if( process.env.NODE_ENV === 'dev' ){
            urlDB = 'mongodb://localhost:27017/cafe';
          }
          else{
            urlDB = 'mongodb://cafe-user:1QAz2WSx@ds213259.mlab.com:13259/cafe';
          }
          process.env.URLDB = urlDB;      // process.env.URLDB es inventado

//______________________________________________________________________________



// ___________________________|  Google CLIENT_ID |_______________________________

        process.env.CLIENT_ID = process.env.CLIENT_ID || '746251866300-6nsn0lqc629sq0b2smvb11b0l2g0r311.apps.googleusercontent.com';
