import { Component } from '@angular/core';

import { NavController , NavParams , Events} from 'ionic-angular';
import {IonicService} from "../../services/IonicService";
import {ConfigService} from "../../services/ConfigService";
import { ItemDetailsPage } from './item-details/item-details';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
    providers: [IonicService, ConfigService],
})
export class HomePage {
    private topics = [];


    //主题列表默认参数
    private params = {
        page: 1,
    };

  constructor(private ionicService:IonicService,public navCtrl: NavController, public navParams: NavParams, private events:Events) {

      //icons: string[];
      //items: Array<{title: string, note: string, icon: string}>;
      //this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
      //    'american-football', 'boat', 'bluetooth', 'build'];
      //
      //this.items = [];
      //for(let i = 1; i < 110; i++) {
      //    this.items.push({
      //        title: 'Item ' + i,
      //        note: 'This is item #' + i,
      //        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      //    });
      //}

      //this.ionicService.getTopics(this.params).subscribe(
      //    data => {
      //        this.topics = data;
      //        console.log(data);
      //        this.params.page++;
      //    }
      //);

      //this.events.subscribe('doRefresh', ()=> {
      //    this.params.page = 1;
      //    console.log(2222);
      //    this.ionicService.getTopics(this.params).subscribe(
      //        data => {
      //            this.topics = data;
      //            this.params.page++;
      //        }
      //    );
      //});


  }


    itemTapped(event, item) {
        this.navCtrl.push(ItemDetailsPage, {
            item: item
        });
    }


    doRefresh(refresher) {
        console.log('刷新数据');
        this.params.page = 1;
        setTimeout(() => {
            this.ionicService.getTopics(this.params).subscribe(
                data => {
                    this.topics = [];
                    this.topics = data;
                    this.params.page++;
                }
            );
            refresher.complete();
        }, 500);// 延迟500ms
    }


    doInfinite(infiniteScroll) {
        console.log('加载数据');
        setTimeout(() => {


            this.ionicService.getTopics(this.params)
                .subscribe(
                    data => {
                        console.log('返回数据');
                        this.topics = this.topics.concat(data);
                        this.params.page++;
                    }
                );
            console.log('加载完毕准备更新');
            infiniteScroll.complete();
        }, 500); // 延迟500ms
    }

    ngOnInit() {


        this.ionicService.getTopics(this.params).subscribe(
            data => {
                this.topics = data;

                this.params.page++;
            }
        );

    }



}
