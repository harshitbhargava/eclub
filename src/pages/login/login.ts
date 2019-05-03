import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs-compat/Observable';
import { SignupPage } from '../signup/signup';
import { TabsPage } from '../tabs/tabs';

// import { Http } from '@angular/http';
// import { HttpClient } from '@angular/common/http';
export interface Item { email: string;
                        pswd: string; }
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit{
  loginform: FormGroup;
  eid = ''
  pswd = ''
  flag=0;
  mydata:any;
  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  ngOnInit() {
    this.loginform = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-z 0-9]+@[a-z]+.[a-z]+$')])
    });
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private formBuilder: FormBuilder, afs: AngularFirestore,public alertController: AlertController) {
      this.itemsCollection = afs.collection<Item>('UserProfile');
    this.items = this.itemsCollection.valueChanges();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
     
      message: 'Not a Valid User',
      buttons: ['OK']
    });

    await alert.present();
  }

  login()
  {
    console.log(this.eid)
    console.log(this.pswd)
    this.itemsCollection.doc(this.eid).ref.get().then(doc => {
      if (doc.exists) {
          this.mydata = doc.data()
          if(this.mydata.Password == this.pswd)
          {console.log("Document data:", doc.data())
          this.navCtrl.setRoot(TabsPage,{
            data: doc.data()
          })
        }
        else{
          this.flag = 1;
        }
      } else {
          console.log("No such document!");
          this.flag=1;
           
      }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
    
  }
  signup()
  {
    this.navCtrl.push(SignupPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
