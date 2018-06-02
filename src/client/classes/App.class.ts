import { Square } from './Square.class';
import { Wanderer } from './Wanderer.class';
import { Goal } from './Goal.class';
export class App {
  public width: number;
  public height: number;
  public board: any[];
  public location: HTMLElement;
  public wanderer: Wanderer;
  public goal: Goal;
  constructor(x: number, y: number, location: HTMLElement) {
    (this.width = x),
      (this.height = y),
      (this.location = location),
      (this.wanderer = new Wanderer(x, y)),
      (this.goal = new Goal(x, y));
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
    this.wanderer.move(this.board);
  };
  render_board = (): void => {
    let output: string[] = [];
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
      output.push('<div class="row">');
      row.forEach((col: Square) => {
        let square: string = `<div class="col-10x10 square ${addClass(col)}" id="${col.x}_${col.y}">`;
        square += '</div>';
        output.push(square);
      });
      output.push('</div>');
    });
    this.location.innerHTML = output.join(' ');
    let wander_pos = this.wanderer.getPosition();
    let $wanderer = document.getElementById(`${wander_pos.x}_${wander_pos.y}`);
    $wanderer.innerHTML = this.wanderer.wander_icon;
    let goal_pos = this.goal.getPosition();
    let $goal = document.getElementById(`${goal_pos.x}_${goal_pos.y}`);
    $goal.innerHTML = this.goal.goal_icon;
    Array.from(document.getElementsByClassName('square')).forEach(block => {
      block.addEventListener('click', this.blockIt, false);
    });
  };
}
