import * as Alexa from "alexa-app";
import * as Express from "express";
import * as SocketIO from "socket.io";

import { Logger } from "@iot/common";
import { AlexaApp } from "@iot/smart-home-voice/appliances/base";

import {
	StateIntent,
	ColorIntent,
	ModesIntent,
} from "./intents";

export class SmartBulb extends AlexaApp {

	public static Name: string = "bulb";

	public constructor ( eventsDelegate: SocketIO.Server, routerInstance: Express.Router, appId: string = "" ) {
		super( SmartBulb.Name, eventsDelegate, routerInstance, appId );
	}

	protected prepare (): void {

		const stateIntent = StateIntent( this.io );
		this.delegate.intent( stateIntent.getName(), stateIntent.getSchema(), stateIntent.getHandler() );

		const colorIntent = ColorIntent( this.io );
		this.delegate.intent( colorIntent.getName(), colorIntent.getSchema(), colorIntent.getHandler() );

		const modesIntent = ModesIntent( this.io );
		this.delegate.intent( modesIntent.getName(), modesIntent.getSchema(), modesIntent.getHandler() );

	}

	protected onSocketConnected ( socket: SocketIO.Socket ): void {
		Logger.Info( "Socket is connected to Smart Bulb" );
	};

	protected onAppError ( exception: any, request: Alexa.request, response: Alexa.response ): void {
		response.say( "Sorry an error occured" );
	};

	protected onAppLaunch ( request: Alexa.request, response: Alexa.response ): void {
		response.say( "Welcome to Smart-Bulb" );
	};
}