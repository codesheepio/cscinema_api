'use strict'

var app = require('../../server/server')

// Generate code of specified length
function genCode(length) {
  var text = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length))

  return text
}

// Return true if seat is booked, false otherwise
function checkAvailable(showtimeId, seat) {
  var BookedSeat = app.models.BookedSeat
  return new Promise((resolve, reject) => {
    BookedSeat.count(
      {
        showtime_id: showtimeId,
        seat: seat,
      },
      (err, count) => {
        if (err) {
          reject(err)
        }

        if (count > 0) {
          var error = new Error(`Seat ${seat} not available`)
          error.statusCode = '403'
          reject(error)
        }
        resolve(true)
      }
    )
  })
}
function checkAvailables(showtimeId, seats) {
  var promises = seats
  var promises = seats.map(seat => checkAvailable(showtimeId, seat))
  return Promise.all(promises)
}

function bookSeat(showtimeId, seat) {
  var BookedSeat = app.models.BookedSeat
  return new Promise((resolve, reject) => {
    BookedSeat.create(
      {
        showtime_id: showtimeId,
        seat: seat,
      },
      (err, bookedSeat) => {
        if (err) {
          reject(err)
        }
        resolve(bookedSeat)
      }
    )
  })
}
function bookSeats(showtimeId, seats) {
  var promises = seats.map(seat => bookSeat(showtimeId, seat))
  return Promise.all(promises)
}

module.exports = function(Booking) {
  Booking.on('attached', function() {
    var create = Booking.create
    Booking.create = function(data, accessToken, cb) {
      var showtimeId = data.showtime_id
      var seats = data.seats
      if (seats !== undefined) {
        checkAvailables(showtimeId, seats)
          .then(() => bookSeats(showtimeId, seats))
          .then(() => {
            return create.call(this, data, accessToken, cb)
          })
          .catch(err => {
            cb(err)
          })
      } else {
        return create.call(this, data, accessToken, cb)
      }
    }
  })

  // Generate code before save
  Booking.observe('before save', function generateCode(ctx, next) {
    // If model is created not update
    if (ctx.isNewInstance && ctx.instance) {
      ctx.instance.code = genCode(6)
    }
    next()
  })
}
