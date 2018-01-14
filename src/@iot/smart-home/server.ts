import * as _ from "lodash";
import * as Express from "express";
import * as Promise from "bluebird";
import * as BodyParser from "body-parser";
import * as ErrorHandler from "errorhandler";
import * as CORS from "cors";
import * as Helmet from "helmet";
import * as Compression from "compression";

import { Route, Logger } from "@iot/common";

export type ServerIgnition = {
	port: number;
	host: string;
};

export class Server {

	private static DefaultPort: number = 3099;
	private static DefaultHost: string = "0.0.0.0";

    private instance: Express.Application;
    private routePrefix: string;
    private port: number;
    private hostname: string;

    private routes: Route[];

    constructor ( routePrefix?: string, port?: number, hostname?: string ) {

        this.instance = Express();
        this.routePrefix = routePrefix || "";
        this.port = port || Server.DefaultPort;
        this.hostname = hostname || Server.DefaultHost;

        this.routes = [];

        this.initConfig();
    }

    public withPort ( port: number ): Server {
        this.port = port;
        return this;
    }

    public asHostname ( hostname: string ): Server {
        this.hostname = hostname;
        return this;
    }

    public getPort (): number {
    	return this.port;
	}
	public getHost (): string {
    	return this.hostname;
	}



	private initConfig (): void {

		this.instance.use( BodyParser.json() );

		this.instance.use( BodyParser.urlencoded({
			extended: true
		}));

		this.instance.use( ErrorHandler({
			log: false
		}));

		this.instance.use( CORS() );

		this.instance.use( Helmet() );

		this.instance.use( Compression() );
	}




	public addRoute ( ...routes: Route[] ): Server {
		this.routes = this.routes.concat( routes );
		return this;
	}


	private onServerStarted = (): ServerIgnition => {
		Logger.Info( "Server is listening @ http://%s:%d", this.hostname, this.port );
		return { port: this.port, host: this.hostname };
	};

	private initRoutes = (): Promise<Express.Application> => {
		_.forEach( this.routes,( route: Route ) => {
			this.instance.use( ( this.routePrefix + route.basePath ), route.create() );
		});
		this.instance.all('/*', ( req: Express.Request, res: Express.Response ) => {
			res.status( 405 ).json({
				code: "METHOD_NOT_IMPLEMENTED",
				message: `${ req.method } => ${ req.path } not implemented`
			});
		});
		return Promise.resolve( this.instance );
	};

	private igniteServer = (): Promise<ServerIgnition> => {
		return new Promise( ( resolve: ( result: ServerIgnition ) => void, reject: ( error: Error ) => void ) => {
			this.instance.listen( this.port, this.hostname, ( error: Error ) => {
				if ( error ) {
					reject( error );
				}
				resolve( this.onServerStarted() );
			} );
		});
	};

    public boot (): Promise<ServerIgnition> {
        return this.initRoutes().then( this.igniteServer );
    }
}