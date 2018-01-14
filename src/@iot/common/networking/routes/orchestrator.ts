import { Router, RouterOptions } from "express";

import { Route } from "../routes";

export abstract class Orchestrator {

	protected router: Router;

	public constructor ( options?: RouterOptions ) {
		this.router = Router( options );
	}

	public abstract routes (): Route[];
}