import * as Promise from "bluebird";

import { Bulb } from "./components";

export class BulbModule {

	private static _instance: BulbModule = null;

	private readonly bulb: Bulb;

	private constructor ( pins?: number[] ) {
		this.bulb = new Bulb( pins );
	}


	public static Start = ( pins?: number[] ): Promise<BulbModule> => {

		if ( ! BulbModule._instance ) {
			BulbModule._instance = new BulbModule( pins );
		}

		return BulbModule._instance.bulb.init()
			.then( () => {
				return BulbModule._instance;
			})
		;
	};

	public getBulb (): Bulb {
		return this.bulb;
	}
}

export * from "./routes";