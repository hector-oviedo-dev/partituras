import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PartituraPage } from '../../pages/partitura/partitura';
import { OperaPage } from '../../pages/opera/opera';
import { ServicesProvider } from '../../providers/services/services';


/**
 * Generated class for the OperasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-operas',
  templateUrl: 'operas.html',
})
export class OperasPage {
  public title:string = "Obras";
  public operas:Array<string> = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private http:HttpClient, private services:ServicesProvider) {

    this.services.disconnect();
    this.http.get(this.services.getAPI_URL() + '/api/list').subscribe(
      data => { this.processResult(data); },
      (e:HttpErrorResponse) => {
        console.log("ERROR: " + e);
      }
    );
  }
  public processResult(data) {
    let files = data.files;
    for (let i = 0; i < files.length; i++) {
      this.operas.push(files[i]);
    }
  }
  public onClick(name) {
    let data = {
      name:name
    }
    this.navCtrl.push(OperaPage,data)
  }
}
