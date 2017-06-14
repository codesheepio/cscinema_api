'use strict'

module.exports = function(Showtime) {
  Showtime.on('attached', function() {
    // Also include movies in return json
    Showtime.findById = function(id, filter, cb) {
      var newFilter = filter || {}
      newFilter.where = { id: id }
      newFilter.include = ['movie', 'bookings']
      return Showtime.find.call(this, newFilter, cb)
    }

    var find = Showtime.find
    Showtime.find = function(filter, cb) {
      var newFilter = filter || {}
      newFilter.include = ['movie', 'bookings']
      return find.call(this, newFilter, cb)
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

  // Find by movieId
  Showtime.movies = function(movieId, cb) {
    return Showtime.find.call(this, { where: { movie_id: movieId } }, cb)
  }
  Showtime.remoteMethod('movies', {
    http: { verb: 'get', path: '/movies/:movieId' },
    accepts: { arg: 'movieId', type: 'number', required: true },
    returns: { type: 'array', root: true },
  })
}
