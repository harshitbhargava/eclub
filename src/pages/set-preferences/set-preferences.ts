import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs-compat/Observable';
import { SuggestConnectionsPage } from '../suggest-connections/suggest-connections';
import { TabsPage } from '../tabs/tabs';
export interface Interests
{
  Member_Id: any,
  Name: string,
  Total_Members: number,
  Pic: string
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
 * Generated class for the SetPreferencesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-set-preferences',
  templateUrl: 'set-preferences.html',
})
export class SetPreferencesPage {
  userData;
  profileData = {
    Preferences: [],
    Company_Name: "",
    Contact: null,
    Email: "",
    Name: "",
    No_Followers: 0,
    No_Following: 0,
    Password: "",
    Pic_Url: null,
    Products: [],
    Work_Place: "",
    Posts: []
  };
  myPreferences = [
    {Name: "Advertising", Selected: false},
    {Name: "Art", Selected: false},
    {Name: "Cryptocurrency", Selected: false},
    {Name: "E-commerce", Selected: false},
    {Name: "Electronics", Selected: false},
    {Name: "Fashion", Selected: false},
    {Name: "Gaming", Selected: false},
    {Name: "Health and Fitness", Selected: false},
    {Name: "Mechanics", Selected: false},
    {Name: "Travel", Selected: false}
  ];
  private interestsCollection: AngularFirestoreCollection<Interests>;
  items: Observable<Interests[]>;
  private myProfileCollection: AngularFirestoreCollection<Profile>;
  profileitems: Observable<Profile[]>;
  preferData:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public afs: AngularFirestore) {
    this.userData = this.navParams.get('data');
    console.log(this.userData)
    this.profileData.Name = this.userData.Name
    this.profileData.Email = this.userData.Email
    this.profileData.Password = this.userData.Password
    this.profileData.Contact = this.userData.Contact
    this.profileData.Company_Name = this.userData.Company_Name
    this.profileData.Work_Place = this.userData.Work_Place
    this.interestsCollection = afs.collection<Interests>('Interest');
    this.items = this.interestsCollection.valueChanges();
    this.myProfileCollection = afs.collection<Profile>('MyProfile');
    this.profileitems = this.myProfileCollection.valueChanges()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SetPreferencesPage');
  }
  check(i)
  {
    this.myPreferences[i].Selected = !this.myPreferences[i].Selected
  }
  done()
  {
    for(let prefer of this.myPreferences){
      if (prefer.Selected == true)
      {
        console.log(prefer.Name)
        
        this.interestsCollection.doc(prefer.Name).ref.get().then(doc => {
          this.preferData = doc.data()
          console.log(this.preferData)
          this.preferData.Member_Id.push(this.userData.Email)
          this.preferData.Total_Members++
          
          this.interestsCollection.doc(prefer.Name).update(this.preferData)
          
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });

        this.profileData.Preferences.push(prefer.Name)
      }
    }
  }
  goToConnectionsPage()
  {
    this.myProfileCollection.doc(this.userData.Email).set(this.profileData)
    this.navCtrl.setRoot(TabsPage,{
      data : this.profileData
    })
  }
}
