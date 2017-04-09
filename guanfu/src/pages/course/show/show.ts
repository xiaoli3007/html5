import { Component } from '@angular/core';

import {  NavController,NavParams , LoadingController,AlertController} from 'ionic-angular';
import { IonicService } from '../../../services/IonicService';
import {ConfigService} from "../../../services/ConfigService";
import {Common} from "../../../utils/common";


@Component({
  selector: 'page-show',
  templateUrl: 'show.html',
  providers: [IonicService,Common,ConfigService],
})
export class ShowPage {
  selectedItem: any;
  showinfos =[];
  videolist = [];
  default_video ='';
  private params = {
    act: 'program',
    userid:0,
    id: 0,
    catid: 0,
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,private loadingCtrl: LoadingController,public common: Common, private ionicService:IonicService) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    if(this.selectedItem.catid){

      this.params.catid = this.selectedItem.catid;
    }
    if(this.selectedItem.id){

      this.params.id = this.selectedItem.id;
    }

  }


  ngOnInit() {

    let loading = this.loadingCtrl.create(this.common.getSpinnerConfig());
    loading.present();
    console.log(this.params);
    this.ionicService.getServerData(this.params).subscribe(
        data => {
          if(data != null){

            this.showinfos = data;
            this.videolist = data['serial'];
            if(this.videolist != null){
              this.default_video = encodeURI(this.videolist[0]['url']['play']);
            }

            console.log(data);

          }else{
            let alert = this.alertCtrl.create({
              title: '请求数据失败',
              subTitle: '',
              buttons: ['OK']
            });
            alert.present();
          }
          loading.dismiss();
        }

    );

  }

  openthisvideo(url){

    this.default_video = url;
    console.log(url);
  }




}
