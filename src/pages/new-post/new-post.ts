import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs-compat/Observable';
import { TabsPage } from '../tabs/tabs';
import { Timestamp } from 'rxjs';
export interface Discussion {
  Heading: string,
  Content: string,
  By: string,
  time: Timestamp<Date>,
  Email: string,
  NoOfComments: number,
  Comments: any
}
export interface Profile
{
  Preferences: Array<string>,
  Posts: Array<string>,
  Company_Name: string,
  Contact: number,
  Email: string,
  Name: string,
  No_Followers: number,
  No_Following: number,
  Password: string,
  Pic_Url: string,
  Products: Array<string>
  Work_Place: string
}
/**
 * Generated class for the NewPostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-post',
  templateUrl: 'new-post.html',
})
export class NewPostPage {
  mydata: any;
  mypost: any={};
  myprofiledata: any;
  private disCollection: AngularFirestoreCollection<Discussion>;
  dis: Observable<Discussion[]>;
  private myProfileCollection: AngularFirestoreCollection<Profile>;
  profileitems: Observable<Profile[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public afs: AngularFirestore) {
    this.mydata = navParams.get('data1')
    console.log(this.mydata)
    this.disCollection = afs.collection<Discussion>('Discussions');
    this.dis = this.disCollection.valueChanges();
    this.myProfileCollection = afs.collection<Profile>('MyProfile');
    this.profileitems = this.myProfileCollection.valueChanges()
    this.myProfileCollection.doc(this.mydata.Email).ref.get().then(doc => {
      if (doc.exists) {
          this.myprofiledata = doc.data()
          console.log("Document data:", doc.data())
      }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
  }
  post()
  {
    this.mypost.By = this.mydata.Name
    this.mypost.Email = this.mydata.Email
    this.mypost.time = Date.now() 
    this.mypost.NoOfComments = 0
    this.mypost.Comments = []
    console.log(this.mypost)
    this.disCollection.doc(this.mypost.Heading).set(this.mypost)
    this.myprofiledata.Posts.push(this.mypost.Heading)
    this.myProfileCollection.doc(this.mypost.Email).update(this.myprofiledata)
    this.navCtrl.setRoot(TabsPage,{
      data : this.mydata
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad NewPostPage');
  }

}
