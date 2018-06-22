import * as Timers from "timers";
import { Bulb } from "../components";

import { Logger } from "@iot/common/logger";

interface EventResponse {
	value?: string | boolean | number;
	mode?: string | boolean | number;
}

export class BulbService {

	private delegate: Bulb;
	private eventsIO: SocketIOClient.Socket;
	private static DiscoModeTimer: NodeJS.Timer;

	private static DiscoModeMaxSeconds: number = 60;

	public constructor ( delegate: Bulb, eventsIO: SocketIOClient.Socket ) {

		this.delegate = delegate;
		this.eventsIO = eventsIO;

		this.setupEvents();
	}

	public switchOn = (): void => {
		this.delegate.getLamp().switchOn();
	};

	public switchOff = (): void => {
		this.delegate.getLamp().switchOff();
	};

	public setIntensity = ( value: number ): void => {
		this.delegate.getLamp().setBrighness( value );
	};

	public setAutoBrightness = ( value: boolean ): void => {
		this.delegate.getLamp().setAutoBrightness( value );
	};

	public setColor = ( color: string ): void => {
		Logger.Info( "COLOR_RECEIVED %s", color );
		this.delegate.getLamp().setColor( `#${ color }` );
	};

	public rotate = ( ccw: boolean ): void => {
		this.delegate.getBase().rotate( 180, ccw );
	};

	public discoMode = (): NodeJS.Timer => {
		const colors: string[] = [ "ff0000", "00ff00", "0000ff", "ffaf00", "ff0083", "7500ff" ];
		let index: number = 0;
		Timers.setTimeout( BulbService.ClearDiscoMode, ( BulbService.DiscoModeMaxSeconds * 1000 ) );
		return Timers.setInterval( () => {
			this.setColor( colors[ index % colors.length ] );
			index = ( index === colors.length ) ? 0 : ( index + 1 );
			this.rotate( ( index % 2 ) === 0 );
		}, 500 );
	};

	public static ClearDiscoMode = (): void => {
		clearInterval( BulbService.DiscoModeTimer );
	};


	private onBulbStateEvent = ( data: EventResponse ): void => {
		( data.value as boolean ) ? this.switchOn() : this.switchOff();
	};
	private onBulbColorEvent = ( data: EventResponse ): void => {
		this.setColor( data.value as string );
	};
	private onBulbModeEvent = ( data: EventResponse ): void => {
		if ( data.mode === "PARTY_MODE" ) {
			BulbService.DiscoModeTimer = this.discoMode();
		}
	};


	private setupEvents (): void {
		this.eventsIO.on( "Equipment:Bulb:State", this.onBulbStateEvent );
		this.eventsIO.on( "Equipment:Bulb:Color", this.onBulbColorEvent );
		this.eventsIO.on( "Equipment:Bulb:Mode", this.onBulbModeEvent );
	}
}