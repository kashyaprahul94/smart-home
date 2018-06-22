import * as Promise from "bluebird";

import { Board as JBoard, BoardOption } from "@iot/common/johnny-five";

export class Board {

	private static _instance: Board = null;
	private board: JBoard;
	private initialized: boolean;

	private constructor ( options?: BoardOption ) {
		this.board = new JBoard( options );
		this.initialized = false;
	}

	public static Instance ( options?: BoardOption ): Board {
		if ( ! Board._instance ) {
			Board._instance = new Board( options );
		}
		return Board._instance;
	}

	public init (): Promise<JBoard> {
		if ( this.initialized ) {
			return Promise.resolve( this.board );
		} else {
			return new Promise( ( resolve: ( board: JBoard ) => void ) => {
				this.board.on( "ready", () => {
					this.initialized = true;
					resolve( this.board );
				});
			});
		}
	}
}