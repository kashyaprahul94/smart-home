import { RouterOptions } from "express";

import { Orchestrator } from "@iot/common/networking/routes";

import { IAppliance } from "@iot/smart-home/appliances/base";

export abstract class ApplianceOrchestrator extends Orchestrator {

	protected appliance: IAppliance;

	public constructor ( options?: RouterOptions ) {
		super( options )
	}
}