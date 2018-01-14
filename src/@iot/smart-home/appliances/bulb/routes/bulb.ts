import * as Express from "express";

import { App } from "@iot/smart-home/app";
import { Logger } from "@iot/common/logger";
import { Route, RouteType, StatusCode, HTTPError } from "@iot/common/networking";

import { ApplianceRoute, IAppliance } from "@iot/smart-home/appliances/base";
import { Bulb } from "../components";

export class BulbRoute extends ApplianceRoute implements Route {

	public basePath: RouteType;

	public constructor ( router: Express.Router, appliance: IAppliance ) {

		super( router, appliance );

		this.basePath = [ "/bulb", "v1" ].join( "/" );
	}

	public create (): Express.Router {

		this.init();

		this.router.route( "/on" )
			.get( this.switchOn )
		;

		this.router.route( "/off" )
			.get( this.switchOff )
		;

		return this.router;
	}

	private getBulb (): Bulb {
		return this.appliance as Bulb;
	}


	private switchOn = ( req: Express.Request, res: Express.Response ): void => {
		this.getBulb().on();
		res.status( StatusCode.Okay ).end();
	};

	private switchOff = ( req: Express.Request, res: Express.Response ): void => {
		this.getBulb().off();
		res.status( StatusCode.Okay ).end();
	};
}