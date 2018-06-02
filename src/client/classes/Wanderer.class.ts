export class Wanderer {
  public position: { x: number; y: number };
  public limits: { x: number; y: number };
  public wander_icon: string;
  constructor(x: number, y: number) {
    this.position = {
      x: 0,
      y: 0
    };
    this.limits = {
      x: x,
      y: y
    };
    this.wander_icon = '<img class="wanderer" src="assets/icons/baseline-directions_walk-24px.svg"/>';
  }
  checkLimits = (move: any): boolean => {
    if (this.position.x >= move.x && move.x <= this.limits.x && this.position.x >= move.x && move.y <= this.limits.y) {
      return true;
    }
    return false;
  };
  make_decision = (board: any[]) => {
    let moves = [];
  };
  getPosition() {
    return this.position;
  }
}
