import { SmartHome } from "@iot/smart-home-voice/boot";

const APP_ID_BULB: string = "amzn1.ask.skill.59838f4c-56b1-425e-a940-4a53fc440319";

SmartHome.Boot({
	appIds: {
		Bulb: APP_ID_BULB
	}
})
	.then()
	.catch( console.error.bind( console ) )
;