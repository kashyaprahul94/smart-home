import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { BulbPage } from "../bulb/bulb";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor( public navCtrl: NavController ) {

  }


  public gotoBulb () {
	  this.navCtrl.push( BulbPage );
  }
}
