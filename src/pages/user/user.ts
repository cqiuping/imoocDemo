import {Component} from '@angular/core';
import {
  IonicPage, LoadingController, ModalController, NavController, NavParams, ToastController,
  ViewController
} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {BaseUI} from "../../common/baseui";
import {RestProvider} from "../../providers/rest/rest";
import {HeadfacePage} from "../headface/headface";

/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage extends BaseUI {

  userInfo: string[];
  headface = "http://img.mukewang.com/user/57a322f00001e4ae02560256-40-40.jpg1516107723453";
  nickName = "加载中...";
  errorMessage;


  constructor(public navCtrl: NavController,
              private storage: Storage,
              public rest: RestProvider,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private viewCtrl: ViewController,
              public navParams: NavParams) {
    super();
  }

  ionViewDidLoad() {
    this.loadUserPage();
  }

  updateNickName() {

    this.storage.get("UserId").then(val => {
      if (val != null) {
        let loading = super.showLoading(this.loadingCtrl,"修改中...");
        loading.present().then(() =>{
          this.rest.updateNickName(val, this.nickName)
          .subscribe(
            f => {
              if (f["Status"] == "OK") {
                loading.dismiss();
                super.showToast(this.toastCtrl, "用户名更新成功");

              }else{
                loading.dismiss();
                super.showToast(this.toastCtrl,f["StatusContent"]);
              }
            },
            err=>{this.errorMessage = <any>err;}
          )
        })
      }
    })
  }

  logout(){
    this.storage.remove('UserId');
    this.viewCtrl.dismiss();
  }

  gotoHeadface(){
    this.navCtrl.push(HeadfacePage);
  }

  private loadUserPage() {
    this.storage.get("UserId").then((val) => {
      if (val != null) {
        let loading = super.showLoading(this.loadingCtrl,"加载中...");
        loading.present().then(()=>{
         //加载用户数据
         this.rest.getUserInfo(val)
         .subscribe(
           userInfo => {
             loading.dismiss();
             this.userInfo = userInfo;
             this.headface = userInfo["UserHeadface"] + (new Date()).valueOf();
             this.nickName = userInfo["UserNickName"];
           },
           err => this.errorMessage = <any>err
         )
        })

      }
    });
  }

}
