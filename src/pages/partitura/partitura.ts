import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';

/**
 * Generated class for the PartituraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-partitura',
  templateUrl: 'partitura.html',
})
export class PartituraPage {
 @ViewChild('Content') content:Content;

  public contenido:Array<Line> = [];
  public actualText:string;
  public actualTextOriginal:string;

  public actualPosition:number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private events:Events, private services:ServicesProvider) {
    this.services.connect();

    this.events.subscribe('onmessage', (msg) => {
      this.onMessage(msg);
     });

     this.processResult(this.navParams.get('data'));
  }
  public processResult(data) {
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
  public onMessage(message) {
    let msg = JSON.parse(message);
    if (msg.type == "gotoline") this.goToLine(msg.value);
  }
  public goToLine(line) {
    for (let i = 0; i < this.contenido.length; i++) this.contenido[i].active = false;

    this.actualText = this.contenido[line].text;
    this.actualTextOriginal = this.contenido[line].textOriginal;
    this.contenido[line].active = true;
    this.actualPosition = 140 * line;
    this.content.scrollTo(0, this.actualPosition, 2500);
  }
}
interface Line {
  textOriginal:string,
  text:string,
  time:number,
  id:number,
  active:boolean
}
