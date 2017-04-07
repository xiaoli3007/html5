import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { CoursePage } from '../pages/course/course';
import { ListPage } from '../pages/course/list/list';
import { ShowPage } from '../pages/course/show/show';
import { MyPage } from '../pages/my/my';
import { LoginPage } from '../pages/my/login/login';
import { RegPage } from '../pages/my/reg/reg';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    CoursePage,
    ListPage,
    ShowPage,
    MyPage,
    LoginPage,
    RegPage,
    HomePage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp,{
      tabbarPlacement: "bottom",
      backButtonText: "后退",
      tabsHideOnSubPages: true,
      tabsHighlight: true
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CoursePage,
    ListPage,
    ShowPage,
    MyPage,
    LoginPage,
    RegPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
