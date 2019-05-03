import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { Firebase } from '@ionic-native/firebase/ngx';
import { FormsModule } from '@angular/forms';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { SplashScreenPage } from '../pages/splash-screen/splash-screen';
import { SetPreferencesPage } from '../pages/set-preferences/set-preferences';
import { SuggestConnectionsPage } from '../pages/suggest-connections/suggest-connections';
import { DiscussionPage } from '../pages/discussion/discussion';
import { NewPostPage } from '../pages/new-post/new-post';
import { MyProfilePage } from '../pages/my-profile/my-profile';
import { GroupProfilePage } from '../pages/group-profile/group-profile';
import { CreateProfilePage } from '../pages/create-profile/create-profile';
import { ViewUserProfilePage } from '../pages/view-user-profile/view-user-profile';

export const firebaseConfig = {
  apiKey: "AIzaSyC72XX_XkNCEFfDPFyYSp9I22N4-eLyo6Y",
    authDomain: "eclub-ca95c.firebaseapp.com",
    databaseURL: "https://eclub-ca95c.firebaseio.com",
    projectId: "eclub-ca95c",
    storageBucket: "eclub-ca95c.appspot.com",
    messagingSenderId: "729467755515"
};
@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SignupPage,
    SetPreferencesPage,
    SuggestConnectionsPage,
    DiscussionPage,
    NewPostPage,
    MyProfilePage,
    CreateProfilePage,
    GroupProfilePage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    SplashScreenPage,
    ViewUserProfilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    FormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SignupPage,
    SetPreferencesPage,
    SuggestConnectionsPage,
    DiscussionPage,
    NewPostPage,
    MyProfilePage,
    CreateProfilePage,
    GroupProfilePage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    SplashScreenPage,
    ViewUserProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
