import { env } from "process";

export class Config {

	private static _Instance: Config;

	public isProduction: boolean;
	public appPort: number;
	public appHost: string;


	private constructor () {

		this.isProduction = ( env.NODE_ENV && env.NODE_ENV === "production" ) || false;

		this.appPort = parseInt( env.PORT ) || 4010;
		this.appHost = env.HOST || "localhost";
	}

	public static Instance (): Config {
		if ( ! Config._Instance ) {
			Config._Instance = new Config();
		}
		return Config._Instance;
	}
}