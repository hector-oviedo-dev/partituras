import { Component,ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

/**
 * Generated class for the UploadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPage {
  @ViewChild('fileInput') fileInputElement: ElementRef;

  @ViewChild('fileName') textInputElement: ElementRef;

  constructor(public navCtrl: NavController, public navParams: NavParams, private services:ServicesProvider,private http:HttpClient) {

  }
  public onClick() {
    let file:File = this.fileInputElement.nativeElement.files[0];

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    let formData: FormData = new FormData();
    formData.append('file', file);

    //this.services.uploadFile(file);
    this.http.post(this.services.getAPI_URL() + '/api/upload', formData, { headers }).subscribe(data => {
      // Read the result field from the JSON response.
      console.log(data);
    });
  }

}
