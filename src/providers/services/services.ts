import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';

/*
  Generated class for the ServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServicesProvider {
  public WS_URL:string = "ws://red-partitures.cloudno.de";
  public API_URL:string = "http://red-partitures.cloudno.de";

  //public WS_URL:string = "ws:/localhost:8080";
  //public API_URL:string = "ws://localhost:8080";

  private ws:WebSocket;

  private _events: Events;

  public connected:boolean = false;
  constructor(events:Events) {
    this._events = events;
  }
  public getAPI_URL():string {
    return this.API_URL;
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
