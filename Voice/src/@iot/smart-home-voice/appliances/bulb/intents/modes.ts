import * as Alexa from "alexa-app";

import { Intent } from "@iot/smart-home-voice/appliances/base/intents";

export const ModesIntent = ( io: SocketIO.Server ) => {

	const EventName: string = "Equipment:Bulb:Mode";

	const ModesMap: any = {
		PARTY: "PARTY_MODE"
	};

	return new Intent( "mode" )
		.setSchema({
			slots: {
				BULB_MODE: "BULB_MODE_TYPES"
			},
			utterances: [
				"studio it is {BULB_MODE}",
				"studio it's {BULB_MODE}",
				"studio let the {BULB_MODE} begin",
				"studio let's the {BULB_MODE} begin",
			]
		})
		.setHandler(
			( request: Alexa.request, response: Alexa.response ) => {
				const modeRequested = ( request.slot( "BULB_STATE", "party" ) ).toUpperCase().trim();
				if ( modeRequested.indexOf( "PARTY" ) > -1 ) {
					io.emit( EventName, {
						mode: ModesMap[ modeRequested ]
					});
					response.say( "Let the party begin !" );
				} else {
					response.say( "Studio is switched OFF" );
				}
			}
		)
	;
};