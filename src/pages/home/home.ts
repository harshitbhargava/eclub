import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs-compat/Observable';
import { DiscussionPage } from '../discussion/discussion';
import { NewPostPage } from '../new-post/new-post';
import { MyProfilePage } from '../my-profile/my-profile';
import { ViewUserProfilePage } from '../view-user-profile/view-user-profile';
export interface Discussion {
  Heading: string,
  Content: string,
  By: string,
  time: Date,
  Email: string,
  NoOfComments: number,
  Comments: any
  
}
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  mydata:any;
  posts=[]
  private disCollection: AngularFirestoreCollection<Discussion>;
  dis: Observable<Discussion[]>;
  dated: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public afs: AngularFirestore) {
    this.mydata = navParams.get('data1')
    this.disCollection = afs.collection<Discussion>('Discussions');
    this.dis = this.disCollection.valueChanges();
    this.disCollection.ref.orderBy("time","desc").limit(8)
      .get()
      .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.posts.push(doc.data())
        console.log(doc.data())
      let date = new Date(doc.data().time).toLocaleDateString("en-US")
      let t = new Date(doc.data().time).toLocaleTimeString("en-US")
      var formatDate = date+ " at " + t
                    console.log(formatDate)
      this.dated.push(formatDate)
    });
  })
  .catch(function(error) {
    console.log("Error getting documents: ", error);
    });
  }
  viewComments(i)
  {
    this.navCtrl.push(DiscussionPage,{
      postdata : this.posts[i],
      mdata : this.mydata
    })
  }
  newPost()
  {
    this.navCtrl.push(NewPostPage,{
      data1 : this.mydata,
    })
  }
  myProfilePage()
  {
    this.navCtrl.push(MyProfilePage,{
      data1 : this.mydata
    })
  }
  view()
  {
    this.navCtrl.push(ViewUserProfilePage)
  }
}
