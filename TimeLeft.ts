import { LedDisplay } from "./LedDisplay";
import { Display } from "./Display";

/**
 * TimeLeft calculates how many minutes are left and
 * sets the status accordingly on the display.
 */
export class TimeLeft {

  private static READY = 12;
  private static GOGO = 8;
  private static TOOLATE = 5;

  private diffMinutes(between: Date, and: Date) {
    let diff = (between.getTime() - and.getTime()) / 1000;
    diff /= 60
    return Math.abs(Math.round(diff));
  }

  minutes(stationTime: string): number {
    const splitTime  = stationTime.split('+');

    if(splitTime.length !== 2) {
      throw new Error('Unknown station time format');
    }

    const predicted= new Date();
    const plannedStationTime = splitTime[0];
    const hour = parseInt(plannedStationTime.split(':')[0]);
    const minutes = parseInt(plannedStationTime.split(':')[1]);
    predicted.setHours(hour);
    predicted.setMinutes(minutes);
    const minutesLater = parseInt(splitTime[1]);
    predicted.setMinutes(predicted.getMinutes() + minutesLater);

    const now = new Date();
    return this.diffMinutes(predicted, now);
  }

  writeStatus(minutesLeft: number, display: Display) {
    if(TimeLeft.GOGO < minutesLeft && minutesLeft <= TimeLeft.READY) {
      display.getReady();
    } else if(TimeLeft.TOOLATE < minutesLeft && minutesLeft <= TimeLeft.GOGO) {
      display.leaveHouse();
    } else {
      display.stayHome();
    }
  }
}
