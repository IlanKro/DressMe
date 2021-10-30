import { makeAutoObservable } from "mobx";

class Timer {
  secondsPassed: number = 0;
  constructor() {
    makeAutoObservable(this);
  }
  increaseTimer() {
    this.secondsPassed += 1;
  }
  resetTimer() {
    this.secondsPassed = 0;
  }
}

export const completionTimer = new Timer();
setInterval(() => {
  completionTimer.increaseTimer();
}, 1000);
