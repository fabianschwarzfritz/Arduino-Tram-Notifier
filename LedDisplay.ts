import { Led } from "johnny-five";
import { Display } from "./Display";

export class LedDisplay implements Display {
  private red: Led;
  private yellow: Led;
  private green: Led;

  constructor(red: Led, yellow: Led, green: Led) {
    this.red = red;
    this.yellow = yellow;
    this.green = green;
  }

  static fromPins(connection: Record<string, number>): LedDisplay {
    const pinRed = connection.red;
    const pinYellow = connection.yellow;
    const pinGreen = connection.green ;

    if (typeof pinRed !== "number"
        || typeof pinYellow !== "number"
        || typeof pinGreen !== "number") {
      throw new Error('Required pins not provided')
    }

    return new LedDisplay(
      new Led(pinRed),
      new Led(pinYellow),
      new Led(pinGreen)
    );
  }

  private resetDisplay(): void {
    this.red.stop(1);
    this.red.off();
    this.yellow.stop(1);
    this.yellow.off();
    this.green.stop(1);
    this.green.off();
  }

  stayHome(): void {
    this.resetDisplay();
    this.red.on();
  }

  getReady(): void {
    this.resetDisplay();
    this.yellow.on();
  }

  leaveHouse(): void {
    this.resetDisplay();
    this.green.on();
  }

  error(): void {
    this.resetDisplay();
    this.red.strobe(100);
    this.yellow.strobe(100);
    this.green.strobe(100);
  }
}
