import * as Process from "process";
import * as Promise from "bluebird";
import * as EventsIO from "socket.io-client";

import { Logger } from "@iot/common/logger";

import { Config } from "@app-config";
import { Server, ServerIgnition } from "@iot/smart-home/server";


export class App {

	private static _Instance: App = null;

	private readonly config: Config;
	private readonly appServer: Server;

	private readonly eventsIO: SocketIOClient.Socket;

	private constructor () {

		this.config = Config.Instance();
		this.appServer = new Server({

		});

		this.eventsIO = EventsIO.connect( this.config.eventsServer );
		this.eventsIO.on( "connect", this.onEventsConnect );
		this.eventsIO.on( "disconnect", this.onEventsDisconnect );
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

	public getEventsIO (): SocketIOClient.Socket {
		return this.eventsIO;
	}


	private onEventsConnect = (): void => {
		Logger.Info( "Connection to Event Server is Established !" );
	};
	private onEventsDisconnect = (): void => {
		Logger.Info( "Connection to Event Server is De-Established !" );
	};


	private startServer ( port?: number, hostname?: string, prefix?: string, proxyServer?: string ): Promise<ServerIgnition> {
		return this.appServer
			.withPort( port || this.config.appPort )
			.asHostname( hostname || this.config.appHost )
			.prefixWith( prefix || this.config.appPrefix )
			.exposeAt( proxyServer || this.config.proxyServer )
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

	public start = ( port?: number, hostname?: string, prefix?: string, proxyServer?: string ): Promise<ServerIgnition> => {
		return this.startServer( port, hostname, prefix, proxyServer );
	};


	private onUncaughtError = ( error: Error ): void => {
		Logger.Error( "Uncaught Error : ", error );
	};
}