import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the ServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServicesProvider {
  //public WS_URL:string = "ws://red-partitures.cloudno.de";
  //public API_URL:string = "http://red-partitures.cloudno.de";

  public WS_URL:string = "ws:/localhost:8080";
  public API_URL:string = "http://localhost:8080";

  private ws:WebSocket;

  private _events: Events;

  public connected:boolean = false;
  constructor(events:Events, private http:HttpClient) {
    this._events = events;
  }
  public getAPI_URL():string {
    return this.API_URL;
  }
  public async uploadFile(file: File): Promise<void> {
    
    // headers
    const headers = new HttpHeaders()
      .append('Content-Type', 'multipart/form-data');

    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    const response:HttpResponse<any> = await this.http
      .patch(this.API_URL + '/api/upload', formData, { headers, observe: 'response' })
      .toPromise();

    console.log(response);
  }
  public connect() {
    this.ws = new WebSocket(this.WS_URL);

    this.ws.onmessage = this.handleMessageReceived.bind(this);

    this.ws.onopen = this.handleConnected.bind(this);

    this.ws.onerror = this.handleError.bind(this);

    this.ws.onclose = this.handleClose.bind(this);
  }
  public disconnect() {
    if (!this.connected) return;

    this.ws.onmessage = function () {};

    this.ws.onopen = function () {};

    this.ws.onerror = function () {};

    this.ws.onclose = function () {};

    this.ws.close();

    this.ws = null;

    this.connected = false;
  }
  private handleMessageReceived(data) {
    this._events.publish('onmessage', data.data);
  }
  private handleConnected(data) {
    this.connected = true;

    //this._events.publish('onmessage', 'onwsconnect');
    /*
    let msg = {
      uid:this.uid,
      msg:"connect"
    }
    this.ws.send(JSON.stringify(msg));*/
  }
  private handleClose(data) {
    this.connect();
  }
  private handleError(err) {
    this.connect();
  }
  public sendMessage(msg) {
    console.log("sending message: " + msg)
    this.ws.send(msg);
  }
}
