import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Jewel, IJewel } from '../../interfaces/jewel.interface';
import { ProductProvider } from '../../providers/product/product';
import { EnvVarProvider } from '../../providers/env-var/env-var';


/**
 * Generated class for the EstimateModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-estimate-modal',
  templateUrl: 'estimate-modal.html',
})
export class EstimateModalPage {

  public jewel: Jewel = this.navParams.data;
  public total: Number;
  public mobileNumber: number;
  public addImage: String;
  public addItameUrl: String;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public productProvider: ProductProvider, public envProvider: EnvVarProvider) {
  }

  ionViewDidLoad() {
    this.total = +this.jewel.beadsWeight + +this.jewel.goldCarat + +this.jewel.grossWeight + +this.jewel.netWeight + +this.jewel.percentageChrg + +this.jewel.perGramWeight;
    this.getAd();
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  sendSms() {
    let message = {
      jewel: 'Beads Weight: ' + this.jewel.beadsWeight + ' Gold CaratL: ' + this.jewel.goldCarat + ' Gross Weigth: ' + this.jewel.grossWeight + ' Net Weight: ' + this.jewel.netWeight + 'Percentage Charge: ' + this.jewel.percentageChrg + 'Per Gram Weight: ' + this.jewel.perGramWeight + ' Total: ' + this.total,
      number: this.mobileNumber
    }
    this.productProvider.sendSms(message).subscribe(data => {
      console.log(data);
    });
  }

  getAd() {
    return this.productProvider.getAd().subscribe(res => {
      this.addImage = this.envProvider.host.concat(res[0].image);
    });
  }

}
