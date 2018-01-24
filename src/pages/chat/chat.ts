import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ChatDetailPage} from "../chat-detail/chat-detail";

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
userinfo:Object;
ChatDetailPage:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.userinfo={
      userid: '123321',
      username: 'Vivien'
    }
    this.ChatDetailPage = ChatDetailPage;
  }
}
