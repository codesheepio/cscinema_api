'use strict'

module.exports = function(Showtime) {
  // Find by theatreId
  Showtime.theatres = function(theatreId, cb) {
    return Showtime.find.call(this, { where: { theatre: theatreId } }, cb)
  }
  Showtime.remoteMethod('theatres', {
    http: { verb: 'get', path: '/theatres/:theatreId' },
    accepts: { arg: 'theatreId', type: 'number', required: true },
    returns: { type: 'array', root: true },
  })
}
