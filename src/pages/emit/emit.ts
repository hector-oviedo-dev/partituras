import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ServicesProvider } from '../../providers/services/services';

/**
 * Generated class for the EmitPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-emit',
  templateUrl: 'emit.html',
})
export class EmitPage {
  @ViewChild('Content') content:Content;
  public title:string;
  public contenido:Array<Line> = [];
  public actualText:string;

  public actualPosition:number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http:HttpClient, private services:ServicesProvider) {
    this.services.connect();
    this.processResult(this.navParams.get('data'));
  }
  public processResult(data) {
    this.title = "Carmina Burana - Carl Orff";
    for (let i = 0; i < data.text.length; i++) {
      let line = {
        id:i+1,
        textOriginal:data.textOriginal[i],
        text:data.text[i],
        time:3,
        active:false
      }

      this.contenido.push(line);
    }
  }
  public onClick(linetmp) {
    let line = linetmp-1;
    for (let i = 0; i < this.contenido.length; i++) this.contenido[i].active = false;
    this.contenido[line].active = true;

    this.actualText = this.contenido[line].text;
    this.actualPosition = 140 * line;
    this.content.scrollTo(0, this.actualPosition, 1000);
    let data = {
      type:"gotoline",
      value:line
    }
    this.services.sendMessage(JSON.stringify(data));
  }
}
interface Line {
  textOriginal:string,
  text:string,
  time:number,
  id:number,
  active:boolean
}
