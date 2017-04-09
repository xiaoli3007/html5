import { Component } from '@angular/core';

import {  NavController,NavParams , LoadingController,AlertController, ViewController} from 'ionic-angular';
import { IonicService } from '../../../services/IonicService';
import {ConfigService} from "../../../services/ConfigService";
import {Common} from "../../../utils/common";
import { Storage } from '@ionic/storage';

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
  is_favorite = false ;
  private params = {
    act: 'program',
    userid:0,
    id: 0,
    catid: 0,
  };

  private favorite_save_params = {
    act: 'favorite_save',
    userid:0,
    id: 0,
    catid: 0,
  };

  //user_info = {
  //  userid: 0,
  //  username: "游客",
  //  email: "",
  //  groupid: "",
  //  groupids: "",
  //  photo: "../../assets/images/graphic.png",
  //  truename: "游客"
  //};


  constructor(private viewCtrl:ViewController,public storage:Storage, public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,private loadingCtrl: LoadingController,public common: Common, private ionicService:IonicService) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    if(this.selectedItem.catid){

      this.params.catid = this.selectedItem.catid;
      this.favorite_save_params.catid = this.selectedItem.catid;
    }
    if(this.selectedItem.id){

      this.params.id = this.selectedItem.id;
      this.favorite_save_params.id = this.selectedItem.id;
    }
    //this.viewCtrl._didEnter().subsc ;



  }




  ngOnInit() {

    let loading = this.loadingCtrl.create(this.common.getSpinnerConfig());
    loading.present();

    this.storage.get("storage_user_info").then((value) => {
      if(value){
        this.favorite_save_params.userid = value['userid'];
        this.params.userid = value['userid'];
        //this.user_info = value;
        console.log(this.params);
      }
    });

    console.log(11111);
    console.log(this.params);
    this.ionicService.getServerData(this.params).subscribe(
        data => {
          if(data != null){

            this.showinfos = data;
            this.videolist = data['serial'];
            this.is_favorite = data['is_favorite'] ;
            if(this.videolist != null){
              this.default_video = this.videolist[0]['url']['play'];
            }

            //console.log(data);

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
    //console.log(url);
  }

  favorite_save(){

    let loading = this.loadingCtrl.create(this.common.getSpinnerConfig());
    loading.present();
    //console.log(this.params);
    console.log( this.favorite_save_params);
    this.ionicService.getServerData(this.favorite_save_params).subscribe(
        data => {
          if(data != null){

            let alert = this.alertCtrl.create({
              title: data['msg'],
              subTitle: '',
              buttons: ['OK']
            });
            alert.present();
            this.is_favorite = true ;
          }else{
            let alert = this.alertCtrl.create({
              title: '收藏失败！',
              subTitle: '',
              buttons: ['OK']
            });
            alert.present();
          }
          loading.dismiss();
        }

    );
  }


}
