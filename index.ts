import { PrettyTime } from "./PrettyTime";
import { StartParameter } from "./StartParameter";

const request = require('request');
const { five, Board, Led } = require('johnny-five');
const board = new Board();

// Interval in ms how often we want to update the data
const INTERVAL = 1000;

new StartParameter(process.env).validate();

/**
 * Main function called when the board is booted and in ready state
 */
board.on('ready', () => {
  const led = new Led(13);

  setInterval(() => {
    request.get({
      url: getUrl(),
      headers: getHeaders()
    }, (error: Error, response: any, body: any) => {
      if (error) {
          console.log(`Error requesting data ${error}`);
          signalError(led);
          return;
      }

      const stop = JSON.parse(body);
      const workrelevant = stop.listOfDepartures.filter((departure: any) => {
        return departure.direction == "Bismarckplatz";
      });
      const next = workrelevant[0];
      const nextTime = new PrettyTime().predictedTime(next.time);
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
const signalActive = (l: any) => {
  l.strobe(1000);
}

/**
 * Signals an error retrieving data.
 */
const signalError = (l: any) => {
  l.strobe(100);
}

/**
 * Returns the URL to request the data for station "Eppelheimer Terasse".
 */
const getUrl = () => {
  // This is the stop id for station "Eppelheimer Terasse"
  const stopId = '4275';
  // When we set the *time* url parameter to 'null', we get the current time.
  return `http://rnv.the-agent-factory.de:8080/easygo2/api/regions/rnv/modules/stationmonitor/element?hafasID=${stopId}&time=null`;
}

/**
 * Returns an object containing all header information required for authentication and a correct request to the API.
 */
const getHeaders = () => {
  return {
    'RNV_API_TOKEN': process.env.RNV_API_TOKEN,
    'Content-Type': 'application/json'
  };
}


