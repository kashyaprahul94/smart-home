import { Injectable } from "@angular/core";
import { RequestMethod } from "@angular/http";
import { HttpClient, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/of";
import "rxjs/add/observable/throw";

import { Request, Response } from "../models";

@Injectable()
export class HTTPClient {

	public constructor ( private delegate: HttpClient ) {

	}

	private doRequest ( method: RequestMethod, request: Request ): Observable<Response> {

		let subject: Observable<Object>;

		if ( method === RequestMethod.Get ) {
			subject = this.delegate.get( request.getURL(), request.build() );
		} else if ( method === RequestMethod.Post ) {
			subject = this.delegate.post( request.getURL(), request.getData(), request.build() );
		} else if ( method === RequestMethod.Put ) {
			subject = this.delegate.put( request.getURL(), request.getData(), request.build() );
		} else if ( method === RequestMethod.Patch ) {
			subject = this.delegate.patch( request.getURL(), request.getData(), request.build() );
		} else if ( method === RequestMethod.Delete ) {
			subject = this.delegate.delete( request.getURL(), request.build() );
		} else {
			subject = this.delegate.options( request.getURL(), request.build() );
		}

		return subject
			.catch( ( error: HttpErrorResponse ) => {
				if ( error.status >= 200 && error.status < 300 ) {
					const res = new HttpResponse({
						body: null,
						headers: error.headers,
						status: error.status,
						statusText: error.statusText,
						url: error.url
					});
					return Observable.of( res );
				} else {
					return Observable.throw( error );
				}
			})
			.map( ( response: HttpResponse<any> ) => {
				const data: any = response.body || {};
				return new Response()
					.setOkay( response.ok )
					.setStatus( response.status )
					.setStatusText( response.statusText )
					.setData( data )
					.setHeaders( response.headers )
				;
			})
		;
	}

	public get ( request: Request ): Observable<Response> {
		return this.doRequest( RequestMethod.Get, request );
	}

	public post ( request: Request ): Observable<any> {
		return this.doRequest( RequestMethod.Post, request );
	}

	public put ( request: Request ): Observable<any> {
		return this.doRequest( RequestMethod.Put, request );
	}

	public patch ( request: Request ): Observable<any> {
		return this.doRequest( RequestMethod.Patch, request );
	}

	public delete ( request: Request ): Observable<any> {
		return this.doRequest( RequestMethod.Delete, request );
	}
}