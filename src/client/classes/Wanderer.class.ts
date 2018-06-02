export class Wanderer {
  public position: { x: number; y: number };
  public limits: { x: number; y: number };
  public wander_icon: string;
  public past_moves: Array<{ x: number; y: number }> = [];
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
  findNeighbors(pos: { x: number; y: number }) {
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
  make_decision = (board: any[]): { x: number; y: number } => {
    let moves = this.find_moves(board);
    const last_len = this.past_moves.length;
    if (last_len > 0) {
      if (moves.length > 1) {
        moves = moves.filter(move => {
          return move.x !== this.past_moves[last_len - 1].x || move.y !== this.past_moves[last_len - 1].y;
        });
      }
    }
    let len: number = moves.length;
    // randomly decide which way to go
    let idx: number = this.getRandomInt(0, len - 1);
    return moves[idx];
  };
  find_moves = (board: any[]): Array<{ x: number; y: number }> => {
    let moves = [];
    const current: { x: number; y: number } = this.position;
    const neighbors: any = this.findNeighbors(current);
    for (let move in neighbors) {
      if (this.checkLimits(neighbors[move], board)) {
        moves.push(neighbors[move]);
      }
    }
    return moves;
  };
  move = (board: any[]) => {
    let next_move: { x: number; y: number } = this.make_decision(board);
    console.log(this.position);
    this.past_moves.push(this.position);
    this.position = next_move;
  };
  getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  getPosition(): { x: number; y: number } {
    return this.position;
  }
}
