const router = require('express').Router()

router.use('/', require('./measurements'))
router.use('/historic', require('./historics'))

module.exports = router