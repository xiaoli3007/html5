import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
  selectedItem: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    //当页面进入初始化的时候
    //let elements = document.querySelectorAll(".tabbar");
    //if (elements != null) {
    //  Object.keys(elements).map((key) => {
    //    elements[key].style.display = 'none';
    //  });
    //}

  }


//当退出页面的时候
//ionViewWillLeave(){
//  let elements = document.querySelectorAll(".tabbar");
//  if (elements != null) {
//    Object.keys(elements).map((key) => {
//      elements[key].style.display = 'flex';
//    });
//  }
//
//
//}


}
