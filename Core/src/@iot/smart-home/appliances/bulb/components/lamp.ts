import * as Promise from "bluebird";

import { Led } from "@iot/common/johnny-five";
import { Board, Pins } from "@iot/common/boards/arduino";
import { Logger } from "@iot/common/logger";

import { Illuminance } from "./illuminance";

export class Lamp {

	public static DefaultPins: Pins.PWM[] = [ Pins.PWM.Pin9, Pins.PWM.Pin10, Pins.PWM.Pin11 ];
	public static DefaultColor: string = "#000000";

	public board: Board;

	private led: Led.RGB;
	private pins: Pins.PWM[];

	private color: string;
	private brightness: number;
	private autoBrighness: boolean;


	public constructor ( board: Board, pins?: Pins.PWM[] ) {

		this.board = board;

		this.pins = pins || Lamp.DefaultPins;

		this.color = Lamp.DefaultColor;
		this.brightness = 100;
		this.autoBrighness = false;

		this.setupEvents();
	}


	public init = (): Promise<Lamp> => {
		return this.board.init()
			.then( () => {
				this.led = new Led.RGB( {
					pins: ( this.pins as number [] ),
					isAnode: true
				});
			})
			.then( () => {
				return this.switchOff();
			})
		;
	};

	public switchOn = (): Lamp => {
		this.led.on();
		return this;
	};

	public switchOff = (): Lamp => {
		this.led.off();
		return this;
	};

	public setAutoBrightness = ( value: boolean ): Lamp => {
		this.autoBrighness = value;
		//this.autoBrighness = ! this.autoBrighness;
		return this;
	};

	public setBrighness = ( value: number ): Lamp => {
		this.brightness = value;
		this.led.intensity( value );
		return this;
	};

	public setColor = ( hex: string ): Lamp => {
		try {
			this.color = hex;
			this.led.color( hex );
			return this;
		} catch {

		}
	};

	private onBrightnessValueChanged = ( value: number ): void => {
		if ( this.autoBrighness ) {
			Logger.Info( "Auto_Brightness_Value: %d", value );
			this.setBrighness( value );
		}
	};

	private setupEvents (): void {
		Illuminance.IntensityChagnedSubject.subscribe( this.onBrightnessValueChanged );
	}
}