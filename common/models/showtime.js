'use strict'

module.exports = function(Showtime) {
  Showtime.on('attached', function() {
    // Also include movies in return json
    Showtime.findById = function(id, filter, cb) {
      var newFilter = filter || {}
      newFilter.id = id
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
}
