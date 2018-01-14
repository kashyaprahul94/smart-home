import * as Process from "process";
import * as Promise from "bluebird";

import { Logger } from "@iot/common/logger";

import { Config } from "@app-config";
import { Server, ServerIgnition } from "@iot/smart-home/server";


export class App {

	private static _Instance: App = null;

	private config: Config;
	private appServer: Server;

	private constructor () {

		this.config = new Config();
		this.appServer = new Server();
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