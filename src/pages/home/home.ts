import { Component } from '@angular/core';
import {LoadingController, ModalController, NavController, Tabs} from 'ionic-angular';
import {QuestionPage} from "../question/question";
import {BaseUI} from "../../common/baseui";
import {RestProvider} from "../../providers/rest/rest";
import {DetailsPage} from "../details/details";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends BaseUI{

  feeds:string[];
  errorMessage:any;

  constructor(public navCtrl: NavController,
                private rest:RestProvider,
                private loadingCtrl:LoadingController,
                private modalCtrl:ModalController) {
        super();
  }

  ionViewDidLoad(){
    this.getFeeds();
  }

  /**
   * 进入问题内容页面
   */
  gotoDetail(identityId){
      this.navCtrl.push(DetailsPage,{id:identityId});
  }

  /**
   * 进入问答页面
   */
  gotoQuestion(){
    this.modalCtrl.create(QuestionPage).present();
  }

  /**
   * 进入聊天页面
   */
  gotoChat(){
    this.selectTab(2);
  }

  /**
   * 选定指定的tab
   * @param index
   */
  private selectTab(index){
    let t:Tabs = this.navCtrl.parent;
    t.select(index);
  }

  private getFeeds(){
    let loading = super.showLoading(this.loadingCtrl,"加载中...");
    let that = this;
    loading.present().then(()=>{
      that.rest.getFeeds().subscribe(
        f=>{
          this.feeds = f;
          loading.dismiss();
        },
        error =>{
          loading.dismiss();
          this.errorMessage = <any>error;
        }
      )
    })
  }

}
