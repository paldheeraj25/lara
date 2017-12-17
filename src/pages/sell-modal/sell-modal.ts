import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Jewel, IJewel } from '../../interfaces/jewel.interface';
import { ProductProvider } from '../../providers/product/product';

/**
 * Generated class for the SellModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sell-modal',
  templateUrl: 'sell-modal.html',
})
export class SellModalPage {

  public contactNumber: string = '';
  public contactEmail: string = '';
  public jewel: Jewel = this.navParams.data;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public productProvider: ProductProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SellModalPage');
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  updateSoldCount() {
    console.log('in component for updatecount');
    return this.productProvider.updateSoldCount(this.jewel).subscribe(res => {
      console.log(res);
    });
  }

}
