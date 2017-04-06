import { Component , Inject} from '@angular/core';

import { NavController,NavParams , LoadingController,AlertController} from 'ionic-angular';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { emailValidator, nicknameValidator } from '../../../providers/validator';
import { IonicService } from '../../../services/IonicService';
import {ConfigService} from "../../../services/ConfigService";
import {Common} from "../../../utils/common";

import {MyPage} from "../my";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [IonicService, ConfigService,Common],
})

export class LoginPage {

  form: FormGroup;
  submitted = false;
  user_info =[];
  private params = {
    user: '',
    pwd: '',
    act: 'userverify',
  };

  constructor(private alertCtrl: AlertController,private loadingCtrl: LoadingController, private ionicService:IonicService,public navCtrl: NavController, public navParams: NavParams,@Inject(FormBuilder) fb: FormBuilder, public common: Common) {

    this.form = fb.group({
      username: ['',[Validators.required, Validators.minLength(4)]],
      password: ['',[Validators.required, Validators.minLength(6)]],
    });

  }

  onSubmit(){

    let loading = this.loadingCtrl.create(this.common.getSpinnerConfig());
    loading.present();
      this.params.user = this.form.value.username
      this.params.pwd = this.form.value.password
    console.log(this.params);

    this.ionicService.user_login(this.params).subscribe(
        data => {
          this.user_info = data['userinfo'];
          var result = data['result'];
          console.log(this.user_info);
          loading.dismiss();

          if(result=='success'){

            let alert = this.alertCtrl.create({
              title: '登录成功',
              subTitle: '',
              buttons: [

                {
                  text: 'OK',
                  handler: () => {
                    this.navCtrl.push(MyPage,{});
                  }
                }
              ]
            });
            alert.present();



          }else{

            let alert = this.alertCtrl.create({
              title: '登录失败',
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

    this.submitted = true;
  }


}
