import * as Express from "express";

import { BaseRoute } from "@iot/common/networking";

import { IAppliance } from "@iot/smart-home/appliances/base";

export abstract class ApplianceRoute extends BaseRoute {

	protected appliance: IAppliance;

	protected constructor ( router: Express.Router, appliance: IAppliance ) {

		super( router, [

		]);

		this.appliance = appliance;
	}
}