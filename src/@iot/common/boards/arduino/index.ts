import * as Promise from "bluebird";
import { Board, BoardOption } from "johnny-five";

export class Arduino {

	private static _instance: Arduino = null;
	private board: Board;

	private constructor ( options?: BoardOption ) {
		this.board = new Board( options );
	}

	public static Instance ( options?: BoardOption ): Arduino {
		if ( ! Arduino._instance ) {
			Arduino._instance = new Arduino( options );
		}
		return Arduino._instance;
	}

	public init (): Promise<Board> {
		return new Promise( ( resolve: ( board: Board ) => void ) => {
			this.board.on( "ready", () => {
				resolve( this.board );
			});
		});
	}
}