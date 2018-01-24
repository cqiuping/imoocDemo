import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {BaseUI} from "../../common/baseui";
import {RestProvider} from "../../providers/rest/rest";
import {DetailsPage} from "../details/details";

/**
 * Generated class for the DiscoveryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-discovery',
  templateUrl: 'discovery.html',
})
export class DiscoveryPage extends BaseUI{

  questions:string[];
  errorMessage:any;

  constructor(public navCtrl: NavController,
              private rest:RestProvider,
              private loadingCtrl:LoadingController,
              public navParams: NavParams) {
    super();
  }

  ionViewDidLoad() {
    this.loadQuestions();
  }

  /**
   * 进入问题内容页面
   * @param identityId
   */
  gotoDetail(identityId){
    this.navCtrl.push(DetailsPage,{id:identityId});
  }

  /**
   * 下拉刷新
   */
  doRefresh(event){
    setTimeout(() => {
      this.loadQuestions();
      event.complete();
    }, 2000);

  }
  /**
   * 加载所有的question
   */
  private loadQuestions(){
    let loading = super.showLoading(this.loadingCtrl,"加载中...");
    let that = this;
    loading.present().then(()=>{
      that.rest.getQuestions().subscribe(
        f=>{
          // loading.dismiss();
          this.questions = f;
        },
        error =>{
          // loading.dismiss();
          this.errorMessage = <any>error;
        }
      )
    })
  }



}
