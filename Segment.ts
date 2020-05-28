import { Led } from "johnny-five";
import { Display } from "./Display";

export class Segment {

  private readonly digits: number;

  constructor(dataPin: number, clockPin: number, csPin: number) {
    this.digits = new five.Led.Digits({
      pins: {
        data: dataPin,
        clock: clockPin,
        cs: csPin
      }
    });
  }
}
