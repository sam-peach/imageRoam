const router = require('express').Router()
const fs = require('fs')
const {Readable} = require('stream')
const Jimp = require('jimp')
module.exports = router

router.post('/', (req, res, next) => {
  const imageFile = req.files
  try {
    Jimp.read(imageFile[0].path)
      .then(image => {
        image
          .greyscale()
          .quality(50)
          .gaussian(1.3)
          .getBase64(image.getMIME(), (err, processedImage) => {
            if (err) throw err
            res.send(processedImage)
          })
      })
      .catch(err => console.error(err))
  } catch (err) {
    next(err)
  }
})
