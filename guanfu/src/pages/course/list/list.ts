import { Component } from '@angular/core';

import { NavController,NavParams } from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  search_files: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {


    this.search_files = navParams.get('search_files');

    console.log(this.search_files);

  }

}
