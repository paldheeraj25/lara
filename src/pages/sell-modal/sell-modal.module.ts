import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SellModalPage } from './sell-modal';

@NgModule({
  declarations: [
    SellModalPage,
  ],
  imports: [
    IonicPageModule.forChild(SellModalPage),
  ],
})
export class SellModalPageModule {}
