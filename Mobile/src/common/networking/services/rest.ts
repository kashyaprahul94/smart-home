import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { Request, Response } from "../models";
import { HTTPClient } from "./http";

@Injectable()
export class RESTClient {

	public constructor ( private delegate: HTTPClient ) {

	}

	public get ( url: string, headers: any = {} ): Observable<Response> {
		return this.delegate.get(
			new Request()
				.setURL( url )
				//.setHeaders( headers )
		);
	}

	public post ( url: string, data: any, headers: any = {} ): Observable<Response> {
		return this.delegate.post(
			new Request()
				.setURL( url )
				.setData( data )
				//.setHeaders( headers )
		);
	}

	public put ( url: string, data?: any, headers: any = {} ): Observable<Response> {
		return this.delegate.put(
			new Request()
				.setURL( url )
				.setData( data )
				//.setHeaders( headers )
		);
	}

	public patch ( url: string, data: any, headers: any = {} ): Observable<Response> {
		return this.delegate.patch(
			new Request()
				.setURL( url )
				.setData( data )
				//.setHeaders( headers )
		);
	}

	public delete ( url: string, headers: any = {} ): Observable<Response> {
		return this.delegate.delete(
			new Request()
				.setURL( url )
				//.setHeaders( headers )
		);
	}
}