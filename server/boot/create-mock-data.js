module.exports = function(app) {
  var ds = app.dataSources.db
  ds.automigrate('Movie', function(err) {
    Movie = app.models.Movie
    Movie.create([
      {
        title: 'Ghost in the mirror',
        description: 'Long long long time ago in the future far far away',
      },
      {
        title: 'Romantic movie',
        description: 'loren ipsum',
      },
    ])
  })
  ds.automigrate('Showtime', function(err) {
    Showtime = app.models.Showtime
    Showtime.create([
      {
        showtime: '1330',
        movie_id: 1,
        theatre: 1,
      },
      {
        showtime: '1430',
        movie_id: 1,
        theatre: 2,
      },
      {
        showtime: '1530',
        movie_id: 2,
        theatre: 1,
      },
      {
        showtime: '0830',
        movie_id: 2,
        theatre: 2,
      },
    ])
  })
  ds.automigrate('Booking', function(err) {
    Booking = app.models.Booking
    Booking.create(
      {
        showtime_id: 1,
        code: 'A31C',
        seats: ['A21', 'A22'],
        email: 'topscores@gmail.com',
      },
      {
        showtime_id: 1,
        code: 'AXXC',
        seats: ['B21', 'J3'],
        email: 'ake@gmail.com',
      }
    )
  })
}
