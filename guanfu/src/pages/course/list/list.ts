import { Component } from '@angular/core';
import { App, NavController,NavParams , LoadingController,AlertController, ViewController,Events} from 'ionic-angular';

import { IonicService } from '../../../services/IonicService';
import {ConfigService} from "../../../services/ConfigService";
import {Common} from "../../../utils/common";
import {ShowPage} from "../show/show";
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
  providers: [IonicService,Common,ConfigService],
})
export class ListPage {

  search_files: any;

  private params = {
    act: 'list',
    page: 1,
    keyword: '',
    max: 20,
    catid: 0,
  };

  private listinfos = [];
  hasnomany = false;

  constructor(public navCtrl: NavController,  private alertCtrl: AlertController,private loadingCtrl: LoadingController, private ionicService:IonicService, public navParams: NavParams, public common: Common, private events:Events) {


    this.search_files = navParams.get('search_files');
    if(this.search_files.keyword != ''){
      this.params.keyword = this.search_files.keyword;
    }
    if(this.search_files.catid != 0){
      this.params.catid = this.search_files.catid;
    }



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

  doRefresh(refresher) {
    console.log('刷新数据');
    this.params.page = 1;
    setTimeout(() => {
      this.ionicService.getServerData(this.params).subscribe(
          data => {
            if(data != null) {
              this.listinfos = [];
              this.listinfos = data;
              this.params.page++;
              this.hasnomany = false;
            }
          }
      );
      refresher.complete();
    }, 500);// 延迟500ms
  }


  doInfinite(infiniteScroll) {
    console.log('加载数据');
    setTimeout(() => {

      if(!this.hasnomany){

          this.ionicService.getServerData(this.params)
              .subscribe(
                  data => {
                    if(data != null) {
                      console.log('返回数据');
                      this.listinfos = this.listinfos.concat(data);
                      this.params.page++;
                    }else{
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
    console.log(this.params);
    this.ionicService.getServerData(this.params).subscribe(
        data => {
          if(data != null){
            this.listinfos = data;
            this.params.page++;
          }else{
            this.hasnomany = true;
          }
          loading.dismiss();
        }

    );

  }




}
