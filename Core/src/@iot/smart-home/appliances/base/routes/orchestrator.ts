import { RouterOptions } from "express";

import { RESTOrchestrator } from "@iot/common/networking/routes";

import { IAppliance } from "@iot/smart-home/appliances/base";

export abstract class ApplianceREST extends RESTOrchestrator {

	protected appliance: IAppliance;

	protected constructor ( options?: RouterOptions ) {
		super( options )
	}
}