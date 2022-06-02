const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth.controllers');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.post('/login', [
    check('email', 'El correo es requerido').isEmail(),
    check('password', 'La pass es obligatoria').not().isEmpty(),
    validateFields
] ,login);


module.exports = router;