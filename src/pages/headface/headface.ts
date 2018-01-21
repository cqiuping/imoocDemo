import {Component} from '@angular/core';
import {
  ActionSheetController, IonicPage, Loading, LoadingController, NavController, NavParams, Platform,
  ToastController, ViewController
} from 'ionic-angular';
import {BaseUI} from "../../common/baseui";
import {Storage} from "@ionic/storage";
import {Camera} from "@ionic-native/camera";
import {FilePath} from "@ionic-native/file-path";
import {File} from "@ionic-native/file";
import {FileTransfer, FileTransferObject} from "@ionic-native/file-transfer";

declare var cordova;//导入第三方库，导入ts中

/**
 * Generated class for the HeadfacePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-headface',
  templateUrl: 'headface.html',
})
export class HeadfacePage extends BaseUI {

  userId: string;
  errorMessage: any;
  lastPicture: string = null;

  constructor(public navCtrl: NavController,
              private storage: Storage,
              private camera: Camera,
              private platform: Platform,
              private filePath:FilePath,
              private file:File,
              private transfer:FileTransfer,
              private toastCtrl:ToastController,
              private loadingCtrl:LoadingController,
              private viewCtrl:ViewController,
              private actionSheetCtrl: ActionSheetController,
              public navParams: NavParams) {
    super();
  }

  ionViewDidLoad() {
    this.storage.get("UserId").then((val) => {
      if (val != null) {
        this.userId = val;
      }
    })
  }

  /**
   * 获取图片
   */
  getPicture(sourceType) {
    alert("getPicture");
    let options = {
      quality: 100, //图片的质量
      destinationType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }
    this.camera.getPicture(options).then((imagePath) => {
      //特别处理android文件路径问题
      if (this.platform.is('android') && sourceType == this.camera.PictureSourceType.PHOTOLIBRARY) {
          this.filePath.resolveNativePath(imagePath).then(
            (filePath) =>{
              console.log(filePath);
              console.log("imagePath:" + imagePath);
              let correctPath = filePath.substr(0,filePath.lastIndexOf('/') + 1);
              let currentName = imagePath.substr(imagePath.lastIndexOf("/") + 1, imagePath.lastIndexOf("?"));
              this.copyFileToLocalDir(correctPath,currentName,this.createFileName());
            }
          )
      }else{
        let correctPath = imagePath.substr(0,imagePath.lastIndexOf('/') + 1);
        let currentName = imagePath.substr(imagePath.lastIndexOf("/") + 1);
        this.copyFileToLocalDir(correctPath,currentName,this.createFileName());
      }
    },(error) =>{
      alert(error);
      super.showToast(this.toastCtrl,"获取图片有误，请检查设备")})
  }

  /**
   *
   * 将获取到的图片或者相机拍摄到的图片进行一下另存为，用于后期的上传使用
   * @param filePath
   * @param currentName
   * @param newFileName
   */
  private copyFileToLocalDir(filePath, currentName, newFileName){
    this.file.copyFile(filePath, currentName,cordova.file.DataDirectory,newFileName).then(
      isSuccess =>{
        this.lastPicture = newFileName;
      },error => {
        super.showToast(this.toastCtrl,"存储图片到本地图库错误");
      });
  }

  /**
   * 为文件生成新的文件名
   */
  private createFileName(){
    let d = new Date(),
      n=d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }

  /**
   *处理图片的路径为可以上传的路径
   */
  pathForImage(img){
    if(img === null){
      return '';
    }else{
      return cordova.file.dataDirectory + img;
    }
  }

  uploadImage(){
    var url = 'https://imoocqa.gugujiankong.com/api/account/uploadheadface';
    var targetPath = this.pathForImage(this.lastPicture);
    var fileName = this.userId + ".jpg";//定义上传后的文件名
    //上传的参数
    var options = {
      fileKey:"file",
      fileName:fileName,
      chunkedMode:false,
      mimeType:"multipart/form-data",
      params:{'fileName':fileName,'userid':this.userId}
    }
    const fileTransfer:FileTransferObject = this.transfer.create();
    let  loading = super.showLoading(this.loadingCtrl,"上传中");
    loading.present().then(() =>{
      //开始正式上传
      fileTransfer.upload(targetPath,url,options).then(data =>{
           loading.dismiss();
           super.showToast(this.toastCtrl,"图片上传成功");
           setTimeout(()=>{
             this.viewCtrl.dismiss();
           },3000);
      },err=>{
        loading.dismiss();
        super.showToast(this.toastCtrl,"图片上传发生错误，请重试");
      })
    })
  }




  /**
   * 使用ActionSheet显示上传照片的途径
   */
  selectAS() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '选择图片',
      buttons: [
        {
          text: '从图片库中选择',
          handler: () => {
            this.getPicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: '使用相机',
          handler: () => {
            this.getPicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: '取消',
          role: 'cancel',
        }
      ]
    });
    actionSheet.present();
  }

}
