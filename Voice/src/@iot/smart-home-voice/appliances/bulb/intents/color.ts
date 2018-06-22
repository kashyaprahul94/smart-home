import * as Alexa from "alexa-app";

import { Intent } from "@iot/smart-home-voice/appliances/base/intents";

export const ColorIntent = ( io: SocketIO.Server ) => {

	const EventName: string = "Equipment:Bulb:Color";
	const ColorMap: any = {
		BLACK: "000000",
		WHITE: "FFFFFF",
		RED: "FF0000",
		GREEN: "00FF00",
		BLUE: "0000FF",
		INDIGO: "3F51B5",
		TEAL: "009688",
		AMBER: "FFC107",
	};

	const FallbackColorName: string = "WHITE";
	const FallbackColorHex: string = ColorMap[ FallbackColorName ];

	return new Intent( "color" )
		.setSchema({
			slots: {
				BULB_COLOR: "BULB_COLORS"
			},
			utterances: [
				"studio to turn to {BULB_COLOR}",
				"studio to turn color to {BULB_COLOR}",
				"studio to change to {BULB_COLOR}",
				"studio to change color {BULB_COLOR}",
				"studio to become {BULB_COLOR}",
				"studio to become of {BULB_COLOR} color",
				"studio to become {BULB_COLOR} in color"
			]
		})
		.setHandler(
			( request: Alexa.request, response: Alexa.response ) => {
				const colorRequested = ( request.slot( "BULB_COLOR", FallbackColorName ) ).toUpperCase().trim();
				io.emit( EventName, {
					value: ColorMap[ colorRequested ] || FallbackColorHex
				});
				response.say( `Studio is now of ${ colorRequested } color` );
			}
		)
	;
};