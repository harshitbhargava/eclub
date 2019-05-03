import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SetPreferencesPage } from './set-preferences';

@NgModule({
  declarations: [
    SetPreferencesPage,
  ],
  imports: [
    IonicPageModule.forChild(SetPreferencesPage),
  ],
})
export class SetPreferencesPageModule {}
