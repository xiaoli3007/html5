import {Component} from "@angular/core";
import {NavController, LoadingController} from "ionic-angular";
import "rxjs/add/operator/map";
import {SERVER_BASE_URL} from "../../../utils/constants";
import {Http} from "@angular/http";
import {RoadMapDetailPage} from "../roadmap-detail/roadmap-detail";
import {Helper} from "../../../utils/helper";

@Component({
  templateUrl: "roadmap-list.html",
  providers: [Helper]
})

export class RoadMapPage {
  private roadmaps;

  constructor(private loadingCtrl:LoadingController, public nav:NavController, public http:Http, public helper: Helper) {
    this.http = http;
  }

  ngOnInit() {
    let loading = this.loadingCtrl.create(this.helper.getSpinnerConfig());
    loading.present();

    let url = SERVER_BASE_URL.roadmap + "api/all.json";
    let self = this;
    this.http.get(url)
      .map(res => res.json())
      .subscribe(
        data => {
          self.roadmaps = data["content"];
          loading.dismiss();
        }
      );
  }

  openRoadmapDetailPage(roadmap) {
    this.nav.push(RoadMapDetailPage, {roadmap: roadmap});
  }
}
