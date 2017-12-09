import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductPage } from './product';
import { ChatbotComponent } from '../../components/chatbot/chatbot';
@NgModule({
  declarations: [
    ProductPage,
    ChatbotComponent
  ],
  imports: [
    IonicPageModule.forChild(ProductPage),
  ],
})
export class ProductPageModule { }
