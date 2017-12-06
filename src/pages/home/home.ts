import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OperasPage } from '../../pages/operas/operas';
import { AdminPage } from '../../pages/admin/admin';


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
    //this.navCtrl.push(OperasPage)
    this.navCtrl.push(AdminPage)
  }
}
