import { Router } from "express";

import { ITrait } from "../traits";

export class BaseRoute {

	protected router: Router;
	protected middlewares: ITrait[];

	public constructor ( router: Router, middlewares: ITrait[] = [] ) {
		this.router = router;
		this.middlewares = middlewares;
	}

	public init (): void {
		if ( this.middlewares.length ) {
			this.router.use( this.middlewares.map( middleware => middleware.middleware ) );
		}
	}
}