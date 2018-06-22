import * as Promise from "bluebird";

import { Servo } from "@iot/common/johnny-five";
import { Board, Pins } from "@iot/common/boards/arduino";

export class Base {

	public static DefaultPin: Pins.PWM = Pins.PWM.Pin3;

	public board: Board;

	private servo: Servo;
	private pin: Pins.PWM;


	public constructor ( board: Board, pin?: Pins.PWM ) {

		this.board = board;

		this.pin = pin || Base.DefaultPin;
	}


	public init = (): Promise<Base> => {
		return this.board.init()
			.then( () => {
				this.servo = new Servo({
					pin: ( this.pin as number )
				});
			})
			.then( () => {
				return this;
			})
		;
	};

	public rotate = ( angle: number, ccw: boolean = false ): void => {
		this.servo.to( ccw ? ( angle * -1 ) : angle );
	}
}