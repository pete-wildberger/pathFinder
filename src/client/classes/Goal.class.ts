import { coordinate } from './App.class';
export class Goal {
  public position: coordinate;
  public goal_icon: string;
  constructor(x: number, y: number) {
    this.position = {
      x: x - 1,
      y: y - 1
    };
    this.goal_icon = '<img class="wanderer" src="assets/icons/baseline-local_bar-24px.svg"/>';
  }
  getPosition(): coordinate {
    return this.position;
  }
}
