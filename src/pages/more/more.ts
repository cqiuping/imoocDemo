import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {Storage} from "@ionic/storage";

/**
 * Generated class for the MorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage {
  public notLogin: boolean = true;
  public logined: boolean = false;

  constructor(public modalCtrl: ModalController,
              public navCtrl: NavController,
              public navParams: NavParams,
              public storage: Storage) {
  }

  showModal() {
    let modal = this.modalCtrl.create(LoginPage);
    modal.present();
  }

  ionViewDidEnter() {
    this.loadUserPage();
  }

  loadUserPage() {
    this.storage.get("UserId").then((val) => {
      console.log("yes");
      if (val != null) {
        console.log(val);
        this.logined = true;
        this.notLogin = false;
      } else {
        this.logined = false;
        this.notLogin = true;
      }
    });
  }


}
