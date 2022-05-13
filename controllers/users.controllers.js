const { response, request} = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/usuario'); 


const userGet = async (req = request, res = response) => {


    const { limit = 5, since = 0} = req.query;
    const query = {status: true};


    // ejecuta los dos promesas al mismo tiempo, por lo que demora menos tiempo en ejecutarlas
    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(since))
            .limit(Number(limit))
    ])

    res.json({
        total,
        users
    });
};

const userPut = async (req, res) => {

    const {id} = req.params;
    const { _id, password, google, email,...resto } = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }
    
    const user = await User.findByIdAndUpdate( id, resto );

    res.json({user});
};

const userPost = async (req, res) => {
    
    const {name, email, password, role} = req.body;
    const user = new User( {name, email, password, role} );

    // Encriptar la pass
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt)

    // Guardar en la DB
    await user.save();

    res.json({
        user
    });
};

const userDelete = async (req, res = response) => {

    const { id } = req.params;

    // Borrado fisico de la base
    // const usuario = await User.findByIdAndDelete(id);

    const usuario = await User.findByIdAndUpdate(id, {status: false});

    res.json(usuario);
};

const userPatch = (req, res) => {
    res.json({
        msg: 'PATCH api-userPatch'
    });
};


module.exports = {
    userGet,
    userPut,
    userPost,
    userDelete,
    userPatch
}