'use strict'

// Generate code of specified length
function genCode(length) {
  var text = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length))

  return text
}

module.exports = function(Booking) {
  Booking.observe('before save', function generateCode(ctx, next) {
    if (ctx.isNewInstance && ctx.instance) {
      ctx.instance.code = genCode(4)
    }
    next()
  })
}
