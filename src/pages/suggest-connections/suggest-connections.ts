import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs-compat/Observable';
export interface Interests
{
  Member_Id: any,
}

export interface Profile
{
  Preferences: Array<string>,
  Email: string,
  Name: string,
  Pic_Url: string,
}
export interface Follow{
Email : string,
List_Of_Id : Array<string>
}


/**
 * Generated class for the SuggestConnectionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-suggest-connections',
  templateUrl: 'suggest-connections.html',
})
export class SuggestConnectionsPage {
  mydata;
  ctr=0;
  preferData:any;
  profileData:any=[];
  addedConnections:any={}

  private interestsCollection: AngularFirestoreCollection<Interests>;
  items: Observable<Interests[]>;
  private myProfileCollection: AngularFirestoreCollection<Profile>;
  profileitems: Observable<Profile[]>;

  private FollowerCollection: AngularFirestoreCollection<Follow>;
  followeritems: Observable<Follow[]>;
  private FollowingCollection: AngularFirestoreCollection<Follow>;
  followingitems: Observable<Follow[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afs: AngularFirestore) {
    this.mydata = this.navParams.get('data');
    console.log(this.mydata);

    this.interestsCollection = afs.collection<Interests>('Interest');
    this.items = this.interestsCollection.valueChanges();
    this.myProfileCollection = afs.collection<Profile>('MyProfile');
    this.profileitems = this.myProfileCollection.valueChanges()

    this.FollowerCollection = afs.collection<Follow>('MyFollowers');
    this.followeritems = this.FollowerCollection.valueChanges();
    this.FollowingCollection = afs.collection<Follow>('MyFollowing');
    this.followingitems = this.FollowingCollection.valueChanges();
    this.addedConnections.Email = this.mydata.Email
    this.addedConnections.List_Of_Id = []

    for(let prefer of this.mydata.Preferences)
    {
        this.interestsCollection.doc(prefer).ref.get().then(doc => {
        this.preferData = doc.data().Member_Id
        //console.log(this.preferData)
        for(let id of this.preferData)
        {
          if (id != this.mydata.Email)
          {
            this.myProfileCollection.doc(id).ref.get().then(doc => {
              if(this.profileData.indexOf(doc.data()) === -1) {
                this.profileData.push(doc.data());
              }
            
          }).catch(function(error) {
            console.log("Error getting document:", error);
          })
          }
        }
        console.log("Profile Data\n",this.profileData)
      }).catch(function(error) {
          console.log("Error getting document:", error);
      });
    }
    this.FollowerCollection.doc(this.mydata.Email).set(this.addedConnections)
  }
  check(i)
  {
    this.addedConnections.List_Of_Id.push(this.profileData[i].Email)
    this.ctr++
    this.profileData[i].No_Followers += 1
    this.myProfileCollection.doc(this.profileData[i].Email).update(this.profileData[i])
  }
  done(){
    this.FollowingCollection.doc(this.mydata.Email).set(this.addedConnections)
    this.mydata.No_Following=this.ctr
    this.myProfileCollection.doc(this.mydata.Email).update(this.mydata)
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SuggestConnectionsPage');
  }

}
