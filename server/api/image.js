const router = require('express').Router()
const Jimp = require('jimp')
module.exports = router

router.post('/', (req, res, next) => {
  const {imageFile} = req.body
  try {
    console.log('REQ BODY>>> ', Object.values(req.files))
  } catch (err) {
    next(err)
  }
})
