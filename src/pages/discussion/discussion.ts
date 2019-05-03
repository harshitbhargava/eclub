import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs-compat/Observable';
import { Timestamp } from 'rxjs';
export interface discussions{
  Heading: string,
  Content: string,
  By: string,
  time: Date,
  Email: string,
  NoOfComments: number,
  Comments: any
}
/**
 * Generated class for the DiscussionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-discussion',
  templateUrl: 'discussion.html',
})
export class DiscussionPage {
  post: any
  dated: any
  comBy: any = []
  comMsg: any = []
  comTime: any = []
  mydata: any;
  newCommMsg: any;
  newCommTime: any;
  flag = false;
  private disCollection: AngularFirestoreCollection<discussions>;
  dis: Observable<discussions[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public afs: AngularFirestore) {
    this.post = navParams.get('postdata');
    this.mydata = navParams.get('mdata');
    this.disCollection = afs.collection<discussions>('Discussions');
    this.dis = this.disCollection.valueChanges();
    let date = new Date(this.post.time).toLocaleDateString("en-US")
    let t = new Date(this.post.time).toLocaleTimeString("en-US")
    var formatDate = date+ " at " + t
    console.log(formatDate)
    this.dated = formatDate
    for(let i = 0; i< this.post.Comments.length; i+=3)
    {
        this.comBy.push(this.post.Comments[i])
        this.comMsg.push(this.post.Comments[i+1])
        let date1 = new Date(this.post.Comments[i+2]).toLocaleDateString("en-US")
    let t1 = new Date(this.post.Comments[i+2]).toLocaleTimeString("en-US")
    var formatDate1 = date1+ " at " + t1
        this.comTime.push(formatDate1)

    }
  }
  comment()
  {
    this.flag = true;
    this.newCommTime = Date.now()
    this.post.Comments.push(this.mydata.Name)
    this.post.Comments.push(this.newCommMsg)
    this.post.Comments.push(this.newCommTime)
    this.post.NoOfComments += 1
    this.disCollection.doc(this.post.Heading).update(this.post)
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad DiscussionPage');
  }

}
