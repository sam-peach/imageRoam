const router = require('express').Router()
const Jimp = require('jimp')
const {Graph} = require('javascript-astar')
module.exports = router

router.post('/', (req, res, next) => {
  // const imageFile = req.files
  const {clientData} = req.body
  const holdArr = []
  try {
    Jimp.read(Buffer.from(clientData, 'base64'), (err, image) => {
      if (err) throw err
      else {
        for (let i = 0; i < image.bitmap.height; i++) {
          holdArr.push([])
        }
        image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(
          x,
          y,
          idx
        ) {
          const red = this.bitmap.data[idx + 0]
          const green = this.bitmap.data[idx + 1]
          const blue = this.bitmap.data[idx + 2]

          const grayscaleAverage = Math.round(
            0.21 * red + 0.72 * green + 0.07 * blue * 0.07
          )

          holdArr[y][x] = grayscaleAverage
        })
        const graphInstance = new Graph(holdArr, {diagonal: true})
        delete graphInstance.nodes
        delete graphInstance.dirtyNodes
        delete graphInstance.diagonal
        res.send(graphInstance.grid)
      }
    })
  } catch (err) {
    next(err)
  }
})

// router.post('/', (req, res, next) => {
//   const imageFile = req.files
//   try {
//     Jimp.read(imageFile[0].path)
//       .then(image => {
//         image
//           .greyscale()
//           .quality(50)
//           .gaussian(1.3)
//           .getBase64(image.getMIME(), (err, processedImage) => {
//             if (err) throw err
//             const newArr = []
//             processedImage.scan(
//               0,
//               0,
//               processedImage.width,
//               image.bitmap.height,
//               (x, y, idx) => {
//                 newArr.push(processedImage.bitmap.data[idx])
//               }
//             )
//             console.log('NEW ARR>>> ', newArr.length)
//             res.send(processedImage)
//           })
//       })
//       .catch(err => console.error(err))
//   } catch (err) {
//     next(err)
//   }
// })
