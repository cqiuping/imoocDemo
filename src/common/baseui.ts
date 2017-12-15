import {Loading, LoadingController, Toast, ToastController} from "ionic-angular";
export abstract class BaseUI {
  constructor() {
  }

  protected showLoading(loadingCtrl: LoadingController,
                        message: string): Loading {
    var loader = loadingCtrl.create({
      content: message,
      duration: 3000,
      dismissOnPageChange: true
    });
    loader.present();
    return loader;
  }

  protected showToast(toastCtrl:ToastController,message:string):Toast{
    let toast = toastCtrl.create({
      message:message,
      duration:3000,
      position:'bottom'
    });
    toast.present();
    return toast;
  }
}
