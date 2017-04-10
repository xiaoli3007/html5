import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController,NavParams,ActionSheetController} from 'ionic-angular';

@Component({
  selector: 'page-usercenter',
  templateUrl: 'usercenter.html'
})
export class UsercenterPage{

  user_info = {
    userid: 0,
    username: "游客",
    email: "",
    groupid: "",
    groupids: "",
    photo: "../../assets/images/graphic.png",
    truename: "游客"
  };

  constructor(public actionSheetCtrl: ActionSheetController,public storage:Storage,public navCtrl: NavController, public navParams: NavParams) {


    this.storage.get("storage_user_info").then((value) => {
      if(value){
        console.log(value);
        this.user_info = value;
      }
    });


  }

  openPhonephoto() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '选择图片',
      buttons: [
        {
          text: '相册',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
          }
        },
        {
          text: '照相机',
          handler: () => {
            console.log('Archive clicked');
          }
        },
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();
  }


}
