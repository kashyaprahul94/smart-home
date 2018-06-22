import * as Promise from "bluebird";

import { App } from "@iot/smart-home-voice/app";
import { Server, ServerIgnition } from "./server";

import { SmartBulb } from "./appliances";

interface AppIds {
	Bulb: string;
}

export const SmartHome = {

	Boot: ( { port, host, appIds }: { port?: number, host?: string, appIds: AppIds } ): Promise<ServerIgnition> => {

		const appInstance: App.Type = App.Instance;
		let appServer: Server;

		try {
			return appInstance.init()
				.then( ( server: Server ) => {
					return appServer = server;
				})
				.then( ( appServer: Server ) => {
					return Promise.all( [
						Promise.resolve( appInstance.getEventsIO() ),
						Promise.resolve( appServer.getRouter() ),
					])
				})
				.spread( ( eventsIO: any, router: any ) => {
					new SmartBulb( eventsIO, router, appIds.Bulb );
				})
				.then( () => {
					return appInstance.start( port, host );
				})
			;
		} catch {
			return Promise.reject( "Error" );
		}
	}
};