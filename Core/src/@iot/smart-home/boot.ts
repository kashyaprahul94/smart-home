import * as Promise from "bluebird";

import { App } from "@iot/smart-home/app";
import { Server, ServerIgnition } from "./server";

import { BulbModule, BulbREST } from "./appliances";

export const SmartHome = {

	Boot: ( { port, host, serverPrefix, proxyServer }: { port?: number, host?: string, serverPrefix?: string, proxyServer?: string } ): Promise<ServerIgnition> => {

		const appInstance: App.Type = App.Instance;
		let appServer: Server;

		try {
			return appInstance.init()
				.then( ( server: Server ) => {
					return appServer = server;
				})
				.then( () => {
					return Promise.all( [
						//Promise.resolve( true )
						BulbModule.Start()
					]);
				})
				.spread( ( bulbModule: BulbModule ) => {

					//appServer.addRoute( ...new BulbREST( null ).routes() );
					appServer.addRoute( ...new BulbREST( bulbModule.getBulb() ).routes() );

					return Promise.resolve( appServer );
				})
				.then( () => {
					return appInstance.start( port, host, serverPrefix, proxyServer );
				})
			;
		} catch {
			return Promise.reject( "Error" );
		}
	}
};