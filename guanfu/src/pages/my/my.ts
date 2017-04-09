import { Component } from '@angular/core';
import { NavController ,NavParams ,AlertController} from 'ionic-angular';
import { LoginPage } from './login/login';
import { RegPage } from './reg/reg';
import { Storage } from '@ionic/storage';
import { UsercenterPage } from './usercenter/usercenter';
import { AboutUsPage } from './aboutus/about-us';
import {AppRate, SocialSharing} from "ionic-native";
import { FavoritePage } from './favorite/favorite';
import { FeedbackPage} from './feedback/feedback';
import { FrequencyPage } from './frequency/frequency';

@Component({
  selector: 'page-contact',
  templateUrl: 'my.html'
})
export class MyPage {

  user_info = {
    userid: 0,
    username: "游客",
    email: "",
    groupid: "",
    groupids: "",
    photo: "../../assets/images/graphic.png",
    truename: "游客"
  };

  constructor( private alertCtrl: AlertController, public storage:Storage,public navCtrl: NavController, public navParams: NavParams) {

    this.storage.get("storage_user_info").then((value) => {
      if(value){
        //console.log(value);
        this.user_info = value;
      }
    });

    if(navParams.get('item') != null){
      this.user_info = navParams.get('item');
      console.log(this.user_info);
    }

  }
//注册
  openRegPage() {

    this.navCtrl.push(RegPage,{
    });
  }
  //登录
  openLoginPage() {

    this.navCtrl.push(LoginPage,{
    });
  }
//关于我们
  openAboutUsPage() {

    this.navCtrl.push(AboutUsPage,{
    });
  }
  //收藏列表
  openFavoritePage() {

    this.navCtrl.push(FavoritePage,{
    });
  }
  //点播列表
  openFrequencyPage() {

    this.navCtrl.push(FrequencyPage,{
    });
  }
  //反馈留言
  openFeedbackPage() {

    this.navCtrl.push(FeedbackPage,{
    });
  }

  shareIt() {
    SocialSharing.share("我现在使用观复软件，这是一款专注于Web资源整合的应用。快来下载吧!", "", "", "http://demo.rms.gfusoft.com/");
  }

  openUsercenterPage() {

    if(this.user_info.userid==0){

      this.navCtrl.push(LoginPage,{
      });

    }else {

      this.navCtrl.push(UsercenterPage,{
      });

    }
  }


  logout() {
    this.storage.remove("storage_user_info");

    let alert = this.alertCtrl.create({
      title: '退出成功！',
      subTitle: '',
      buttons: ['OK']
    });
    alert.present();
    this.user_info = {
      userid: 0,
      username: "游客",
      email: "",
      groupid: "",
      groupids: "",
      photo: "../../assets/images/graphic.png",
      truename: "游客"
    };
  }

}
