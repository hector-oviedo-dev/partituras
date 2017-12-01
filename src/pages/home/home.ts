import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OperaPage } from '../../pages/opera/opera';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
     //Carmina Burana - Carl Orff
  }
  public onClick() {
    console.log("onclick")
    this.navCtrl.push(OperaPage)
  }
}
