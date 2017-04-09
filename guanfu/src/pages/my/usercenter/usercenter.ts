import { Component } from '@angular/core';

import { NavController,NavParams } from 'ionic-angular';

@Component({
  selector: 'page-usercenter',
  templateUrl: 'usercenter.html'
})
export class UsercenterPage{

  search_files: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {


  }

}
