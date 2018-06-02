export class Wanderer {
  public position: { x: number; y: number };
  public wander_icon: string;
  constructor() {
    this.position = {
      x: 0,
      y: 0
    };
    this.wander_icon = '<img class="wanderer" src="assets/icons/baseline-directions_walk-24px.svg"/>';
  }
  getPosition() {
    return this.position;
  }
}
