import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { KeystreamProvider } from '../../providers/keystream/keystream';
import { ProductProvider } from '../../providers/product/product';
import { EnvVarProvider } from '../../providers/env-var/env-var';
import { find, filter } from 'lodash';

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

  //metadata variables
  private metadata: any;
  public imageUrl: String = this.envProvider.host;
  public heading: String;
  public description: String;
  public metadataValues: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public keystream: KeystreamProvider, public product: ProductProvider, public envProvider: EnvVarProvider) {
  }

  getProduct(uid: string) {

    this.product.getProduct(uid).subscribe(data => {
      this.metadata = data['metadata'];
      this.metadataValues = filter(data['metadata'], function (meta) {
        return find(['manOrMachine', 'goldCarat', 'percentChrg', 'grossWeight', 'netWeight', 'stoneWeight', 'beadsWeight', 'perGramWeight'], function (o) { return o === meta.name; });
      });
      this.imageUrl = this.imageUrl + find(this.metadata, function (obj) { return obj.name === 'image'; }).value;
      this.heading = find(this.metadata, function (obj) { return obj.name === 'heading'; }).value;
      this.description = find(this.metadata, function (obj) { return obj.name === 'description'; }).value;
      data = data['engagement'];
      if (data['RowKey']) {
        data['TimeStampServer'] = parseInt(data['TimeStampServer']);
        if (this.timeStampTag > data["TimeStampServer"]) {
          this.uidServer = data['RowKey'];
          this.flagTamperServer = data['TamperFlag'];
          this.timeStampTagServer = data['TimeStampServer'];
          var hexbitSecretKey = this.keystream.hexbit(data["SecretKey"]);
          var hexbitTimeStamp = this.keystream.hexbit(this.rowData.substr(16, 8));
          this.rollingCodeServer = this.keystream.keystream(hexbitSecretKey, hexbitTimeStamp, 4);
          //this.product.updateProduct(this.timeStampTag).subscribe(data => {
          //   console.log("time stamp updated");
          // });

        } else {
          console.log('url expired');
        }
      }
    });
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
      this.getProduct(this.uid);
    }
  }

}