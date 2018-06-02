import { Square } from './Square.class';
export class App {
  public width: number;
  public height: number;
  public board: any[];
  public location: HTMLElement;
  constructor(x: number, y: number, location: HTMLElement) {
    (this.width = x), (this.height = y), (this.location = location);
  }
  blockIt = (e: Event) => {
    let pos: string[] = e.srcElement.id.split('_');
    let clicked: Square = this.board[+pos[1]][+pos[0]];
    clicked.blocked = !clicked.blocked;
    e.srcElement.classList.add('blocked');
    this.render_board();
  };

  makeBoard(width: number, height: number) {
    let board: any[] = [];
    for (let y = 0; y < height; y++) {
      board.push([]);
      for (let x = 0; x < width; x++) {
        board[y].push(new Square(x, y));
      }
    }
    return board;
  }
  run = (): void => {
    this.board = this.makeBoard(this.width, this.height);
    this.render_board();
  };
  render_board = (): void => {
    let squares: any[] = [];
    const addClass = (square: Square): string => {
      let classes: string = '';
      if (square.occupied) {
        classes += ' occupied';
      }
      if (square.dirty) {
        classes += ' dirty';
      }
      if (square.blocked) {
        classes += ' blocked';
      }
      return classes;
    };
    this.board.forEach((row: any[]) => {
      row.forEach((col: Square) => {
        let square: string = `<div class="square${addClass(col)}" id="${col.x}_${col.y}">`;
        square += '</div>';
        squares.push(square);
      });
    });
    this.location.innerHTML = squares.join(' ');
    Array.from(document.getElementsByClassName('square')).forEach(block => {
      block.addEventListener('click', this.blockIt, false);
    });
  };
}
