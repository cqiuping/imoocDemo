import { Component } from '@angular/core';
import {
  IonicPage, LoadingController, NavController, NavParams, ToastController,
  ViewController
} from 'ionic-angular';
import {BaseUI} from "../../common/baseui";
import {RestProvider} from "../../providers/rest/rest";
import {Storage} from "@ionic/storage";

/**
 * Generated class for the AnswerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-answer',
  templateUrl: 'answer.html',
})
export class AnswerPage extends BaseUI{
  id:string;
  userId:string;
  errorMessage:any;
  content:string;

  constructor(public navCtrl: NavController,
              private viewCtrl:ViewController,
              private rest:RestProvider,
              private loadingCtrl:LoadingController,
              private storage:Storage,
              private toastCtrl:ToastController,
              public navParams: NavParams) {
    super();
    this.id = navParams.get("id");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnswerPage');
  }

  submit(){
    this.storage.get("UserId").then((val)=>{
      let loading = super.showLoading(this.loadingCtrl,"发布中...");
      if(val != null){
        this.userId = val;
        this.rest.submitAnswer(this.userId,this.id,this.content).subscribe(
          f=>{
            if(f["Status"] == "OK"){
              // loading.dismiss();
              this.dismiss();
            }else{
              // loading.dismiss();
              super.showToast(this.toastCtrl,f["StatusContent"]);
            }
          },error=>{
            this.errorMessage = <any>error;
          }
        )
      }else{
        super.showToast(this.toastCtrl,"请登录后回答...");
      }
    })
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

}
