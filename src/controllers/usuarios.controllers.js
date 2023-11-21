const bcrypt = require('bcrypt');
const Usuarios = require('../models/usuario.model')

exports.getAllUser = async (req, res) => {
    try {
        const listadoUsuarios = await Usuarios.find();
        //si tenemos usuarios 
        if (listadoUsuarios) {
            res.status(200).json({
                estado: 1,
                mensaje: "Usuarios encontrados",
                usuarios: listadoUsuarios
            });
        } else {
            res.status(404).json({
                estado: 0,
                mensaje: "Usuarios no encontrados"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            estado: 0,
            mensaje: "Ocurrio un error desconocido"
        });
    }
}

exports.getUserByEmail = async (req, res) => {
    try {
        const { correo } = req.params;
        //Se hace una consulta
        const usuario = await Usuarios.findOne({ correo: correo }).exec();
        if (usuario) {
            res.status(200).json({
                estado: 1,
                mensaje: "Usuario encontrado",
                usuario: usuario
            });
        } else {
            res.status(404).json({
                estado: 0,
                mensaje: "Usuario no encontrado"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            estado: 0,
            mensaje: "Ocorrio un error desconocido"
        });
    }
}

exports.addUser = async (req, res) => {
    try {
        const { nombre, apellidos, usuario, correo, clave } = req.body;
        if (nombre == undefined || apellidos == undefined || usuario == undefined || correo == undefined
            || clave == undefined) {
            res.status(400).json({
                estado: 0,
                mensaje: "Faltan parametros"
            })
        } else {
            //Falta verificar si el usuario y/o correo ya existentes
            //Buscar si el usuario o el correo ya existen 
            const usuarioEncontrado = await Usuarios.findOne({ correo: correo, usuario: usuario });
            //Si usuario encontrado mostrar mensaje de que ya existe (Si no: lo creamos)
            if (usuarioEncontrado) {
                res.status(200).json({
                    estado: 0,
                    mensaje: "Usuario y/o email ya existen"
                });
            } else {
                //Encriptar la clave 
                const salt = await bcrypt.genSalt(8);
                claveEncriptada = await bcrypt.hash(clave, salt);

                const nuevoUsuario = await Usuarios.create({ nombre, apellidos, usuario, correo, clave: claveEncriptada })
                if (nuevoUsuario) {
                    res.status(200).json({
                        estado: 1,
                        mensaje: "Usuario creado con exito",
                        usuario: nuevoUsuario
                    })
                } else {
                    res.status(500).json({
                        estado: 0,
                        mensaje: "Ocurrio un error desconocido"
                    })
                }
            }
        }
    } catch (error) {
        res.status(500).json({
            estado: 0,
            mensaje: "Ocurrio un error desconocido"
        })
        console.log(error);
    }
}

/*exports.updateUser = async (req, res) => {
    try {
        //Que datos actualizamos
        const { correo } = req.params;
        const { nombre, apellidos, clave } = req.body;
        if (nombre == undefined || apellidos == undefined || clave == undefined) {
            res.status(400).json({
                estado: 0,
                mensaje: "Faltan parametros"
            });
        } else {
            //Se requiere encriptar la nueva clave
            const salt = await bcrypt.genSalt(8);
            claveEncriptada = await bcrypt.hash(clave, salt);

            //await Usuarios.findByIdAndUpdate({filtro}, {campos})
            console.log(correo);
            await Usuarios.findOneAndUpdate(
                { correo: correo }, //Condición o Filtro
                { nombre: nombre, apellidos: apellidos, clave: claveEncriptada } //Campos
            )
            res.status(200).json({
                estado: 1,
                mensaje: "Se actualizo correctamente",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            estado: 0,
            mensaje: "Ocurrio un erro desconocido"
        });
    }
}*/

// ... (importaciones y configuraciones)


exports.updateUser = async (req, res) => {
    try {
        const { correo } = req.params;
        const { nombre, apellidos, clave } = req.body;

        if (nombre == undefined || apellidos == undefined || clave == undefined) {
            return res.status(400).json({
                estado: 0,
                mensaje: "Faltan parámetros"
            });
        } else {
            const salt = await bcrypt.genSalt(8);
            const claveEncriptada = await bcrypt.hash(clave, salt);

            console.log('Clave encriptada:', claveEncriptada);

            const resultado = await Usuarios.findOneAndUpdate({ correo: correo }, { nombre: nombre, apellidos: apellidos, clave: claveEncriptada });

            console.log('Resultado de la consulta:', resultado);

            if (resultado) {
                res.status(200).json({
                    estado: 1,
                    mensaje: "El registro se actualizó correctamente",
                });
            } else {
                res.status(404).json({
                    estado: 0,
                    mensaje: "Usuario no encontrado"
                });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            estado: 0,
            mensaje: "Ocurrió un error desconocido"
        });
    }
}


exports.deleteUserByEmail = async (req, res) => {
    try {
        const { correo } = req.params;
        const usuario = await Usuarios.findOne({ correo: correo }).exec();
        if (usuario) {
            await Usuarios.deleteOne(usuario);
            res.status(200).json({
                estado: 1,
                mensaje: "Usuario eliminado"
            });
        } else {
            res.status(404).json({
                estado: 0,
                mensaje: "Usuario no encontrado"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            estado: 0,
            mensaje: "Ocurrio un error desconocido"
        });
    }
}