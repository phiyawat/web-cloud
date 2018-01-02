var list =
[
  {
    type: 'ONE_WAY',
    outbound: {
      airline: 'AeroFlot',
      direction: 'OUTBOUND',
      price: 636.0,
      takeOffFrom: 'Suvanabhumi, Terminal',
      takeOffTime: {
        year: 2017,
        month: 10,
        dayOfMonth: 28,
        hourOfDay: 10,
        minute: 40,
        second: 0
      },
      landingTo: 'Paris-Charles-de-Gaulle, Terminal2C',
      landingTime: {
        year: 2017,
        month: 10,
        dayOfMonth: 29,
        hourOfDay: 22,
        minute: 30,
        second: 0
      },
      transists: [
        {
          fromAirport: 'Suvanabhumi, Terminal',
          toAirport: 'Sheremetyevo, Terminal F',
          order: 1,
          flightNO: 'SU271',
          aircraftType: 'Airbus333',
          airline: 'Aeroflot',
          seatClass: 'ECONOMY',
          remainingSeats: 4
        },
        {
          fromAirport: 'Sheremetyevo Terminal',
          toAirport: 'Paris-Charles-De-Gaulle, Terminal2C',
          order: 2,
          flightNO: 'SU2460',
          aircraftType: 'Airbus320',
          airline: 'Aeroflot',
          seatClass: 'ECONOMY',
          remainingSeats: 4
        }
      ]
    }
  },
  {
    type: 'ONE_WAY',
    outbound: {
      airline: 'Thai Airways',
      direction: 'OUTBOUND',
      price: 930.0,
      takeOffFrom: 'Suvanabhumi, Terminal',
      takeOffTime: {
        year: 2017,
        month: 10,
        dayOfMonth: 28,
        hourOfDay: 23,
        minute: 40,
        second: 0
      },
      landingTo: 'Paris-Charles-de-Gaulle, Terminal1A',
      landingTime: {
        year: 2017,
        month: 10,
        dayOfMonth: 29,
        hourOfDay: 8,
        minute: 30,
        second: 0
      },
      transists: [
        {
          fromAirport: 'Suvanabhumi, Terminal',
          toAirport: 'Brisbane Airport, Terminal D',
          order: 1,
          flightNO: 'TG930',
          aircraftType: 'Airbus320',
          airline: 'Thai Airways',
          seatClass: 'FIRST_CLASS',
          remainingSeats: 10
        },
        {
          fromAirport: 'Brisbane Airport, Terminal D',
          toAirport: 'Paris-Charles-De-Gaulle, Terminal1A',
          order: 2,
          flightNO: 'TG933',
          aircraftType: 'Airbus320',
          airline: 'Thai Airways',
          seatClass: 'BUSINESS',
          remainingSeats: 10
        }
      ]
    }
  }
]

exports.findAll = function () {
  console.log('List: ' + list)
  return list
}

exports.findById = function (id) {
  for (var i = 0;i < list.length;i++) {
    if (list[i].id == id) {
      return list[i]
    }
  }
}
