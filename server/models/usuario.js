
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;
let rolesValidos = {
  values: ['ADMIN_ROLE','USER_ROLE'],
  message: '{VALUE} no es un Rol válido'
};

let usuarioSchema = new Schema({

  nombre:  {
             type:     String,
             required: [true, 'El nombre es necesario']
           },

  email:   {
            type:     String,
            required: [true, 'El email es necesario'],
            unique: true
           },

  password:{
            type:     String,
            required: [true, 'La contraseña es obligaria']
           },

  img:     {
            type:     String,
            required: false
           },
  role:    {
            type:    String,
            default: 'USER_ROLE',
            enum:   rolesValidos
           },

  estado:  {
            type:    Boolean,
            default: true
           },

   google: {
            type:    Boolean,
            default: false
           }

});

usuarioSchema.methods.toJSON = function() {                            // Convertir la funcion toJSON para imprimir sin que salga el password
  let user = this;
  let userObject = user.toObject();
  delete userObject.password;
  return userObject;
}

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} Debe ser único'}); // Asignarle a la variable Schema el plugin que permite validar
module.exports = mongoose.model('Usuario',usuarioSchema);  // para que el modelo se llame usuario, tiene la configuracion de usuarioSchema






//
