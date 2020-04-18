import { Display } from "./Display";

export class TimeLeft {

  private static READY = 12;
  private static GOGO = 8;
  private static TOOLATE = 5;

  minutes(input: string): number {
    return 6;
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
