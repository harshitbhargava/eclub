import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs-compat/Observable';
/**
 * Generated class for the ViewUserProfilePage page.
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
export interface Follow{
  Email: string,
  List_Of_Id: any
}
export interface products{
  Description: string,
  Interest: string,
  Name: string,
  Price: number
}
@IonicPage()
@Component({
  selector: 'page-view-user-profile',
  templateUrl: 'view-user-profile.html',
})
export class ViewUserProfilePage {
  private profileCollection: AngularFirestoreCollection<myprofile>;
  profile: Observable<myprofile[]>;
  private followingCollection: AngularFirestoreCollection<Follow>;
  following: Observable<Follow[]>;
  private followerCollection: AngularFirestoreCollection<Follow>;
  followers: Observable<Follow[]>;
  private productsCollection: AngularFirestoreCollection<products>;
  product: Observable<products[]>;
  productdata: any = [];
  followingdata: any = {};
  followerdata: any = {};
  usermail: any;
  myemail: any;
  flag;
  mydata:any = {};
  profiledata:any={};
  constructor(public navCtrl: NavController, public navParams: NavParams, afs: AngularFirestore) {
    this.usermail = navParams.get('data')
    this.myemail = navParams.get('data1')
    console.log(this.usermail)
    this.profileCollection = afs.collection<myprofile>('MyProfile');
    this.profile = this.profileCollection.valueChanges();
    this.followingCollection = afs.collection<Follow>('MyFollowing')
    this.following = this.followingCollection.valueChanges();
    this.followerCollection = afs.collection<Follow>('MyFollowers')
    this.followers = this.followerCollection.valueChanges();
    this.productsCollection = afs.collection<products>('Products');
    this.product = this.productsCollection.valueChanges();
    this.profileCollection.doc(this.usermail).ref.get().then(doc => {
      if (doc.exists) {
          this.profiledata = doc.data()
          for(let i = 0; i< doc.data().Products.length; i++)
          {
            this.productsCollection.doc(doc.data().Products[i]).ref.get().then(doc => {
              if (doc.exists) {
                  this.productdata.push(doc.data())
              } else {
                  console.log("No such document!");
                   
              }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
          }
          console.log("Document data:", doc.data())
      } else {
          console.log("No such document!");
           
      }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
    this.profileCollection.doc(this.myemail).ref.get().then(doc => {
      if (doc.exists) {
          this.mydata = doc.data()
          console.log("Document data:", doc.data())
      } else {
          console.log("No such document!");
           
      }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
    this.followingCollection.doc(this.myemail).ref.get().then(doc => {
      if (doc.exists) {
        this.flag = true
        this.followingdata = doc.data()
          for (let i = 0; i< doc.data().List_Of_Id.length; i++)
          {
            if (doc.data().List_Of_Id[i] == this.usermail || this.usermail == this.myemail)
            { this.flag = false;
              break;
            }
          }
          console.log("Document data:", doc.data())
      } else {
          console.log("No such document!");
           
      }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
    this.followerCollection.doc(this.usermail).ref.get().then(doc => {
      if (doc.exists) {
        this.followerdata = doc.data()
          console.log("Document data:", doc.data())
      } else {
          console.log("No such document!");
           
      }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
  }
  follow()
  {
    this.followingdata.List_Of_Id.push(this.usermail)
    this.followingCollection.doc(this.myemail).update(this.followingdata)
    this.followerdata.List_Of_Id.push(this.myemail)
    this.followerCollection.doc(this.usermail).update(this.followerdata)
    this.profiledata.No_Followers += 1
    this.profileCollection.doc(this.usermail).update(this.profiledata)
    this.mydata.No_Following += 1
    this.profileCollection.doc(this.myemail).update(this.mydata)
    this.flag = false
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewUserProfilePage');
  }

}
