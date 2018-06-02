export class Square {
  public x: number;
  public y: number;
  public blocked: boolean = false;
  public occupied: boolean = false;
  public dirty: boolean = false;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
