import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PartituraPage } from '../../pages/partitura/partitura';
import { OperasemitPage } from '../../pages/operasemit/operasemit';
import { UploadPage } from '../../pages/upload/upload';
import { ServicesProvider } from '../../providers/services/services';

/**
 * Generated class for the AdminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {
  constructor(public navCtrl: NavController, public navParams: NavParams, private http:HttpClient, private services:ServicesProvider) {

  }
  public onClick() {

    this.navCtrl.push(OperasemitPage)
  }
  public onUploadClick() {
    this.navCtrl.push(UploadPage)
  }
}
interface language {
  id:number,
  name:string;
  textOriginal:Array<string>;
  text:Array<string>;
}
