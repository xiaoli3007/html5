import { Component } from '@angular/core';

import { NavController, IonicPage } from 'ionic-angular';


@IonicPage({
  name: 'Contact-page',
  segment: 'Contact-path'
})

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  images= [];
  constructor(public navCtrl: NavController) {

    //var thumbs = {'big':'http://192.168.1.100:8001/media/photo/lisi/770/1703fdc2224a8594b5d4992d52984850.jpg'};
    for (var i = 1; i < 3; i++) {
      //this.images.push('../../assets/'+i+i+'.jpg');

      var thumbs = {'big':'assets/'+i+i+'.jpg'};
      this.images.push(thumbs);
    }


  }

}
