const { response } = require('express');

const userGet = (req, res = response) => {

    const {q, nombre = 'No name', apikey, page = '1', limit} = req.query;

    res.json({
        msg: 'GET api-userGet',
        q,
        nombre,
        apikey,
        page,
        limit
    });
};

const userPut = (req, res) => {

    const {id} = req.params;

    res.json({
        msg: 'PUT api-userPut',
        id
    });
};

const userPost = (req, res) => {

    const {nombre, edad} = req.body;

    res.json({
        msg: 'POST api-userPost',
        nombre,
        edad
    });
};

const userDelete = (req, res) => {
    res.json({
        msg: 'DELETE api-userDelete'
    });
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