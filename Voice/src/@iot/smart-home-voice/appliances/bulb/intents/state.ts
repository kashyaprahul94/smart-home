import * as Alexa from "alexa-app";

import { Intent } from "@iot/smart-home-voice/appliances/base/intents";

export const StateIntent = ( io: SocketIO.Server ) => {

	const EventName: string = "Equipment:Bulb:State";

	return new Intent( "state" )
		.setSchema({
			slots: {
				BULB_STATE: "BULB_STATE_TYPES"
			},
			utterances: [
				"studio to switch {BULB_STATE}",
				"studio to light {BULB_STATE}",
				"studio to power {BULB_STATE}",
				"studio to ignite {BULB_STATE}"
			]
		})
		.setHandler(
			( request: Alexa.request, response: Alexa.response ) => {
				const stateRequested = ( request.slot( "BULB_STATE", "off" ) ).toUpperCase().trim();
				if ( stateRequested === "ON" || stateRequested === "UP" ) {
					io.emit( EventName, {
						value: true
					});
					response.say( "Studio is switched ON" );
				} else {
					io.emit( EventName, {
						value: false
					});
					response.say( "Studio is switched OFF" );
				}
			}
		)
	;
};