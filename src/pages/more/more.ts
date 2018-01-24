import {Component} from '@angular/core';
import {
  IonicPage, LoadingController, ModalController, NavController,
  NavParams
} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {Storage} from "@ionic/storage";
import {BaseUI} from "../../common/baseui";
import {RestProvider} from "../../providers/rest/rest";
import {UserPage} from "../user/user";

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
export class MorePage extends BaseUI {
  public notLogin: boolean = true;
  public logined: boolean = false;
  public userInfo:string[];
  public headface;


  constructor(public modalCtrl: ModalController,
              public navCtrl: NavController,
              public navParams: NavParams,
              public storage: Storage,
              public loadingCtrl: LoadingController,
              public rest: RestProvider) {
    super();
  }

  showModal() {
    console.log("showModal");
    let modal = this.modalCtrl.create(LoginPage);
    modal.onDidDismiss(()=>{
      this.loadUserPage();
    })
    modal.present();
  }

  ionViewDidEnter() {
    this.loadUserPage();
  }

  gotoUserPage(){
    this.navCtrl.push(UserPage);
  }

  loadUserPage() {
    this.storage.get("UserId").then((val) => {
      if (val != null) {
        //加载用户数据
        let loading = super.showLoading(this.loadingCtrl, "加载中....");
        loading.present().then(()=>{
          this.rest.getUserInfo(val)
          .subscribe(
            userInfo=>{
              this.userInfo = userInfo;
              this.headface = userInfo["UserHeadface"] + (new Date()).valueOf();
              this.logined = true;
              this.notLogin = false;
              // loading.dismiss();
            },
          )
        })

      } else {
        this.logined = false;
        this.notLogin = true;
      }
    });
  }
}
