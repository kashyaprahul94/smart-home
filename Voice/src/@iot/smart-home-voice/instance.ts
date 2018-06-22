import * as Process from "process";
import * as Promise from "bluebird";
import * as SocketIO from "socket.io";

import { Logger } from "@iot/common/logger";

import { Config } from "@app-config";
import { Server, ServerIgnition } from "@iot/smart-home-voice/server";


export class App {

	private static _Instance: App = null;

	private readonly config: Config;
	private readonly appServer: Server;

	private readonly eventsIO: SocketIO.Server;

	private constructor () {

		this.config = Config.Instance();
		this.appServer = new Server( "/alexa" );
		this.eventsIO = SocketIO( this.appServer.getInstance() );
	}

	public static Instance (): App {
		if ( ! App._Instance ) {
			App._Instance = new App();
		}
		return App._Instance;
	}

	public getConfig (): Config {
		return this.config;
	}

	private getServer (): Server {
		return this.appServer;
	}

	public getEventsIO (): SocketIO.Server {
		return this.eventsIO;
	}


	private startServer ( port?: number, hostname?: string ): Promise<ServerIgnition> {
		return this.appServer
			.withPort( port || this.config.appPort )
			.asHostname( hostname || this.config.appHost )
			.boot()
		;
	}

	public init (): Promise<Server> {
		return Promise.all( [
			true
		])
			.spread( (  ) => {
				Process.on( "uncaughtException", this.onUncaughtError );
			})
			.then( () => {
				return this.getServer();
			})
		;
	}

	public start = ( port?: number, hostname?: string ): Promise<ServerIgnition> => {
		return this.startServer( port, hostname );
	};


	private onUncaughtError = ( error: Error ): void => {
		Logger.Error( "Uncaught Error : ", error );
	};
}