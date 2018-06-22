import { Route } from "@iot/common/networking/routes";
import { ApplianceREST, IAppliance } from "@iot/smart-home/appliances/base";

import { Bulb } from "../components";
import { BulbRoute } from "./bulb";

export class BulbREST extends ApplianceREST {

	public constructor ( appliance: Bulb ) {
		super();
		this.appliance = appliance;
	}

	public routes (): Route[] {
		const bulb: BulbRoute = new BulbRoute( this.router, this.appliance );
		return [ bulb ];
	}
}