import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs-compat/Observable';
import { ViewUserProfilePage } from '../view-user-profile/view-user-profile';
/**
 * Generated class for the GroupProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
export interface Group{
  Member_Id: any,
  Name: string,
  Pic: string,
  About: string
}
export interface User{
  Email: string,
  Name: string,
  Password: string,
  Pic_Url: string
}
@IonicPage()
@Component({
  selector: 'page-group-profile',
  templateUrl: 'group-profile.html',
})
export class GroupProfilePage {
  private interestCollection: AngularFirestoreCollection<Group>;
  group: Observable<Group[]>;
  private userCollection: AngularFirestoreCollection<User>;
  user: Observable<User[]>;
  grpname: string;
  mydata: any;
  grpdata: any={};
  users: any = [];
  flag: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, afs: AngularFirestore) {
    this.mydata = navParams.get("data1")
    this.grpname = navParams.get("data2")
    this.flag = navParams.get("flag1")
    this.interestCollection = afs.collection<Group>('Interest');
    this.group = this.interestCollection.valueChanges();
    this.userCollection = afs.collection<User>('UserProfile');
    this.user = this.userCollection.valueChanges();
    this.interestCollection.doc(this.grpname).ref.get().then(doc => {
      if (doc.exists) {
          this.grpdata = doc.data()
          for(let i=0; i< this.grpdata.Member_Id.length; i++)
          {
            this.userCollection.doc(this.grpdata.Member_Id[i]).ref.get().then(doc => {
              if (doc.exists) {
                  this.users.push(doc.data())
              } else {
                  console.log("No such document!");
                   
              }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
          }
          console.log("Document data:", this.grpdata.Member_Id)
      } else {
          console.log("No such document!");
           
      }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
  }
  add()
  {
    // this.flag = true
    // this.grpdata.push(this.mydata.Email)
    // this.interestCollection.doc(this.grpname).update(this.grpdata)
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupProfilePage');
  }
  viewUser(i)
  {
    console.log(this.users)
    this.navCtrl.push(ViewUserProfilePage,{
      data: this.users[i].Email,
      data1: this.mydata.Email
    })
  }
}
