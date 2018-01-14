import { env } from "process";

const Landscape = env.APP_LANDSCAPE || "dev";

export class Config {

	public env: any;

	public isProduction: boolean;
	public appPort: number;
	public appHost: string;

	constructor () {

		this.isProduction = ( env.NODE_ENV && env.NODE_ENV === "production" ) || false;

		this.appPort = parseInt( env.PORT ) || 3010;
		this.appHost = env.HOST || "localhost";
	}
}