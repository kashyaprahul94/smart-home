import * as Express from "express";

import { BaseRoute } from "@iot/common/networking";

import { IAppliance } from "@iot/smart-home/appliances/base";

export class ApplianceRoute extends BaseRoute {

	protected appliance: IAppliance;

	public constructor ( router: Express.Router, appliance: IAppliance ) {

		super( router, [

		]);

		this.appliance = appliance;
	}
}