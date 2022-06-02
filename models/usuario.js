
const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    name: {
        type: String,
        require: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        require: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        require: [true, 'La pass es obligatorio'],
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        require: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})

// Quita _v y password del JSON que se devuelve
UsuarioSchema.methods.toJSON = function() {
    const { _v, password, _id, ...userInfo } = this.toObject();
    userInfo.uid = _id;
    return userInfo;
}

module.exports = model( 'User', UsuarioSchema);