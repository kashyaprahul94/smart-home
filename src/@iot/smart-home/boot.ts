import * as Promise from "bluebird";

import { App } from "@iot/smart-home/app";
import { Server, ServerIgnition } from "./server";

import { Bulb, BulbOrchestrator } from "./appliances";

export const SmartHome = {

	Boot: ( port?: number, host?: string ): Promise<ServerIgnition> => {

		const appInstance: App.Type = App.Instance;
		let appServer: Server;

		return appInstance.init()
			.then( ( server: Server ) => {
				appServer = server;
				return appServer;
			})
			.then( () => {
				return Promise.all( [
					new Bulb().init()
				]);
			})
			.spread( ( bulb: Bulb ) => {
				appServer.addRoute( ...new BulbOrchestrator( bulb ).routes() );
				return Promise.resolve( appServer );
			})
			.then( () => {
				return appInstance.start( port, host );
			})
		;
	}
};