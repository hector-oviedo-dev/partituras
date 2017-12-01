import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PartituraPage } from './partitura';

@NgModule({
  declarations: [
    PartituraPage,
  ],
  imports: [
    IonicPageModule.forChild(PartituraPage),
  ],
})
export class PartituraPageModule {}
