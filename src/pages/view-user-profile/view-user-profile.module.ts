import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewUserProfilePage } from './view-user-profile';

@NgModule({
  declarations: [
    ViewUserProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ViewUserProfilePage),
  ],
})
export class ViewUserProfilePageModule {}
