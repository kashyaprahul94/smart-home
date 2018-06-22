import { IncomingHttpHeaders } from "http";
import { Response as ExpressResponse } from "express";
import { Observable } from "rxjs/Observable";

import { Request, HybridResponse, IHeader, Header, HeaderValueType } from "../index";

export class Response {

    private _request: Request;
    private _status: number;
    private _data: any;
    private _headers: IHeader;
    private _hasBody: boolean;

    constructor ( request: Request = null, status: number = -1, headers: IHeader = null, data: any = null, hasBody: boolean = true ) {
		this._request = request;
        this._status = status;
        this._headers = headers;
        this._data = data;
        this._hasBody = hasBody;
    }


	public request (): Request {
		return this._request;
	}
	public setRequest ( request: Request ): Response {
		this._request = request;
		return this;
	}

    public status (): number {
        return this._status
    }
    public setStatus ( status: number ): Response {
        this._status = status;
        return this;
    }

	public headers ( name?: string ): HeaderValueType | IHeader {
		if ( name ) {
			return this._headers[ name ];
		}
		return this._headers;
	}
	public getHeaders (): IHeader {
		return this._headers;
	}
    public setHeaders ( headers: IHeader ): Response {
        this._headers = headers;
        return this;
    }
	public setIncomingHeaders ( headers: IncomingHttpHeaders ): Response {
		this._headers = headers;
		return this;
	}

    public data (): any {
        return this._data;
    }
    public setData ( data: any ): Response {
        this._data = data;
        return this;
    }

    public hasBody (): any {
        return this._hasBody;
    }
    public setHasBody ( hasBody: boolean ): Response {
        this._hasBody = hasBody;
        return this;
    }

    public static SetOutgoingHeaders ( expressResponse: ExpressResponse, networkResponse: Response ): Observable<HybridResponse> {
    	return Observable.pairs( <IHeader>networkResponse.getHeaders() )
			.map( ( header: string[] ) => {
				return new Header( header[ 0 ], header[ 1 ] );
			})
			.map( ( header: Header ) => {
				expressResponse.setHeader( header.getName(), <string>header.getValue() );
				return header;
			})
			.reduce( ( acc: Header[], item: Header, index: number ) => {
				return acc.concat( item );
			}, [] )
			.map( ( headers: Header[] ) => {
				return <HybridResponse>{
					express: expressResponse,
					network: networkResponse
				};
			})
		;
	}
}