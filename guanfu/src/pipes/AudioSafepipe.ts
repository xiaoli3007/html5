import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';

import {Audio} from '../data/audio';


@Pipe({ name: 'audiosafe' })
export class AudioSafepipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(allAudios: Audio[]) {

        for(var item in allAudios){

          var beausrc = this.sanitizer.bypassSecurityTrustResourceUrl(allAudios[item]['src']);
          allAudios[item]['src'] = beausrc.toString();

        }
    return allAudios;

  }
}
