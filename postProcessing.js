const fs = require('fs')
const file = 'dist/index.html'

fs.readFile(file, 'utf8', function (err, data) {
  if (err) return console.log(err)
  let result = data
  result = result.replace(/(?<=data-src=").+?(?=")/g, '{{PromoImage.Image}}')
  result = result.replace(/(?<=coupon-img.+?data-src=").+?(?=")/g, '{{CouponImage.Image}}')
  result = result.replace(/(?<=logo-badge.+\n.+?data-src=").+?(?=")/g, '{{LogoImage.Image}}')
  result = result.replace(/(?<=source src=").+?(?=")/g, '{{PromoImage.Video}}')
  result = result.replace(/(?<=source.+?badge-video.+?src=").+?(?=")/g, '{{ProductVideo.Video}}')
  result = result.replace(/(?<=product-box--video.+?url\().+?(?=\))/g, '{{PromoImage.Image}}')
  result = result.replace(/(?<=product-box--double.+?url\().+?(?=\))/g, '{{PromoImage.Image}}')
  fs.writeFile(file, result, 'utf8', function (err) {
    if (err) return console.log(error)
  })
})
