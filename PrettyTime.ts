
/** 
 * PrettyTime helps to display the time coming back from the RNV
 * api in a nice way. 
 */
export class PrettyTime {

  /** 
   * Prettifies the station time and returns a string
   * representing the time in a nice and human readable
   * way: "HH:MM"
   */
  predictedTime(stationTime: string) {
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
      predicted.setUTCMinutes(predicted.getMinutes() + minutesLater);
      const predictedMinutes = predicted.getMinutes();
      // As we have done calculation with the minutes,
      // we have to add the leading zero.
      const minutesText = (predictedMinutes < 10 ? '0' : '') + predicted.getMinutes();
      const hoursText = predicted.getHours();
      planned = `${hoursText}:${minutesText}`;
    } else if(splitTime.length === 1) {
      planned = splitTime[0];
    } else {
      throw new Error('Unknown time format');
    }

    return planned;
  } 
};