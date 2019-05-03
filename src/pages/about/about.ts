import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs-compat/Observable';
import { GroupProfilePage } from '../group-profile/group-profile';
import { ViewUserProfilePage } from '../view-user-profile/view-user-profile';
export interface User{
  Email: string,
  Name: string,
  Password: string,
  Pic_Url: string
}
export interface Interests
{
  Member_Id: any,
  Name: string,
  Total_Members: number,
  Pic: string
}
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  private userCollection: AngularFirestoreCollection<User>;
  user: Observable<User[]>;
  private interestsCollection: AngularFirestoreCollection<Interests>;
  items: Observable<Interests[]>;
  mydata: any;
  searchstr;
  arr :any=[];
  cnt = 0;
  userdata: any = [];
  interestdata: any = [];
  x;
  y;
  flag = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, afs: AngularFirestore) {
    this.mydata = navParams.get('data1');
    this.userCollection = afs.collection<User>('UserProfile');
    this.user = this.userCollection.valueChanges()
    this.interestsCollection = afs.collection<Interests>('Interest');
    this.items = this.interestsCollection.valueChanges();
    this.interestsCollection.ref
      .get()
      .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.interestdata.push(doc.data())
      
    });
  })
  .catch(function(error) {
    console.log("Error getting documents: ", error);
    });
  }
  onkeydown2(event)
  {
    this.cnt++;
    this.arr.push(event.key)
    if(this.cnt == 3)
    {
      
      this.x = this.arr[0]+this.arr[1]+this.arr[2]
      var newChar = String.fromCharCode(this.arr[2].charCodeAt(0) + 1)
      this.y = this.arr[0]+this.arr[1]+newChar
      
    }
  if (this.cnt == 4)
  {
    this.cnt = 0;
    this.arr = [];
    this.flag = true
    this.userCollection.ref.where('Name','>=',this.x).where('Name','<',this.y).orderBy('Name')
      .get()
      .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.userdata.push(doc.data())
      
    });
  })
  .catch(function(error) {
    console.log("Error getting documents: ", error);
    });
  }
  }
  searchuser(){
    this.flag = true
    this.userCollection.ref.where('Name','==',this.searchstr)
      .get()
      .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.userdata.push(doc.data())
    });
  })
  .catch(function(error) {
    console.log("Error getting documents: ", error);
    });
  }
  viewGroup(i)
  {
    this.navCtrl.push(GroupProfilePage,{
      data1: this.mydata,
      data2: this.interestdata[i].Name
    })
  }
  viewuser(item)
  {
    this.navCtrl.push(ViewUserProfilePage,{
      data: item.Email,
      data1: this.mydata.Email
    })
  }
}
