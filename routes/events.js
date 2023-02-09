/*
    Event Routes
    /api/events
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');

const router = Router();

/*
    * Todas las lineas que esten abajo de este ej, necesitan el token para funcionar
    * Si queres poner una ruta publica, simplemente moves esta linea abajo de la ruta
*Ej:

*Rutas Públicas
router.put('/:id',validarJWT, actualizarEvento);

*validacion del JWT
router.use( validarJWT );

*Rutas Privadas
router.get('/',validarJWT, getEventos);

*/

// Todas tienen que pasar por la validacion del JWT
router.use( validarJWT );


// Obtener eventos
router.get('/',validarJWT, getEventos);

// Crear eventos
router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'La fecha de finalización es obligatoria').custom( isDate ),
        validarCampos
    ],
    crearEvento
);

// Actualizar eventos
router.put('/:id',validarJWT, actualizarEvento);

// Actualizar eventos
router.delete('/:id',validarJWT, eliminarEvento);

module.exports = router;