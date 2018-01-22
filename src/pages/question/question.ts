import {Component} from '@angular/core';
import {
  IonicPage, LoadingController, NavController, NavParams, Toast, ToastController,
  ViewController
} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {BaseUI} from "../../common/baseui";
import {RestProvider} from "../../providers/rest/rest";

/**
 * Generated class for the QuestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-question',
  templateUrl: 'question.html',
})
export class QuestionPage extends BaseUI {

  title: string;
  content: string;
  errorMessage;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage: Storage,
              private loadingCtrl: LoadingController,
              private rest: RestProvider,
              private toastCtrl: ToastController,
              private viewCtrl: ViewController) {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  submitQuestion() {
    this.storage.get("UserId").then(
      (val) => {
        if (val != null) {
          var loading = super.showLoading(this.loadingCtrl, "问题提交中....");
          loading.present().then(() => {
            this.rest.submitQuestion(val, this.title, this.content)
            .subscribe(
              f => {
                if (f["Status"] == "OK") {
                  loading.dismiss();
                  super.showToast(this.toastCtrl, "发表成功");
                  setTimeout(() => {
                    this.dismiss();
                  }, 500);
                } else {
                  loading.dismiss();
                  super.showToast(this.toastCtrl, f["StatusContent"]);
                }
              },
              error => {
                console.log("错错啦");
                this.errorMessage = <any>error;
                alert("错误信息：" + error.message);
              }
            )
          })
        } else {
          super.showToast(this.toastCtrl, "请登录后再提问");
        }
      }
    )
  }

}
