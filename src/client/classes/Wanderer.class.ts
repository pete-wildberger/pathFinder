import { coordinate } from './App.class';

export class Wanderer {
  public position: coordinate;
  public limits: coordinate;
  public wander_icon: string;
  public past_moves: coordinate[] = [];
  constructor(x: number, y: number) {
    this.position = {
      x: 0,
      y: 0
    };
    this.limits = {
      x: x - 1,
      y: y - 1
    };
    this.wander_icon = '<img class="wanderer" src="assets/icons/baseline-directions_walk-24px.svg"/>';
  }
  checkLimits = (move: any, board: any[]): boolean => {
    if (move.x >= 0 && move.x <= this.limits.x && move.y >= 0 && move.y <= this.limits.y) {
      if (board[move.y][move.x].blocked === false) {
        return true;
      }
    }
    return false;
  };
  distance_to_goal(pos: coordinate[], goal: coordinate): coordinate[] {
    let output: coordinate[] = [...pos];
    // let close_moves: coordinate[];
    console.log(output);
    output.forEach((coor: any) => {
      let x: number = goal.x - coor.x;
      let y: number = goal.y - coor.y;
      coor.distance = Math.abs(x + y);
    });
    return output.sort((a: any, b: any) => {
      return a.distance - b.distance;
    });
  }
  findNeighbors(pos: coordinate) {
    return {
      n: {
        x: pos.x,
        y: pos.y - 1
      },
      s: {
        x: pos.x,
        y: pos.y + 1
      },
      e: {
        x: pos.x + 1,
        y: pos.y
      },
      w: {
        x: pos.x - 1,
        y: pos.y
      }
    };
  }
  make_decision = (board: any[], goal: coordinate): { x: number; y: number } => {
    let last_len: number = this.past_moves.length;
    let moves: coordinate[] = this.find_moves(board);
    // add distance and sort by least distance
    moves = this.distance_to_goal(moves, goal);
    if (last_len > 0) {
      let last_idx: number = moves.findIndex(move => {
        return move.x === this.past_moves[last_len - 1].x && move.y === this.past_moves[last_len - 1].y;
      });
      // moving backwards is our last choice
      if (last_idx > -1) {
        moves.push(moves.splice(last_idx, 1)[0]);
      }
    }
    if (moves.length > 1 && moves[0].distance === moves[1].distance) {
      let idx: number = this.getRandomInt(0, 2 - 1);
      return moves[idx];
    } else {
      return moves[0];
    }
  };
  find_moves = (board: any[]): coordinate[] => {
    let moves = [];
    const current: coordinate = this.position;
    const neighbors: any = this.findNeighbors(current);
    for (let move in neighbors) {
      if (this.checkLimits(neighbors[move], board)) {
        moves.push(neighbors[move]);
      }
    }
    return moves;
  };
  move = (board: any[], goal: coordinate): void => {
    let next_move: coordinate = this.make_decision(board, goal);
    this.past_moves.push(this.position);
    this.position = next_move;
  };
  getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  getPosition(): coordinate {
    return this.position;
  }
}
