import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PartituraPage } from '../../pages/partitura/partitura';
import { EmitPage } from '../../pages/emit/emit';
import { ServicesProvider } from '../../providers/services/services';

/**
 * Generated class for the OperaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-opera',
  templateUrl: 'opera.html',
})
export class OperaPage {
  public title:string;
  private traductions:Array<language> = [];

  private original:Array<string> = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private http:HttpClient, private services:ServicesProvider) {

    this.services.disconnect();
    this.title = this.navParams.get('name');

    this.http.get(this.services.getAPI_URL() + '/api/download?name=' + this.title).subscribe(
      data => { this.processResult(data); },
      (e:HttpErrorResponse) => {
        console.log("ERROR: " + e);
      }
    );
  }
  public processResult(data) {
    
    for (let i = 0; i < data.length; i++) {
      if (data[i].name == "original") for (let j = 0; j < data[i].data.length; j++) this.original.push(data[i].data[j]);
      else {
        let traduction:language = {
          id:this.traductions.length,
          name:data[i].name,
          textOriginal:this.original,
          text:data[i].data
        }
        this.traductions.push(traduction);
      }
    }
  }
  public onClick(id) {
    let data = {
      name:this.title,
      data:this.traductions[id]
    }
    this.navCtrl.push(PartituraPage,data)
  }
}
interface language {
  id:number,
  name:string;
  textOriginal:Array<string>;
  text:Array<string>;
}
