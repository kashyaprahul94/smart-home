import { RequestMethod } from "@angular/http";
import {   HttpHeaders as Headers, HttpParams as Params } from "@angular/common/http";

type ParamValueType = string | number | boolean | null;
type HeaderValueType = string | number | boolean | null;
type DataValueType = any | any[] | null;

export class Request {

	private method: RequestMethod;
	private url: string;
	private params?: Params;
	private headers?: Headers;
	private data?: DataValueType;

	constructor (
		method: RequestMethod = RequestMethod.Options,
		url: string = "",
		data: any | any[] = null
	) {
		this.method = method;
		this.url = url;
		this.params = new Params();
		this.headers = new Headers();
		this.data = data;
	}

	public getMethod (): RequestMethod {
		return this.method
	}
	public setMethod ( method: RequestMethod ): Request {
		this.method = method;
		return this;
	}

	public getURL (): string {
		return this.url
	}
	public setURL ( url: string ): Request {
		this.url = url;
		return this;
	}

	public getParams (): Params {
		return this.params
	}
	public setParams ( params: Params ): Request {
		this.params = params;
		return this;
	}
	public getParam ( name: string ): ParamValueType {
		return this.params.get( name );
	}
	public setParam ( key: string, value: string ): Request {
		this.params.set( key, value );
		return this;
	}

	public getHeaders (): Headers {
		return this.headers
	}
	public setHeaders ( headers: Headers ): Request {
		this.headers = headers;
		return this;
	}
	public header ( name: string ): HeaderValueType {
		return this.headers.get( name );
	}
	public setHeader ( key: string, value: string ): Request {
		this.headers.set( key, value );
		return this;
	}

	public getData (): DataValueType {
		return this.data
	}
	public setData ( data: DataValueType ): Request {
		this.data = data;
		return this;
	}


	public build (): any {
		return {
			observe: "response",
			params: this.getParams(),
			headers: this.getHeaders()
		}
	}
}