import {Component} from '@angular/core';
import {
  IonicPage, LoadingController, NavController, NavParams, ToastController,
  ViewController
} from 'ionic-angular';
import {BaseUI} from "../../common/baseui";
import {RestProvider} from "../../providers/rest/rest";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage extends BaseUI {

  mobile: any;
  password: any;
  nickName:any;
  confirmPassword : any;
  errorMessage:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public loadingCtrl: LoadingController,
              public rest: RestProvider,
              public toastCtrl:ToastController) {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  doRegister() {
    if(!(/^1[34578]\d{9}$/.test(this.mobile))){
      super.showToast(this.toastCtrl,"手机号码格式不正确");
    }else if(this.nickName.length < 3 || this.nickName.length > 10){
      super.showToast(this.toastCtrl,"昵称长度只能是3~10");
    }else if(this.password.length <6 || this.password.length > 20){
      super.showToast(this.toastCtrl,"密码长度只能是6~20");
    }else if(this.confirmPassword.length < 6 || this.confirmPassword.length > 20){
      super.showToast(this.toastCtrl,"密码长度只能是6~20");
    }else if(this.password != this.confirmPassword){
      super.showToast(this.toastCtrl,"两次的密码不匹配");
    }else{
      let loading = super.showLoading(this.loadingCtrl, "注册中...");
      this.rest.register(this.mobile,this.nickName,this.password)
        .subscribe(
          f=>{
            if(f["Status"] == "OK"){
              loading.dismiss();
              super.showToast(this.toastCtrl,"注册成功啦!");
              this.dismiss();
              this.navCtrl.push();
            }else{
              loading.dismiss();
              super.showToast(this.toastCtrl, f["StatusContent"]);
            }
          },
          error => this.errorMessage = <any>error);
    }

  }

  goToLogin() {
    this.navCtrl.pop();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
