import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs-compat/Observable';
import { SetPreferencesPage } from '../set-preferences/set-preferences';
export interface userprofile {
  Email: string,
  Name: string,
  Password: string,
  Pic_Url: string
}
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage implements OnInit{
  signupform: FormGroup;
  userData = { Name: "", 
               Password: "", 
               Email: "", 
               Contact: null, 
               Company_Name:"",
               Work_Place:"",
               Products: [],
 };
 myData = {
   Email: "",
   Name: "",
   Password: "",
   Pic_Url: ""
 };
 private userProfileCollection: AngularFirestoreCollection<userprofile>;
 items: Observable<userprofile[]>;
  ngOnInit(){
    this.signupform = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
      name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30)]),
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-z 0-9]+@[a-z]+.[a-z]+$')]),
      contact: new FormControl('',[Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]*')]),
      company: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30)]),
      workplace: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*,[a-zA-Z]*'), Validators.minLength(4), Validators.maxLength(30)])
    });
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, public afs: AngularFirestore) {
  }
  signup()
  {
    //console.log(this.userData)
    this.userProfileCollection = this.afs.collection<userprofile>('UserProfile');
    this.items = this.userProfileCollection.valueChanges();
    this.myData.Email = this.userData.Email
    this.myData.Name = this.userData.Name
    this.myData.Password = this.userData.Password
    this.myData.Pic_Url = ""
    this.userProfileCollection.doc(this.userData.Email).set(this.myData)
    this.navCtrl.setRoot(SetPreferencesPage,{
      data: this.userData
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}
