import * as HTTP from "http";
import * as Path from "path";
import * as Process from "process";
import * as Express from "express";
import * as Promise from "bluebird";
import * as BodyParser from "body-parser";
import * as ErrorHandler from "errorhandler";
import * as CORS from "cors";
import * as Helmet from "helmet";
import * as Compression from "compression";

import { Logger } from "@iot/common";

export type ServerIgnition = {
	port: number;
	host: string;
};

export class Server {

	private static DefaultPort: number = 3099;
	private static DefaultHost: string = "0.0.0.0";

	private server: HTTP.Server;
    private instance: Express.Application;
    private router: Express.Router;
    private routePrefix: string;
    private port: number;
    private hostname: string;

    constructor ( routePrefix?: string, port?: number, hostname?: string ) {

        this.instance = Express();
        this.router = Express.Router();

		this.server = HTTP.createServer( this.instance );

        this.routePrefix = routePrefix || "";
        this.port = port || Server.DefaultPort;
        this.hostname = hostname || Server.DefaultHost;

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

    public getInstance (): HTTP.Server {
    	return this.server;
	}
    public getRouter (): Express.Router {
    	return this.router;
	}

    public getPort (): number {
    	return this.port;
	}
	public getHost (): string {
    	return this.hostname;
	}



	private initConfig (): void {

    	this.instance.use( this.routePrefix, this.router );

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

		this.instance.set( "view engine", "ejs" );
		this.instance.set( "views", Path.join( Process.cwd(), "public" ) );
		this.instance.use( Express.static( Path.join( Process.cwd(), "public" ) ) );
	}




	private onServerStarted = (): ServerIgnition => {
		Logger.Info( "Server is listening @ http://%s:%d", this.hostname, this.port );
		return { port: this.port, host: this.hostname };
	};

	private initRoutes = (): Promise<Express.Application> => {
		return Promise.resolve( this.instance );
	};

	private igniteServer = (): Promise<ServerIgnition> => {
		return new Promise( ( resolve: ( result: ServerIgnition ) => void, reject: ( error: Error ) => void ) => {
			this.server.listen( this.port, "", ( error: Error ) => {
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