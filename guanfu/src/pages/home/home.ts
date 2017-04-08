import { Component } from '@angular/core';

import { App, NavController,NavParams , LoadingController,AlertController, ViewController} from 'ionic-angular';

import { IonicService } from '../../services/IonicService';
import {ConfigService} from "../../services/ConfigService";
import {Common} from "../../utils/common";

import { ListPage } from '../course/list/list';
import { ShowPage } from '../course/show/show';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [IonicService,Common,ConfigService],
})
export class HomePage {


  private params = {
    act: 'home',

  };
  //homeinfos=[];
  slideimages=[];
  category=[];
    //检索参数
    private searchparams = {
        keyword: '',
        catid: 0,
    };

  constructor(public navCtrl: NavController,  private alertCtrl: AlertController,private loadingCtrl: LoadingController, private ionicService:IonicService, public navParams: NavParams, public common: Common) {

  }



  ngOnInit() {

    let loading = this.loadingCtrl.create(this.common.getSpinnerConfig());
    loading.present();

    this.ionicService.getServerData(this.params).subscribe(
        data => {
          //this.homeinfos = data;
          this.slideimages = data[0]['slideimages'];
          this.category = data[1]['category'];
          console.log(this.slideimages);
          console.log(this.category);
          loading.dismiss();
        }

    );

  }


    openList(catid) {
        this.searchparams.catid = catid;
        this.navCtrl.push(ListPage,{
            search_files:  this.searchparams
        });
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


}
