import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { NavParams, NavController, Events } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  mydata:any;
  homeParams: any;
  searchParams: any;
  contactParams: any;
  constructor(private navParams: NavParams, public events:Events) {
    this.mydata = this.navParams.get('data')
    console.log(this.mydata)
    this.initializeParams()
  }
  initializeParams()
  {
    this.homeParams = {
      data1 : this.mydata
    }
    this.searchParams = {
      data1 : this.mydata
    }
    this.contactParams = {
      data1 : this.mydata
    }
  }
}
