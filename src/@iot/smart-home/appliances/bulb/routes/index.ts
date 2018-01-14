import { Route } from "@iot/common/networking/routes";
import { ApplianceOrchestrator, IAppliance } from "@iot/smart-home/appliances/base";

import { BulbRoute } from "./bulb";

export class BulbOrchestrator extends ApplianceOrchestrator {

	public constructor ( appliance: IAppliance ) {
		super();
		this.appliance = appliance;
	}

	public routes (): Route[] {
		const bulb: BulbRoute = new BulbRoute( this.router, this.appliance );
		return [ bulb ];
	}
}