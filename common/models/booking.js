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
  // Override findById function to find by code instead of id
  Booking.on('attached', function() {
    Booking.findById = function(id, filter, cb) {
      var newFilter = filter || {}
      newFilter.where = { code: id }
      return Booking.find.call(this, newFilter, cb)
    }
  })

  // Generate code before save
  Booking.observe('before save', function generateCode(ctx, next) {
    // If model is created not update
    if (ctx.isNewInstance && ctx.instance) {
      ctx.instance.code = genCode(4)
    }
    next()
  })
}
