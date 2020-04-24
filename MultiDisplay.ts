import { Display } from "./Display";

export class MultiDisplay implements Display {
  private readonly displays: Display[];
  constructor(displays: Display[]) {
    this.displays = displays;
  }

  stayHome(): void {
    this.displays.forEach((display) => {
      display.stayHome();
    });
  }
  getReady(): void {
    this.displays.forEach((display) => {
      display.getReady();
    });
  }
  leaveHouse(): void {
    this.displays.forEach((display) => {
      display.leaveHouse();
    });
  }
  error(): void {
    this.displays.forEach((display) => {
      display.error();
    });
  }
}