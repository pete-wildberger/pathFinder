import { Square } from './Square.class';
export class App {
  public width: number;
  public height: number;
  public board: any[];
  constructor(x: number, y: number) {
    (this.width = x), (this.height = y);
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
  run = () => {
    this.board = this.makeBoard(this.width, this.height);
    console.log(this.board);
  };
}
