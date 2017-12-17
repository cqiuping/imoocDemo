import {Component} from '@angular/core';
import {
  IonicPage, LoadingController, NavController, NavParams, ToastController,
  ViewController
} from 'ionic-angular';
import {BaseUI} from "../../common/baseui";
import {RestProvider} from "../../providers/rest/rest";
import {Storage} from "@ionic/storage";
import {RegisterPage} from "../register/register";
import {NotificationPage} from "../notification/notification";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage extends BaseUI {

  mobile: any;
  password: any;
  errorMessage:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public loadingCtrl: LoadingController,
              public rest: RestProvider,
              public toastCtrl:ToastController,
              public storage: Storage) {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    var loading = super.showLoading(this.loadingCtrl, "登陆中...");
    this.rest.login(this.mobile, this.password)
    .subscribe(
      f=>{
        if(f["Status"] == "OK"){
          //处理登陆成功的页面跳转
          this.storage.set('UserId',f["UserId"]);
          loading.dismiss();
          this.dismiss();//把登陆页面dissmiss掉
        }else{
          loading.dismiss();
          super.showToast(this.toastCtrl,f["StatusContent"]);
        }
    },
    error=>this.errorMessage = <any>error);
  }

  pushRegisterPage(){
    this.navCtrl.push(RegisterPage);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
