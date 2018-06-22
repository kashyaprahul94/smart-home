import * as Promise from "bluebird";
import { Subject } from "rxjs/Subject";

import { Sensor } from "@iot/common/johnny-five";
import { Board, Pins } from "@iot/common/boards/arduino";

export class Illuminance {

	public static DefaultPin: Pins.Analog = Pins.Analog.A5;

	public board: Board;

	private ldr: Sensor;
	private pin: Pins.Analog;

	private intensity: number;

	public static IntensityChagnedSubject: Subject<number> = new Subject<number>();


	public constructor ( board: Board, pin?: Pins.Analog ) {

		this.board = board;

		this.pin = pin || Illuminance.DefaultPin;
	}


	public init = (): Promise<Illuminance> => {
		return this.board.init()
			.then( () => {
				this.ldr = new Sensor({
					pin: ( this.pin as string ),
					freq: true
				});
				this.ldr.on("data", this.onData );
			})
			.then( () => {
				return this;
			})
		;
	};

	private calcualteBrightness (): number {
		let brightness: number = ( Math.round( ( this.intensity * 100 ) / 1000 ) );
		brightness = ( brightness > 100 ) ? 100 : brightness;
		brightness = ( brightness < 0 ) ? 0 : brightness;
		return brightness;
	}

	private onData = ( value: number ): void => {
		this.intensity = value;
		Illuminance.IntensityChagnedSubject.next( this.calcualteBrightness() );
	};
}