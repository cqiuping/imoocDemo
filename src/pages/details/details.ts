import {Component} from '@angular/core';
import {
  IonicPage, LoadingController, NavController, NavParams,
  ToastController
} from 'ionic-angular';
import {BaseUI} from "../../common/baseui";
import {RestProvider} from "../../providers/rest/rest";
import {Storage} from "@ionic/storage";

/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage extends BaseUI {
  id: string;
  errorMessage: any;
  question: string[];
  answers: string[];
  isFavorite:boolean;
  userId:string;
  isMyQuestion:boolean;

  constructor(public navCtrl: NavController,
              private loadingCtrl: LoadingController,
              private rest: RestProvider,
              private toastCtrl:ToastController,
              private storage:Storage,
              public navParams: NavParams) {
    super();
  }

  ionViewDidLoad() {
    this.id = this.navParams.get("id");
    this.loadQuestion(this.id);
  }

  saveFavorite(){
    this.rest.saveFavorite(this.id, this.userId).subscribe(
      f=>{
        if(f["Status"] == "OK" ){
          super.showToast(this.toastCtrl,this.isFavorite?"取消关注成功":"关注成功");
          this.isFavorite = !this.isFavorite;
          this.isMyQuestion = (f["OwnUserId"] == this.userId);
        }
      },error=>{
        console.log(error.message);
        this.errorMessage = <any>error;
    }
    )
  }

  private loadQuestion(id) {
    this.storage.get("UserId").then((val) =>{
      if(val != null){
        this.userId  =val;
        let loading = super.showLoading(this.loadingCtrl, "加载中...");
        loading.present().then(() => {
          this.rest.getQuestionWithUser(id,this.userId).subscribe(
            f => {
              this.question = f;
              this.answers = f["Answers"];
              this.isFavorite = f["IsFavourite"];
              loading.dismiss();
            }, error => {
              this.errorMessage = <any>error;
            }
          )
        });
      }
    })
  }

}
