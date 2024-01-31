import Array2d from "../utils/array2d";
import Rectangle from "../utils/rectangle";
import {
  iter_adjacent,
  intersects,
  array_test,
  iter_2d,
  iter_range,
} from "../utils";
import { Facings, facing, vector, Rooms } from "../const";
// import { Rooms } from "../../types";
import Room from "./room";

let next_piece_id = 0;

// base dungeon piece class, to be extended
export default class Piece {
  position!: vector;
  size!: vector;
  parent?: Piece;
  children: Array<Piece> = [];
  id = next_piece_id++;
  walls: Array2d<any>;
  perimeter: Array<[vector, Facings]> = [];
  max_exits!: number;
  exits: Array<[vector, Facings, Piece]> = [];
  start_pos!: vector;
  options: any;

  constructor(options: Partial<PieceOptions>) {


    options = Object.assign(
      {
        size: [1, 1],
        position: [0, 0],
        parent: null,
        max_exits: 10,
        tag: "",
      },
      options
    );

    Object.assign(this, JSON.parse(JSON.stringify(options)));

    this.walls = new Array2d(this.size, true);

    // console.log('[Piece]:',options, (<any>this).room_size);

    this.options = options;

    
  }

  get rect() {
    return new Rectangle(
      this.position[0],
      this.position[1],
      this.size[0],
      this.size[1]
    );
  }

  // is_exit([x, y]) {
  //   return (
  //     this.exits.filter(([exit_x, exit_y, ...rest]) => {
  //       return exit_x === x && exit_y === y;
  //     }).length !== 0
  //   );
  // }

  // get_non_wall_tiles() {
  //   const retv = [];
  //   this.walls.iter((pos, is_wall) => {
  //     if (!is_wall) {
  //       retv.push(pos);
  //     }
  //   });
  //   return retv;
  // }

  get_perimeter_by_facing(facing: Facings) {
    return this.perimeter.filter(([[x, y], f]) => {
      return facing === f;
    });
  }

  // get_inner_perimeter() {
  //   // returns array of tiles in the piece that are adjacent to a wall,
  //   // but not an exit;

  //   const retv = [];
  //   let haswall;
  //   let exit_adjacent;

  //   this.walls.iter((pos, is_wall) => {
  //     if (!is_wall && !this.is_exit(pos)) {
  //       haswall = false;
  //       exit_adjacent = false;
  //       iter_adjacent(pos, (p) => {
  //         haswall = haswall || this.walls.get(p);
  //         exit_adjacent = exit_adjacent || this.is_exit(p);
  //       });
  //       if (haswall && !exit_adjacent) {
  //         retv.push(pos);
  //       }
  //     }
  //   });

  //   return retv;
  // }

  // local position to parent position
  parent_pos([x, y]: vector): vector {
    return [this.position[0] + x, this.position[1] + y];
  }

  // local position to global position
  global_pos(pos: vector) {
    pos = this.parent_pos(pos);
    if (this.parent) {
      pos = this.parent.global_pos(pos);
    }
    return pos;
  }

  // parent position to local position
  local_pos(pos: vector): vector {
    return [pos[0] - this.position[0], pos[1] - this.position[1]];
  }

  // get (roughly) center tile position for the piece
  // @TODO consider if should use Math.floor instead of Math.round
  get_center_pos(): vector {
    return [Math.floor(this.size[0] / 2), Math.floor(this.size[1] / 2)];
  }

  add_perimeter(p_from: vector, p_to: vector, facing: Facings) {
    iter_range(p_from, p_to, (pos) => {
      this.perimeter.push([pos, facing]);
    });
  }

  remove_perimeter(rect: Rectangle) {
    this.perimeter = this.perimeter.filter(([[x, y], facing]) => {
      return !rect.contains(x, y, 1, 1);
    });
  }

  // intersects(piece) {
  //   return intersects(this.position, this.size, piece.position, piece.size);
  // }

  add_piece(piece: Piece, position?: vector) {
    if (array_test(this.children, (c) => c.id === piece.id)) {
      return;
    }
    piece.parent = this;
    if (position) {
      piece.position = position;
    }
    this.children.push(piece);
    this.paste_in(piece);
  }

  paste_in(piece: Piece) {
    iter_2d(piece.size, (pos) => {
      const is_wall = piece.walls.get(pos);
      if (!is_wall) {
        this.walls.set(piece.parent_pos(pos), false);
      }
    });
  }

  add_exit(exit: facing, room: Piece) {
    this.walls.set(exit[0], false);
    if (this.parent) {
      this.parent.paste_in(this);
    }
    this.exits.push([exit[0], exit[1], room]);
  }

  print() {
    // console.log('PRINT', this);
    
    for (let y = 0; y < this.size[1]; y++) {
      let row = "";
      for (let x = 0; x < this.size[0]; x++) {
        if (
          this.start_pos &&
          this.start_pos[0] === x &&
          this.start_pos[1] === y
        ) {
          row += "s";
        } else {
          row += this.walls.get([x, y]) ? "x" : " ";
        }
      }
      console.log(row);
    }
  }
}

export interface PieceOptions {
  size: vector,
  position: vector,
  parent: Piece,
  max_exits: number,
  tag: keyof Rooms,
}