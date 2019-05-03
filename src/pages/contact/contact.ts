import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  mydata: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.mydata = navParams.get('data1')
  }

}
