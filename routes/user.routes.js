const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { isRoleValid, existsEmail, existUser } = require('../helpers/db-validators');
const { userGet,
        userPost,
        userPut,
        userDelete,
        userPatch } = require('../controllers/users.controllers');

const router = Router();

router.get('/', userGet);

router.put('/:id', [
    check('id', 'No es un UD valido').isMongoId(),
    check('id').custom(existUser),
    check('role').custom(isRoleValid),
    validateFields
], userPut);

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener mas de 6 letras').isLength({ min: 6}),
    check('email', 'Email no cumple formato').isEmail(),
    check('email').custom(existsEmail),
    // check('role', 'No es un Rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('role').custom(isRoleValid), // es lo mismo a (role) => isRoleValid(role);
    validateFields
], userPost);

router.delete('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existUser),
    validateFields
], userDelete);

router.patch('/', userPatch);


module.exports = router;