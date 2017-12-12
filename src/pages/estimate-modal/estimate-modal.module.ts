import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EstimateModalPage } from './estimate-modal';

@NgModule({
  declarations: [
    EstimateModalPage,
  ],
  imports: [
    IonicPageModule.forChild(EstimateModalPage),
  ],
})
export class EstimateModalPageModule {}
