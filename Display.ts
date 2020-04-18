import { Led } from "johnny-five";

export class Display {
  private red: Led;
  private yellow: Led;
  private green: Led;

  constructor(connection: Record<string, number>) {
    const pinRed = connection.red;
    const pinYellow = connection.yellow;
    const pinGreen = connection.green;

    if (typeof pinRed !== "number"
        || typeof pinYellow !== "number"
        || typeof pinGreen !== "number") {
      throw new Error('Required pins not provided')
    }

    this.red = new Led(pinRed);
    this.yellow = new Led(pinYellow);
    this.green= new Led(pinGreen);
  }

  stayHome() {
    this.red.on();
    this.yellow.off();
    this.green.off();
  }

  getReady() {
    this.red.off();
    this.yellow.on();
    this.green.off();
  }

  leaveHouse() {
    this.red.off();
    this.yellow.off();
    this.green.on();
  }

  error() {
    this.red.strobe(100);
    this.yellow.strobe(100);
    this.green.strobe(100);
  }
}
