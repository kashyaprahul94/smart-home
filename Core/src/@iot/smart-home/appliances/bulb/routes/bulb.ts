import * as Express from "express";

import { App } from "@iot/smart-home/app";

import { Route, RouteType, StatusCode } from "@iot/common/networking";

import { ApplianceRoute, IAppliance } from "@iot/smart-home/appliances/base";

import { Bulb } from "../components";
import { BulbService } from "../services";

export class BulbRoute extends ApplianceRoute implements Route {

	public basePath: RouteType;
	private delegate: BulbService;

	public constructor ( router: Express.Router, appliance: IAppliance ) {

		super( router, appliance );

		this.basePath = [ "/bulb", "v1" ].join( "/" );

		this.delegate = new BulbService( this.appliance as Bulb, App.Instance.getEventsIO() );
	}

	public create (): Express.Router {

		this.init();

		this.router.route( "/state" )
			.get( this.switchOn )
			.post( this.switchOn )
			.put( this.switchOn )
			.delete( this.switchOff )
		;

		this.router.route( "/on" )
			.get( this.switchOn )
		;
		this.router.route( "/off" )
			.get( this.switchOff )
		;

		this.router.route( "/brightness/:intensity" )
			.put( this.intensity )
		;
		this.router.route( "/brightness/auto/:isAuto" )
			.put( this.autoBrighntess )
		;

		this.router.route( "/color/:hex" )
			.put( this.color )
		;

		this.router.route( "/disco" )
			.put( this.discoMode )
		;

		return this.router;
	}


	private switchOn = ( req: Express.Request, res: Express.Response ): void => {
		this.delegate.switchOn();
		res.status( StatusCode.Okay ).end();
	};
	private switchOff = ( req: Express.Request, res: Express.Response ): void => {
		this.delegate.switchOff();
		res.status( StatusCode.Okay ).end();
	};

	private intensity = ( req: Express.Request, res: Express.Response ): void => {
		const intensity: number = parseInt( req.params.intensity );
		this.delegate.setIntensity( intensity );
		res.status( StatusCode.Okay ).end();
	};
	private autoBrighntess = ( req: Express.Request, res: Express.Response ): void => {
		const autoBrighntess: boolean = !! ( req.params.isAuto );
		this.delegate.setAutoBrightness( autoBrighntess );
		res.status( StatusCode.Okay ).end();
	};

	private color = ( req: Express.Request, res: Express.Response ): void => {
		const color: string = req.params.hex;
		this.delegate.setColor( color );
		res.status( StatusCode.Okay ).end();
	};

	private discoMode = ( req: Express.Request, res: Express.Response ): void => {
		this.delegate.discoMode();
		res.status( StatusCode.Okay ).end();
	};
}