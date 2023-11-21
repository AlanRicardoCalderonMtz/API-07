const express = require('express');
const router = express.Router();
const userController = require('../controllers/usuarios.controllers')

router.get('/', userController.getAllUser);
router.get('/:correo', userController.getUserByEmail);
router.post('/', userController.addUser);
router.put('/:correo', userController.updateUser);
router.delete('/:correo', userController.deleteUserByEmail);

module.exports=router