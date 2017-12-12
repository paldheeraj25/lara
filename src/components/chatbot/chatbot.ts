import { Component, Input } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { ChatbotProvider } from '../../providers/chatbot/chatbot';
import { ProductProvider } from '../../providers/product/product';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/last';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/takeLast';

/**
 * Generated class for the ChatbotComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'chatbot',
  templateUrl: 'chatbot.html'
})
export class ChatbotComponent {

  @Input() productId: string;

  message: Observable<String>;
  public productObservable: Observable<any>;
  bot: string;
  text: String;

  constructor(public chatbot: ChatbotProvider, private toastCtrl: ToastController, public productProvider: ProductProvider) {

  }

  sendMessage() {
    this.chatbot.converse(this.bot).then(res => {
      if (res['metadata'].intentName === 'price') {

        this.productObservable = this.productProvider.getProduct(this.productId);
        this.productObservable.subscribe(productRes => {
          console.log(productRes);
        });
      }
      //this.presentToast(res.fulfillment.speech);
    });
  }

  presentToast(str: any) {

    let toast = this.toastCtrl.create({
      message: str,
      duration: 5000,
      position: 'middle',
      cssClass: 'laraResponse'
    });

    toast.onDidDismiss(() => {
      //console.log('Dismissed toast');
    });

    var msg = new SpeechSynthesisUtterance(str);
    window.speechSynthesis.speak(msg);
    toast.present();
  }

  checkPrice() {
    this.bot = 'What is the price?';
    this.sendMessage();
  }

  about() {
    this.bot = 'Tell me about this?';
    this.sendMessage();
  }

  discount() {
    this.bot = 'discount?';
    this.sendMessage();
  }

  ionViewDidLoad() {

  }
}
