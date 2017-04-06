import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';


import { LoginPage } from './login/login';
import { RegPage } from './reg/reg';


@Component({
  selector: 'page-contact',
  templateUrl: 'my.html'
})
export class MyPage {

  constructor(public navCtrl: NavController) {

  }



  openRegPage() {

    this.navCtrl.push(RegPage,{
    });
  }

  openLoginPage() {

    this.navCtrl.push(LoginPage,{
    });
  }


}
