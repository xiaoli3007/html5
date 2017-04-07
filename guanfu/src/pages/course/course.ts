import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { ListPage } from './list/list';

import { IonicService } from '../../services/IonicService';
import {ConfigService} from "../../services/ConfigService";
import {Common} from "../../utils/common";

@Component({
  selector: 'page-course',
  templateUrl: 'course.html',
  providers: [IonicService,Common,ConfigService],
})
export class CoursePage {

  //接口参数
  private params = {
    act: 'category',
  };

  //检索参数
  private searchparams = {
    keyword: '',
    catid: 0,
  };

  category= [];

  constructor(public navCtrl: NavController,  private ionicService:IonicService,  public common: Common) {

    this.ionicService.getServerData(this.params).subscribe(
        data => {
          //this.homeinfos = data;
          this.category = data;
          console.log(this.category);
        }

    );

  }

  search(keyword,catid) {
    this.searchparams.keyword = keyword;
    this.searchparams.catid = catid;
    console.log(keyword);
    console.log(catid);
    this.navCtrl.push(ListPage,{
      search_files:  this.searchparams
    });
  }


}
