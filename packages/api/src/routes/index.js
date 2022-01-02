const router = require('express').Router()

router.use('/', require('./measurements'))

module.exports = router