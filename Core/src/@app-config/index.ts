import { env } from "process";

export class Config {

	private static _Instance: Config;

	public isProduction: boolean;
	public appPort: number;
	public appHost: string;
	public appPrefix: string;

	public eventsServer: string;
	public proxyServer: string;


	private constructor () {

		this.isProduction = true || ( env.NODE_ENV && env.NODE_ENV === "production" ) || false;

		this.appPort = parseInt( env.PORT ) || 3010;
		this.appHost = env.HOST || "localhost";
		this.appPrefix = "/";

		this.eventsServer = this.isProduction ? "https://smart-home.cfapps.eu10.hana.ondemand.com" : "http://localhost:4010";
		this.proxyServer = "rk9401smarthome";
	}

	public static Instance (): Config {
		if ( ! Config._Instance ) {
			Config._Instance = new Config();
		}
		return Config._Instance;
	}
}