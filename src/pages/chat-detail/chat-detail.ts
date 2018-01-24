import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ChatDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat-detail',
  templateUrl: 'chat-detail.html',
})
export class ChatDetailPage {

  chatUsername:string;
  isSelectedEmoji:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.chatUsername = navParams.get("username");
  }

  selectedEmoji(){
    this.isSelectedEmoji = !this.isSelectedEmoji;
  }


}
