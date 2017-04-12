import { Component } from '@angular/core';
import {  NavController,NavParams , LoadingController,AlertController} from 'ionic-angular';
import { IonicService } from '../../../services/IonicService';
import {ConfigService} from "../../../services/ConfigService";
import {Common} from "../../../utils/common";
import { Storage } from '@ionic/storage';
import {MyPage} from "../my";

@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
  providers: [IonicService, ConfigService,Common],
})
export class FeedbackPage {

  submitted = false;
  jianyi = '';
  private params = {
    userid: 0,
    suggesn: '',
    act: 'feedback',
  };
  constructor( public storage:Storage, private alertCtrl: AlertController,private loadingCtrl: LoadingController, private ionicService:IonicService,public navCtrl: NavController, public navParams: NavParams, public common: Common) {


  }

  onSubmit(){

    let loading = this.loadingCtrl.create(this.common.getSpinnerConfig());
    loading.present();

    this.params.suggesn = this.jianyi;

    setTimeout(() => {
          this.ionicService.postServerData(this.params).subscribe(
              data => {
                var result = data['result'];
                var msg = data['msg'];
                //console.log(this.user_info);
                loading.dismiss();
                if(result=='success'){
                    let alert = this.alertCtrl.create({
                      title: '提交成功，感谢您的反馈！',
                      subTitle: '',
                      buttons: [

                        {
                          text: 'OK',
                          handler: () => {
                          this.navCtrl.setRoot(MyPage);
                          }

                        }
                      ]
                    });
                    alert.present();
                    //this.navCtrl.present(alert);
                }else{

                    let alert = this.alertCtrl.create({
                      title: msg,
                      subTitle: '',
                      buttons: ['OK']
                    });
                    alert.present();
                }
              },
              err => {
                loading.dismiss();
              }
          );

    }, 500);// 延迟

    this.submitted = true;
  }

  ngOnInit() {

    this.storage.get("storage_user_info").then((value) => {
      if (value) {
        this.params.userid = value['userid'];
        console.log(this.params);
      }
    });

  }




}
