import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs-compat/Observable';
import { DiscussionPage } from '../discussion/discussion';
import { GroupProfilePage } from '../group-profile/group-profile';
import { CreateProfilePage } from '../create-profile/create-profile';
import { ViewUserProfilePage } from '../view-user-profile/view-user-profile';
import { LoginPage } from '../login/login';
/**
 * Generated class for the MyProfilePage page.
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
export interface Discussion {
  Heading: string,
  Content: string,
  By: string,
  time: Date,
  Email: string,
  NoOfComments: number,
  Comments: any
}
export interface Follow{
  Email: string,
  List_Of_Id: any
}
export interface User{
  Email: string,
  Name: string,
  Password: string,
  Pic_Url: string
}
export interface products{
  Description: string,
  Interest: string,
  Name: string,
  Price: number
}
@IonicPage()
@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html',
})
export class MyProfilePage {
  private profileCollection: AngularFirestoreCollection<myprofile>;
  profile: Observable<myprofile[]>;
  private disCollection: AngularFirestoreCollection<Discussion>;
  dis: Observable<Discussion[]>;
  private followingCollection: AngularFirestoreCollection<Follow>;
  following: Observable<Follow[]>;
  private followerCollection: AngularFirestoreCollection<Follow>;
  followers: Observable<Follow[]>;
  private userCollection: AngularFirestoreCollection<User>;
  user: Observable<User[]>;
  private productsCollection: AngularFirestoreCollection<products>;
  product: Observable<products[]>;
  mydata: any;
  profiledata:any={};
  productdata: any = [];
  followerList: any = []
  followingList: any = []
  constructor(public navCtrl: NavController, public navParams: NavParams, afs: AngularFirestore) {
    this.mydata = navParams.get("data1")
    this.profileCollection = afs.collection<myprofile>('MyProfile');
    this.profile = this.profileCollection.valueChanges();
    this.disCollection = afs.collection<Discussion>('Discussions');
    this.dis = this.disCollection.valueChanges();
    this.followerCollection = afs.collection<Follow>('MyFollowers')
    this.followers = this.followerCollection.valueChanges();
    this.followingCollection = afs.collection<Follow>('MyFollowing')
    this.following = this.followingCollection.valueChanges();
    this.userCollection = afs.collection<User>('UserProfile');
    this.user = this.userCollection.valueChanges();
    this.productsCollection = afs.collection<products>('Products');
    this.product = this.productsCollection.valueChanges();
    this.profileCollection.doc(this.mydata.Email).ref.get().then(doc => {
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
    this.followerCollection.doc(this.mydata.Email).ref.get().then(doc => {
      if (doc.exists) {
        
          for(let i=0; i< doc.data().List_Of_Id.length;i++)
          {
            this.userCollection.doc(doc.data().List_Of_Id[i]).ref.get().then(doc => {
              if (doc.exists) {
                  this.followerList.push(doc.data())
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
    this.followingCollection.doc(this.mydata.Email).ref.get().then(doc => {
      if (doc.exists) {
          for(let i=0; i< doc.data().List_Of_Id.length;i++)
          {
            this.userCollection.doc(doc.data().List_Of_Id[i]).ref.get().then(doc => {
              if (doc.exists) {
                  this.followingList.push(doc.data())
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
  }
  viewDiscussion(i)
  {
    this.disCollection.doc(this.profiledata.Posts[i]).ref.get().then(doc => {
      if (doc.exists) {
        this.navCtrl.push(DiscussionPage,{
          postdata: doc.data(),
          mdata : this.mydata
        })
          console.log("Document data:", doc.data())
      } else {
          console.log("No such document!");
           
      }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
  }
  viewGroup(i)
  {
    this.navCtrl.push(GroupProfilePage,{
      data1: this.mydata,
      data2: this.profiledata.Preferences[i],
      flag1: false
    })
  }
  editProfile()
  {
    this.navCtrl.push(CreateProfilePage,{
      data1: this.profiledata,
      data2: this.productdata
    })
  }
  viewUserProfile1(i)
  {
    this.navCtrl.push(ViewUserProfilePage,{
      data: this.followerList[i].Email,
      data1: this.mydata.Email
    })
  }
  viewUserProfile2(i)
  {
    this.navCtrl.push(ViewUserProfilePage,{
      data: this.followingList[i].Email,
      data1: this.mydata.Email
    })
  }
  logout()
  {
    this.navCtrl.push(LoginPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MyProfilePage');
  }

}
