import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { KeystreamProvider } from '../../providers/keystream/keystream';
import { ProductProvider } from '../../providers/product/product';

import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the ProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: ':id'
})
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {

  private key: string;
  private rowData: string;
  private uid: string;
  private flagTamper: string;
  private timeStampTag: any;
  private rollingCodeTag: any;
  //server Details
  private rollingCodeServer: any;
  private uidServer: string;
  private flagTamperServer: string;
  private timeStampTagServer: number;
  private productObject: Observable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public keystream: KeystreamProvider, public product: ProductProvider) {
  }

  getProduct() {

    this.product.getProduct().subscribe(data => {
      if (data['RowKey']) {
        data['TimeStampServer'] = parseInt(data['TimeStampServer']);
        if (this.timeStampTag > data["TimeStampServer"]) {
          this.uidServer = data['RowKey'];
          this.flagTamperServer = data['TamperFlag'];
          this.timeStampTagServer = data['TimeStampServer'];
          var hexbitSecretKey = this.keystream.hexbit(data["SecretKey"]);
          var hexbitTimeStamp = this.keystream.hexbit(this.rowData.substr(16, 8));
          this.rollingCodeServer = this.keystream.keystream(hexbitSecretKey, hexbitTimeStamp, 4);

          // this.product.updateProduct(this.timeStampTag).subscribe(data => {
          //   console.log("time stamp updated");
          // });
        } else {
          console.log('url expired');
        }
      }
    });
    this.productObject = this.product.getProduct();
  }
  //ionic life cycle function
  ionViewDidLoad() {
    this.key = this.navParams.get('id');
    this.rowData = this.key.toUpperCase();
    this.uid = this.rowData.substr(0, 14);
    this.flagTamper = this.rowData.substr(14, 2);
    this.timeStampTag = (this.keystream.hexdec(this.rowData.substr(16, 8)));// 
    this.rollingCodeTag = this.rowData.substr(24, 8);
    if (this.uid.substr(0, 4) != "3949") {
      //not valid uid
    } else {
      this.getProduct();
    }
  }

}
