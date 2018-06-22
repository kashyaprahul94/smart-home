import { LogLevel } from "../enums/log-levels";

export class Logger {

	private static DefualtLogLevel: LogLevel = LogLevel.Defualt;

	private constructor () {

	}

	public static Info = ( ...args: any[] ): void => {
		console.info.apply( console, args );
	};

	public static Warn = ( ...args: any[] ): void => {
		console.warn.apply( args );
	};

	public static Error = ( ...args: any[] ): void => {
		console.error.apply( args );
	};
}