import { Router, RouterOptions } from "express";

import { Route } from "./route";

export abstract class RESTOrchestrator {

	protected router: Router;

	protected constructor ( options?: RouterOptions ) {
		this.router = Router( options );
	}

	public abstract routes (): Route[];
}