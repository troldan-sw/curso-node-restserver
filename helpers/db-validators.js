const Role = require('../models/role');
const User = require('../models/usuario');
const { response } = require('express');


const isRoleValid = async (role = '') => {
    const existeRole = await Role.findOne({role});
    if (!existeRole) {
        throw new Error('El rol no existe en la base');
    }
}

// Verificar si el correo existe
const existsEmail = async (email) => {
    
    const existeEmail = await User.findOne({ email });
    if (existeEmail) {
        throw new Error(`El email: ${email} ya existe en la base`);
    }
}

const existUser = async (id) => {
    const existeId = await User.findById(id);
    if (!existeId) {
        throw new Error(`El id: ${id} no existe en la base`);
    }
}


module.exports = {
    isRoleValid,
    existsEmail,
    existUser
};