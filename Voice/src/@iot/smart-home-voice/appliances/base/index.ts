import * as Alexa from "alexa-app";
import * as Express from "express";
import * as SocketIO from "socket.io";

type AlexaAppType = Alexa.app & { id: string };

export abstract class AlexaApp {

	protected delegate: AlexaAppType;

	protected io: SocketIO.Server;
	protected router: Express.Router;

	protected constructor ( name: string, eventsDelegate: SocketIO.Server, routerInstance: Express.Router, appId: string ) {

		this.delegate = {
			...new Alexa.app( name ),
			id: appId
		};

		this.io = eventsDelegate;
		this.router = routerInstance;

		this.init();
		this.prepare();
	}

	public getDelegate(): Alexa.app {
		return this.delegate;
	}

	private init (): void {

		this.delegate.error = this.onAppError;
		this.delegate.launch( this.onAppLaunch );

		this.io.on( "connection", this.onSocketConnected.bind( this ) );

		this.delegate.express({
			expressApp: this.router,
			debug: true,
			checkCert: false,
		});
	}

	protected abstract onSocketConnected ( socket: SocketIO.Socket ): void;

	protected abstract prepare (): void;

	protected abstract onAppError ( exception: any, request: Alexa.request, response: Alexa.response ): void;
	protected abstract onAppLaunch ( request: Alexa.request, response: Alexa.response ): void;
}