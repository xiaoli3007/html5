import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { ListPage } from './list/list';


@Component({
  selector: 'page-course',
  templateUrl: 'course.html'
})
export class CoursePage {

  //检索参数
  private params = {
    keyword: '',
    catid: 0,
  };

  constructor(public navCtrl: NavController) {

  }

  search(keyword,catid) {
    this.params.keyword = keyword;
    this.params.catid = catid;
    console.log(keyword);
    console.log(catid);
    this.navCtrl.push(ListPage,{
      search_files:  this.params
    });
  }


}
