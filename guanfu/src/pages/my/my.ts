import { Component } from '@angular/core';
import { NavController ,NavParams } from 'ionic-angular';
import { LoginPage } from './login/login';
import { RegPage } from './reg/reg';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-contact',
  templateUrl: 'my.html'
})
export class MyPage {

  selectedItem: any;

  constructor( public storage:Storage,public navCtrl: NavController, public navParams: NavParams) {


    this.selectedItem = navParams.get('item');

    console.log(this.selectedItem);


    this.storage.get("storage_user_info").then((value) => {
      console.log(value);
    })


  }



  openRegPage() {

    this.navCtrl.push(RegPage,{
    });
  }

  openLoginPage() {

    this.navCtrl.push(LoginPage,{
    });
  }


  logout() {
    this.storage.remove("storage_user_info");
  }

}
