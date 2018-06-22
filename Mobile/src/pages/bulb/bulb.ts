import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from "rxjs";

import { BulbService } from "./delegate";

@Component({
  selector: 'page-bulb',
  templateUrl: 'bulb.html'
})
export class BulbPage {

	private bulbState: boolean;
	private brightness: number;
	private autoBrightness: boolean;
	private currentColor: string;


	constructor( public navCtrl: NavController, private delegate: BulbService ) {
		this.bulbState = false;
		this.brightness = 100;
		this.currentColor = "#000000";
	}

	public toggleBulbState() {
		this.bulbState = ! ( this.bulbState );
		this.delegate.toggleBulbState( this.bulbState ).subscribe( () => {});
	}

	public brightnessValueChanged() {
		this.delegate.setBrightness( this.brightness ).subscribe( () => {});
	}
	public toggleAutoBrightnesState() {
		this.delegate.toggleAutoBrightness( this.autoBrightness ).subscribe( () => {});
	}

	public onColorChange() {
		Observable.of( this.currentColor )
			.debounceTime( 3000 )
			.flatMap( ( color: string ) => {
				return this.changeColor( color );
			})
			.subscribe( () => {})
		;
	}
  	private changeColor( color: string ) {
		return this.delegate.changeColor( color );
	}
}
