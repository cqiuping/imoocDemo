import {Loading, LoadingController, Toast, ToastController} from "ionic-angular";
/**
 * UI层所有公用方法的抽象类
 */
export abstract class BaseUI {
  constructor() {
  }

  /**
   * 通用的展示loading的组件
   * @param loadingCtrl
   * @param message
   * @returns {Loading}
   */

  protected showLoading(loadingCtrl: LoadingController,
                        message: string): Loading {
    var loader = loadingCtrl.create({
      content: message,
      duration: 3000,
      dismissOnPageChange: true //页面变化的时候自动关闭loading
    });
    loader.present();
    return loader;
  }

  protected showToast(toastCtrl: ToastController, message: string): Toast {
    let toast = toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
    return toast;
  }
}
