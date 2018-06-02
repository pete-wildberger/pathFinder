export class Wanderer {
  public position: { x: number; y: number };
  public limits: { x: number; y: number };
  public wander_icon: string;
  public past_moves: Array<{ x: number; y: number }>;
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
  make_decision = (board: any[]) => {
    let moves = [];
    const checkLimits = (move: any, board: any[]): boolean => {
      if (move.x >= 0 && move.x <= this.limits.x && move.y >= 0 && move.y <= this.limits.y) {
        if (board[move.y][move.x].blocked === false) {
          return true;
        }
      }
      return false;
    };
    let current: { x: number; y: number } = this.position;
    const neighbors: any = this.findNeighbors(current);
    for (let move in neighbors) {
      if (checkLimits(neighbors[move], board)) {
        moves.push(neighbors[move]);
      }
    }
    console.log(moves);
  };
  move = (board: any[]) => {
    this.make_decision(board);
  };
  getPosition(): { x: number; y: number } {
    return this.position;
  }
}
