import * as Promise from "bluebird";
import { Led } from "johnny-five";
import { Arduino } from "@iot/common/boards/index";

import { IAppliance } from "@iot/smart-home/appliances/base";

export class Bulb implements IAppliance {

	private board: Arduino;
	private led: Led;
	private pin: number;

	public constructor ( pin: number = 13 ) {
		this.pin = pin;
		this.board = Arduino.Instance();
	}


	public init = (): Promise<Bulb> => {
		return this.board.init()
			.then( () => {
				this.led = new Led( {
					pin: this.pin
				});
			})
			.then( () => {
				return this;
			})
		;
	};

	public on = (): Bulb => {
		this.led.on();
		return this;
	};

	public off = (): Bulb => {
		this.led.off();
		return this;
	};
}