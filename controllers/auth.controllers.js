const { response } = require("express");
const bcryptjs = require('bcryptjs');

const User = require('../models/usuario');
const generarJWT = require("../helpers/generar-jwt");


const login = async (req, res = response) => {

    const {email, password} = req.body;

    try {
        // Verificar si el email existe
        const usuario = await User.findOne({email});

        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / pass no son correctos - no existe usuario'
            });
        }

        // Si el usuario esta activo
        if (!usuario.status) {
            return res.status(400).json({
                msg: 'Usuario / pass no son correctos - estado false'
            })
        }

        // Verificar la pass
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / pass no son correctos - pasword incorrecta'
            });
        }

        // Generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Ocurrio un error'
        });
    }

}


module.exports = {
    login
}