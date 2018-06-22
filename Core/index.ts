import { SmartHome } from "@iot/smart-home/boot";

SmartHome.Boot({

})
	.then( () => {}, console.info.bind( console ) )
;