'use strict'

module.exports = function(Showtime) {
  Showtime.on('attached', function() {
    var findById = Showtime.findById
    Showtime.findById = function(id, filter, options, cb) {
      var newFilter = {
        ...filter,
      }
      if (newFilter.include === undefined) {
        newFilter.include = ['movie']
      } else {
        newFilter.include = ['movie', ...filter.include]
      }
      return findById.call(this, id, newFilter, options, cb)
    }
    var find = Showtime.find
    Showtime.find = function(filter, options, cb) {
      var newFilter = {
        ...filter,
      }
      if (newFilter.include === undefined) {
        newFilter.include = ['movie']
      } else {
        newFilter.include = ['movie', ...filter.include]
      }
      return find.call(this, newFilter, options, cb)
    }
  })
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
