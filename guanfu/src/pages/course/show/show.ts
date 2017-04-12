import { Component } from '@angular/core';

import {  NavController,NavParams , LoadingController,AlertController, ViewController} from 'ionic-angular';
import { IonicService } from '../../../services/IonicService';
import {ConfigService} from "../../../services/ConfigService";
import {Common} from "../../../utils/common";
import { Storage } from '@ionic/storage';
import { AudioProvider } from 'ionic-audio';


import {SafeResourceUrl, DomSanitizer} from '@angular/platform-browser';
import {Audio} from '../../../data/audio';

@Component({
  selector: 'page-show',
  templateUrl: 'show.html',
  providers: [IonicService,Common,ConfigService],
})
export class ShowPage {

  selectedItem: any;
  showtemplates =['show','show_audio','show_image'];
  showinfos =[];
  videolist = [];
  default_media_play ='';
  default_name = '';
  is_favorite = false ;
  template = '';
  comment_infos = [];
  show_audios: any[];
  allTracks: any[];
  selectedTrack = 0 ;
  selectedvideo = 0 ;
  relationship ='list'; //默认按钮
  private params = {
    act: 'program',
    userid:0,
    id: 0,
    catid: 0,
  };

  private comment_params = {
    act: 'comment',
    id: 0,
    catid: 0,
  };


  private favorite_save_params = {
    act: 'favorite_save',
    userid:0,
    id: 0,
    catid: 0,
  };



  constructor(private sanitizer: DomSanitizer,private _audioProvider: AudioProvider, private viewCtrl:ViewController,public storage:Storage, public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,private loadingCtrl: LoadingController,public common: Common, private ionicService:IonicService) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    if(this.selectedItem.catid){

      this.params.catid = this.selectedItem.catid;
      this.favorite_save_params.catid = this.selectedItem.catid;
      this.comment_params.catid = this.selectedItem.catid;
    }
    if(this.selectedItem.id){

      this.params.id = this.selectedItem.id;
      this.favorite_save_params.id = this.selectedItem.id;
      this.comment_params.id = this.selectedItem.id;
    }

    //音频插件开始
    // plugin won't preload data by default, unless preload property is defined within json object - defaults to 'none'
    //this.show_audios = [{
    //  src: 'http://guanfumaster.com/appapi/aaa.mp3',
    //  artist: 'John Mayer',
    //  title: 'Why Georgia',
    //  art: '../../../assets/images/graphic.png',
    //  preload: 'metadata' // tell the plugin to preload metadata such as duration for this track, set to 'none' to turn off
    //}];

}


  //音频插件开始
  ngAfterContentInit() {
    // get all tracks managed by AudioProvider so we can control playback via the API
    this.allTracks = this._audioProvider.tracks;

    console.log('-----',  this.allTracks);
  }

  playSelectedTrack(selectedTrack) {
    // use AudioProvider to control selected track
    if(this.selectedTrack != selectedTrack){
       this._audioProvider.pause( this.selectedTrack);
    }
    console.log('开始播放第几个歌',  selectedTrack);
    this._audioProvider.play( selectedTrack);
    this.selectedTrack =  selectedTrack;

  }

  pauseSelectedTrack(selectedTrack) {
    this.selectedTrack =  selectedTrack;
    // use AudioProvider to control selected track
    console.log('开始暂停第几个歌',  this.selectedTrack);
    this._audioProvider.pause( this.selectedTrack);
  }

  onTrackFinished(track: any) {

    console.log('Track finished', track);
    console.log(this.selectedTrack+'歌播放完毕');
  }
  //音频结束


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

    setTimeout(() => {

      //获取资源信息
        this.ionicService.getServerData(this.params).subscribe(
          data => {
            if(data != null){

              this.showinfos = data;
              this.videolist = data['serial'];
              this.is_favorite = data['is_favorite'] ;
              this.template = data['template'] ;

              if(this.videolist != null){
                this.default_media_play = this.videolist[0]['url']['play'];
                this.default_name = this.videolist[0]['name'];
              }
              if(this.template=='show_audio'){

                var Array=[];
                for (var i = 0; i < this.videolist.length; i++) {
                    //var  show_audio = { title: '', src: '', art: '', preload: '' };
                    var  show_audio = new Audio('','','','');
                    show_audio.title = this.videolist[i]['name'];

                   //var beausrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.videolist[i]['url']['play']);
                   // console.log('数据类型'+typeof(beausrc.toString()));
                   // show_audio.src = beausrc.toString();

                    show_audio.src = this.videolist[i]['url']['play'];
                    //show_audio.art = this.videolist[i]['url']['stage'];
                    show_audio.art = '../../../assets/images/graphic.png';
                    show_audio.preload = 'metadata';

                    Array.push(show_audio);
                  }

                this.show_audios=Array;

               //var  show_audiosrc = this.sanitizer.bypassSecurityTrustUrl('https://medium.com/m/');
               // console.log(show_audiosrc);

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
          }

      );
      //获取资源评论信息
      this.ionicService.getServerData(this.comment_params).subscribe(
          data => {
            if(data != null){
              this.comment_infos = data;
              //console.log(data);
            }else{

              let alert = this.alertCtrl.create({
                title: '请求数据失败',
                subTitle: '',
                buttons: ['OK']
              });
              alert.present();
            }

          }

      );

    }, 1000);// 延迟

    loading.dismiss();

  }

  openthisvideo(selectedvideo){

    this.selectedvideo = selectedvideo ;
    //this.default_media_play = url;
    //console.log(url);
  }

  playthisimage(selectedimage){

    //console.log(selectedimage);
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
