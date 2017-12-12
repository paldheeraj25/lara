import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { ApiAiClient } from 'api-ai-javascript';
import { ProductProvider } from '../product/product'
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ChatbotProvider {

  readonly token = 'dde83dd75908452fa187da9060897664';
  readonly client = new ApiAiClient({ accessToken: this.token });

  conversation: Observable<String>;
  product: Observable<any>;

  constructor(public http: HttpClient, private platform: Platform, public productProvider: ProductProvider) {
  }

  talk() {
    this.client.textRequest("components?")
      .then(res => console.log(res));
  }

  converse(msg: string) {
    return this.client.textRequest(msg)
      .then(res => {
        return res.result;
      });
  }
}
