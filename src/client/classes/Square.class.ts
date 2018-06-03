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
  addClass = (): string => {
    let classes: string = '';
    if (this.occupied) {
      classes += ' occupied';
    }
    if (this.dirty) {
      classes += ' dirty';
    }
    if (this.blocked) {
      classes += ' blocked';
    }
    return classes;
  };
  getSquare = () => {
    return `<div class="col-10x10 square ${this.addClass()}" id="${this.x}_${this.y}"></div>`;
  };
}
