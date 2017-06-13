'use strict'

module.exports = function(Showtime) {
  Showtime.on('attached', function() {
    // Also include movies in return json
    var findById = Showtime.findById
    Showtime.findById = function(id, filter, cb) {
      var newFilter = filter || {}
      newFilter.include = 'movie'
      return findById.call(this, id, newFilter, cb)
    }

    var find = Showtime.find
    Showtime.find = function(filter, cb) {
      var newFilter = filter || {}
      newFilter.include = 'movie'
      return find.call(this, newFilter, cb)
    }
  })
}
