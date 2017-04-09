import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
//import {AppVersion} from "ionic-native";
import {Common} from "../../../utils/common";


@Component({
  templateUrl: "about-us.html",
  providers: [ Common]
})

export class AboutUsPage {
  private version='1.0';
  private contributors;

  constructor(public nav:NavController,   public common: Common) {
  }

  //ionViewWillEnter(){
  //  let self = this;
  //  AppVersion.getVersionNumber().then(
  //      version => self.version = version
  //  );
  //}
  //


  openUrl(url) {
    this.common.openLink(url);
  }


}
