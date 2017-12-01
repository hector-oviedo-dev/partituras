import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OperaPage } from './opera';

@NgModule({
  declarations: [
    OperaPage,
  ],
  imports: [
    IonicPageModule.forChild(OperaPage),
  ],
})
export class OperaPageModule {}
