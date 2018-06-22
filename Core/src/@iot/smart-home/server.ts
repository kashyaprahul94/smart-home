import * as _ from "lodash";
import * as Express from "express";
import * as Promise from "bluebird";
import * as BodyParser from "body-parser";
import * as ErrorHandler from "errorhandler";
import * as CORS from "cors";
import * as Helmet from "helmet";
import * as Compression from "compression";

const ProxyTunnel = require( "localtunnel" );

import { Route, Logger } from "@iot/common";

export type ServerIgnition = {
	port: number;
	host: string;
};

export class Server {

	private static DefaultPort: number = 3099;
	private static DefaultHost: string = "0.0.0.0";
	private static DefaultPrefix: string = "/";

    private readonly instance: Express.Application;
    private readonly router: Express.Router;

    private port: number;
	private hostname: string;
	private prefix: string;
	private proxyServer: string;

    private routes: Route[];


    public constructor ( { port, hostname, prefix }: { port?: number, hostname?: string, prefix?: string } ) {

        this.instance = Express();
        this.router = Express.Router();

        this.port = port || Server.DefaultPort;
		this.hostname = hostname || Server.DefaultHost;
		this.prefix = prefix || Server.DefaultPrefix;

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

    public prefixWith ( prefix: string ): Server {
        this.prefix = prefix;
        return this;
    }

	public exposeAt ( proxyServer: string ): Server {
		this.proxyServer = proxyServer;
		return this;
	}

    public getPort (): number {
    	return this.port;
	}
	public getHost (): string {
    	return this.hostname;
	}
	public getPrefix (): string {
    	return this.prefix;
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
			this.router.use( route.basePath, route.create() );
		});
		this.instance.use( ( this.prefix || Server.DefaultPrefix ), this.router );
		return Promise.resolve( this.instance );
	};

	private startProxyServer (): void {
		ProxyTunnel( this.port, {
			subdomain: this.proxyServer
		}, ( error: Error, tunnel: any ) => {
			if ( error ) {
				Logger.Error( error );
			} else {
				Logger.Info( "Tunnel is running @ %s", tunnel.url );
			}
		});
	}

	private igniteServer = (): Promise<ServerIgnition> => {
		return new Promise( ( resolve: ( result: ServerIgnition ) => void, reject: ( error: Error ) => void ) => {
			this.instance.listen( this.port, this.hostname, ( error: Error ) => {
				if ( error ) {
					reject( error );
				}
				this.startProxyServer();
				resolve( this.onServerStarted() );
			} );
		});
	};

    public boot (): Promise<ServerIgnition> {
        return this.initRoutes().then( this.igniteServer );
    }
}