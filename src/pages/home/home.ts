import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { KeystreamProvider } from '../../providers/keystream/keystream';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public keystream: KeystreamProvider) {

  }

  ionViewWillEnter() {
    console.log("will enter");
    this.keystream.test();
  }

}
