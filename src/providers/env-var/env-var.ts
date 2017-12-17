import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the EnvVarProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EnvVarProvider {

  public api: String = 'http://45.33.34.17/api/';//http://45.33.34.17/api/
  public host: String = 'http://45.33.34.17/';
  //public api: String = 'http://localhost:5012/api/';
  //public host: String = 'http://localhost:5012/';
  constructor(public http: HttpClient) {

  }

}
