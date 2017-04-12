import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { CoursePage } from '../course/course';
import { MyPage } from '../my/my';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = CoursePage;
  tab3Root: any = MyPage;

  constructor() {

  }
}