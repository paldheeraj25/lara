import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvVarProvider } from '../../providers/env-var/env-var';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

/*
  Generated class for the ProductProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductProvider {

  constructor(public http: HttpClient, public env: EnvVarProvider) {
  }

  getProduct(id: String) {
    return this.http.get(this.env.api + "products/39493000006226");
  }

  updateProduct(timestamp) {
    return this.http.put("http://192.168.0.14:5012/api/appData/39493000006226", { timestamp: timestamp }).map(res => res).take(1);
  }

  getPosts() {
    return this.http.get("http://192.168.0.14:5012/api/products");
  }
}
