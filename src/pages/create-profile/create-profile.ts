import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs-compat/Observable';
/**
 * Generated class for the CreateProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
export interface myprofile{
  Company_Name:string,
  Contact: number,
  Email: string,
  Name: string,
  No_Followers: number,
  No_Following: number,
  Password: string,
  Pic_Url: string,
  Posts: any,
  Preferences: any,
  Products: any,
  Work_Place : string
}
export interface products{
  Description: string,
  Interest: string,
  Name: string,
  Price: number
}
@IonicPage()
@Component({
  selector: 'page-create-profile',
  templateUrl: 'create-profile.html',
})
export class CreateProfilePage {
  private profileCollection: AngularFirestoreCollection<myprofile>;
  profile: Observable<myprofile[]>;
  private productsCollection: AngularFirestoreCollection<products>;
  product: Observable<products[]>;
  profiledata: any={};
  productdata: any =[];
  name: string = "";
  interest: string = "";
  description: string = "";
  price;
  constructor(public navCtrl: NavController, public navParams: NavParams, afs: AngularFirestore) {
    this.profiledata = navParams.get('data1')
    this.productdata = navParams.get('data2')
    console.log(this.profiledata)
    this.profileCollection = afs.collection<myprofile>('MyProfile');
    this.profile = this.profileCollection.valueChanges();
    this.productsCollection = afs.collection<products>('Products');
    this.product = this.productsCollection.valueChanges();
  }
  savechanges()
  {
    if(this.name != "")
    {
      let obj = {
        Name: this.name,
        Interest: this.interest,
        Description: this.description,
        Email: this.profiledata.Email,
        Price: this.price
      }
      this.productdata.push(obj)
      this.productsCollection.doc(this.name).set(obj)
      this.profiledata.Products.push(this.name)
      this.profileCollection.doc(this.profiledata.Email).update(this.profiledata)
    }
    else
    {
      this.profileCollection.doc(this.profiledata.Email).update(this.profiledata)
      for(let i=0; i<this.profiledata.Products.length; i++)
      this.productsCollection.doc(this.productdata[i].Name).update(this.productdata[i])
    }
    //add alert box
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateProfilePage');
  }
  
}
