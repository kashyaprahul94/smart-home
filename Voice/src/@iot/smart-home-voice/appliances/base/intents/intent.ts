import * as Alexa from "alexa-app";

export class Intent {

	private name: string;
	private schema: Alexa.IntentSchema | null;
	private handler: Alexa.RequestHandler | null;

	public constructor ( name: string, schema?: Alexa.IntentSchema, handler?: Alexa.RequestHandler ) {
		this.name = name;
		this.schema = schema;
		this.handler = handler;
	}

	public getName (): string {
		return this.name;
	}
	public setName ( name: string ): Intent {
		this.name = name;
		return this;
	}

	public getSchema (): Alexa.IntentSchema {
		return this.schema;
	}
	public setSchema ( schema: Alexa.IntentSchema ): Intent {
		this.schema = schema;
		return this;
	}

	public getHandler (): Alexa.RequestHandler {
		return this.handler;
	}
	public setHandler ( handler: Alexa.RequestHandler ): Intent {
		this.handler = handler;
		return this;
	}
}