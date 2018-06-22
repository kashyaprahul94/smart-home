import { HttpHeaders as Headers } from "@angular/common/http";

export class Response {

	private _ok: boolean;
	private _status: number;
	private _statusText: string;
	private _data: any;
	private _headers: Headers;

	constructor ( ok: boolean = false, status: number = -1, statusText: string = "", headers: Headers = null, data: any = null ) {
		this._ok = ok;
		this._status = status;
		this._statusText = statusText;
		this._headers = headers;
		this._data = data;
	}

	public isOkay (): boolean {
		return this._ok
	}
	public setOkay ( status: boolean ): Response {
		this._ok = status;
		return this;
	}

	public status (): number {
		return this._status
	}
	public setStatus ( status: number ): Response {
		this._status = status;
		return this;
	}

	public statusText (): string {
		return this._statusText
	}
	public setStatusText ( statusText: string ): Response {
		this._statusText = statusText;
		return this;
	}

	public headers (): Headers {
		return this._headers
	}
	public setHeaders ( headers: Headers ): Response {
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
}