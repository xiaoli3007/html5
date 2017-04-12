import { Component } from '@angular/core';
import { App, NavController,NavParams , LoadingController,AlertController, ViewController,Events} from 'ionic-angular';

import { IonicService } from '../../../services/IonicService';
import {ConfigService} from "../../../services/ConfigService";
import {Common} from "../../../utils/common";
import {ShowPage} from "../../course/show/show";
import { Storage } from '@ionic/storage';
@Component({
  selector: 'page-favorite',
  templateUrl: 'favorite.html',
  providers: [IonicService,Common,ConfigService],
})
export class FavoritePage {

  private params = {
    act: 'favorite_list',
    page: 1,
    max: 15,
    userid: 0,
  };

  private listinfos = [];
  hasnomany = false;

  constructor(public storage:Storage, public navCtrl: NavController,  private alertCtrl: AlertController,private loadingCtrl: LoadingController, private ionicService:IonicService, public navParams: NavParams, public common: Common, private events:Events) {

  }


  openShow(catid, id) {

    var params = {
      id: id,
      catid: catid,
    };
    this.navCtrl.push(ShowPage, {
      item: params
    });
  }


  doInfinite(infiniteScroll) {
    console.log('加载数据');
    setTimeout(() => {

      if(!this.hasnomany){

        this.ionicService.getServerData(this.params)
            .subscribe(
                data => {
                  if( data!=null) {
                    console.log('返回数据');
                    this.listinfos = this.listinfos.concat(data);
                    this.params.page++;
                  }else{

                    console.log('返回错误数据');
                    this.hasnomany = true;

                  }
                }
            );
        console.log('加载完毕准备更新');
        infiniteScroll.complete();
      }else{
        console.log('没有数据！');
        let alert = this.alertCtrl.create({
          title: '没有数据了',
          subTitle: '',
          buttons: ['OK']
        });
        alert.present();
        infiniteScroll.enable(0);
      }



    }, 500); // 延迟500ms
  }

  ngOnInit() {

    let loading = this.loadingCtrl.create(this.common.getSpinnerConfig());
    loading.present();

    this.storage.get("storage_user_info").then((value) => {
      if(value){
        this.params.userid = value['userid'];
        console.log(this.params);
      }
    });

    console.log(this.params);
    setTimeout(() => {

        this.ionicService.getServerData(this.params).subscribe(
            data => {
              if(data != null){
                this.listinfos = data;
                this.params.page++;
              }else{

                let alert = this.alertCtrl.create({
                  title: '没有数据或请求失败！',
                  subTitle: '',
                  buttons: ['OK']
                });
                alert.present();

                this.hasnomany = true;
              }
              loading.dismiss();
            }

        );
    }, 1000);// 延迟

  }



}
