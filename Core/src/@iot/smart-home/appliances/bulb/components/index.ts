import * as Promise from "bluebird";

import { Board as Arduino } from "@iot/common/boards/arduino";

import { IAppliance } from "@iot/smart-home/appliances/base";

import { Lamp } from "./lamp";
import { Illuminance } from "./illuminance";
import { Base } from "./base";


export class Bulb implements IAppliance {

	public board: Arduino;

	private lamp: Lamp;
	private illuminance: Illuminance;
	private base: Base;

	public constructor ( pins?: number[] ) {

		this.board = Arduino.Instance();

		this.lamp = new Lamp( this.board, pins );
		this.illuminance = new Illuminance( this.board );
		this.base = new Base( this.board );
	}


	public init = (): Promise<Bulb> => {
		return this.board.init()
			.then( () => {
				return this.lamp.init();
			})
			.then( () => {
				return this.illuminance.init();
			})
			.then( () => {
				return this.base.init();
			})
			.then( () => {
				return this;
			})
		;
	};

	public getLamp (): Lamp {
		return this.lamp;
	}
	public getIlluminance (): Illuminance {
		return this.illuminance;
	}
	public getBase (): Base {
		return this.base;
	}
}