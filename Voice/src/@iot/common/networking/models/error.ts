import { StatusCode } from "../enums/http";

export class HTTPError implements Error {

	private statusCode: StatusCode;
	private code?: string;
	public name: string;
	public message: string;

	constructor ( statusCode: StatusCode = StatusCode.Okay, code: string = "", name: string = "", description: string = "" ) {
		this.statusCode = statusCode;
		this.code = code;
		this.name = name;
		this.message = description;
	}

	public static FromError ( error: Error ) {
		return new HTTPError()
			.setStatusCode( StatusCode.ServerError )
			.setCode( error.name )
			.setName( error.message )
			.setDescription( error.stack )
		;
	}


	public getStatusCode (): StatusCode {
		return this.statusCode;
	}
	public setStatusCode ( statusCode: StatusCode ): HTTPError {
		this.statusCode = statusCode;
		return this;
	}


	public getCode (): string {
		return this.code;
	}
	public setCode ( code: string ): HTTPError {
		this.code = code;
		return this;
	}

	public getName (): string {
		return this.name;
	}
	public setName ( name: string ): HTTPError {
		this.name = name;
		return this;
	}

	public getDescription (): string {
		return this.message;
	}
	public setDescription ( description: string ): HTTPError {
		this.message = description;
		return this;
	}

	public serialize (): any {
		try {
			return JSON.parse( this.getDescription() );
		} catch {
			return {
				code: this.getCode(),
				name: this.getName(),
				description: this.getDescription()
			};
		}
	}

	public stringify (): string {
		return JSON.stringify( this.serialize() );
	}
}