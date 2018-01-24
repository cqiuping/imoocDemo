import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { DiscoveryPage } from '../pages/discovery/discovery';
import { ChatPage } from '../pages/chat/chat';
import { NotificationPage } from '../pages/notification/notification';
import { MorePage } from '../pages/more/more';

import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RestProvider } from '../providers/rest/rest';
import {LoginPage} from "../pages/login/login";
import {RegisterPage} from "../pages/register/register";
import {UserPage} from "../pages/user/user";
import {HeadfacePage} from "../pages/headface/headface";
import {Camera} from "@ionic-native/camera";
import {File} from "@ionic-native/file";
import {FileTransfer, FileTransferObject} from "@ionic-native/file-transfer";
import {FilePath} from "@ionic-native/file-path";
import {QuestionPage} from "../pages/question/question";
import {DetailsPage} from "../pages/details/details";
import {AnswerPage} from "../pages/answer/answer";
import {ChatDetailPage} from "../pages/chat-detail/chat-detail";
import { EmojiProvider } from '../providers/emoji/emoji';
import {ComponentsModule} from "../components/components.module";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DiscoveryPage,
    ChatPage,
    NotificationPage,
    MorePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    UserPage,
    HeadfacePage,
    QuestionPage,
    DetailsPage,
    AnswerPage,
    ChatDetailPage
  ],
  imports: [
    HttpModule,//全局需要导入http
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      backButtonText:'返回'
    }),
    ComponentsModule,
    IonicStorageModule.forRoot() //全局定义storage模块
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DiscoveryPage,
    ChatPage,
    NotificationPage,
    MorePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    UserPage,
    HeadfacePage,
    QuestionPage,
    DetailsPage,
    AnswerPage,
    ChatDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    File,
    FilePath,
    Camera,
    FileTransfer,
    FileTransferObject,
    EmojiProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
    EmojiProvider   //rest的定义导入
  ]
})
export class AppModule {}
