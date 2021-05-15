const express = require('express')
//Como este archivo solo sera para rutas, usamos su metodo Router()
const router = express.Router()

//REcuerda que ya tenemos configurado nuestra carpeta view asi que solo escribe el nombre del archivo

//Cuando consulten '/', vamos a renderisar index
router.get('/', (req, res) => {
    res.render('index')
})



module.exports = router;