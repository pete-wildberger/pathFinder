import { Square } from './Square.class';
export class App {
  public width: number;
  public height: number;
  public board: any[];
  public location: HTMLElement;
  constructor(x: number, y: number, location: HTMLElement) {
    (this.width = x), (this.height = y), (this.location = location);
  }
  makeBoard(width: number, height: number) {
    let board: any[] = [];
    for (let i = 0; i < height; i++) {
      board.push([]);
      for (let j = 0; j < width; j++) {
        board[i].push(new Square());
      }
    }
    return board;
  }
  run = (): void => {
    this.board = this.makeBoard(this.width, this.height);
    this.render_board();
    console.log(this.board);
  };
  render_board = (): void => {
    let squares: any[] = [];
    const addClass = (square: Square): string => {
      let classes: string = '';
      console.log(square);
      if (square.occupied) {
        classes += ' occupied';
      }
      if (square.dirty) {
        classes += ' dirty';
      }
      if (square.blocked) {
        classes += ' blocked';
      }
      console.log(classes);
      return classes;
    };
    this.board.forEach((row: any[]) => {
      row.forEach((col: Square) => {
        let square: string = `<div class="square${addClass(col)}">`;
        square += '</div>';
        squares.push(square);
      });
    });
    this.location.innerHTML = squares.join(' ');
  };
}
