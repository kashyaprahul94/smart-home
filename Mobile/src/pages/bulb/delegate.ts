import { Injectable } from "@angular/core";

import { RESTClient } from "../../common/networking";
import { Observable } from "rxjs/Observable";

@Injectable()
export class BulbService {

	private static URI: string = "https://rk9401smarthome.localtunnel.me";
	private static Path: string = "bulb/v1";

	public constructor ( private restClient: RESTClient ) {

	}

	private switchOnBulb (): Observable<any> {
		const uri: string = [ BulbService.URI, BulbService.Path, "state" ].join( "/" );
		return this.restClient.put( uri )
	}
	private switchOffBulb (): Observable<any> {
		const uri: string = [ BulbService.URI, BulbService.Path, "state" ].join( "/" );
		return this.restClient.delete( uri )
	}
	public toggleBulbState ( state: boolean ): Observable<any> {
		return ( state ? this.switchOnBulb() : this.switchOffBulb() );
	}

	public setBrightness ( value: number ): Observable<any> {
		const uri: string = [ BulbService.URI, BulbService.Path, "brightness", value ].join( "/" );
		return this.restClient.put( uri )
	}
	public toggleAutoBrightness ( state: boolean ): Observable<any> {
		const uri: string = [ BulbService.URI, BulbService.Path, "brightness", "auto", state ].join( "/" );
		return this.restClient.put( uri )
	}

	public changeColor ( color: string ): Observable<any> {
		color = color.substring( color.indexOf( "#" ) + 1 );
		const uri: string = [ BulbService.URI, BulbService.Path, "color", color ].join( "/" );
		return this.restClient.put( uri )
	}

	public discoMode (): Observable<any> {
		const uri: string = [ BulbService.URI, BulbService.Path, "disco" ].join( "/" );
		return this.restClient.put( uri )
	}
}