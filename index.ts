const request = require('request');
const { five, Board, Led } = require('johnny-five');
const board = new Board();

/**
 * We abort the process when any of the required environmen variables is not set
 */
if (!process.env.RNV_API_TOKEN) {
  throw new Error('No API token via RNV_API_TOKEN set!');
}

// Interval in ms how often we want to update the data
const INTERVAL = 1000;

/**
 * Main function called when the board is booted and in ready state
 */
board.on('ready', function () {
  const led = new Led(13);

  setInterval(function() {
    request.get({
      url: getUrl(),
      headers: getHeaders()
    }, function(error: Error, response: any, body: any) {
      if (error) {
          console.log(`Error requesting data ${error}`);
          signalError(led);
          return;
      }

      const stop = JSON.parse(body);
      const workrelevant = stop.listOfDepartures.filter(function(departure: any) {
        return departure.direction == "Bismarckplatz";
      });
      const next = workrelevant[0];
      const nextTime = predictedTime(next.time);
      console.log(`Next departure is at ${nextTime} towards ${next.direction}. Current time: ${stop.time}`);

      if(typeof stop.pastRequestText !== undefined
        && stop.pastRequestText !== 'n/a') {
        console.log(`Past Request Text: ${stop.pastRequestText}`);
      }

      signalActive(led);
    });
  }, INTERVAL);

  signalActive(led);
});

/**
 * Signals running status.
 */
function signalActive(l: any) {
  l.strobe(1000);
}

/**
 * Signals an error retrieving data.
 */
function signalError(l: any) {
  l.strobe(100);
}

/** 
 * Prettifies the station time and returns a string
 * representing the time in a nice and human readable
 * way: "HH:MM"
 */
function predictedTime(stationTime: string) {
  // The station time displays planned and actual departure.
  // For example:
  //  - 19:03+0 (tram is on time) -> result "19:03"
  //  - 19:03+3 (tram is 3 minutes late) -> result: "19:06"
  //  - 18.04.2020 02:03+3 (tram is 3 minutes
  //              late but comes the next day)
  //              -> result: "02:06"
  //
  // We want to return the predicted time
  // independent of the date.

  // If the next tram is the next day
  // "18.04.2020 06:23" is returned
  // and we detect it by splitting by space
  let splitDate = stationTime.split(' ');
  let time = '';
  if(splitDate.length === 2) {
    time = splitDate[1];
  } else if(splitDate.length === 1) {
    time = splitDate[0]
  } else {
    throw new Error('Unknown time format');
  }

  // In case the tram is late, the time is
  // displayed as "19:03+3" indicating that
  // the tram is 3 minutes late.
  // The prediction is that it arrives at
  // 19:06.
  const splitTime = time.split('+');
  let planned;
  let minutesLater;
  if(splitTime.length === 2) {
    planned = splitTime[0];
    minutesLater = splitTime[1];

    const datestring = '1970-01-01T' + planned + ':00+01:00';
    const predicted = new Date(datestring);
    minutesLater = parseInt(minutesLater);
    predicted.setUTCMinutes(predicted.getUTCMinutes() + minutesLater);
    const predictedMinutes = predicted.getUTCMinutes();
    // As we have done calculation with the minutes,
    // we have to add the leading zero.
    const minutesText = (predictedMinutes < 10 ? '0' : '') + predicted.getMinutes();
    const hoursText = predicted.getHours();
    planned = `${hoursText}:${minutesText}`;
  } else if(time.length === 1) {
    planned = time[0];
  } else {
    throw new Error('Unknown time format');
  }

  return planned;
}

/**
 * Returns the URL to request the data for station "Eppelheimer Terasse".
 */
function getUrl() {
  // This is the stop id for station "Eppelheimer Terasse"
  const stopId = '4275';
  // When we set the *time* url parameter to 'null', we get the current time.
  return `http://rnv.the-agent-factory.de:8080/easygo2/api/regions/rnv/modules/stationmonitor/element?hafasID=${stopId}&time=null`;
}

/**
 * Returns an object containing all header information required for authentication and a correct request to the API.
 */
function getHeaders() {
  return {
    'RNV_API_TOKEN': process.env.RNV_API_TOKEN,
    'Content-Type': 'application/json'
  };
}


