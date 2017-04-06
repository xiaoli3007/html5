import { Component } from '@angular/core';

import { NavController,NavParams } from 'ionic-angular';

@Component({
  selector: 'page-reg',
  templateUrl: 'reg.html'
})
export class RegPage {

  search_files: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {


  }

}
