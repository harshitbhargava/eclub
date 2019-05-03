import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SuggestConnectionsPage } from './suggest-connections';

@NgModule({
  declarations: [
    SuggestConnectionsPage,
  ],
  imports: [
    IonicPageModule.forChild(SuggestConnectionsPage),
  ],
})
export class SuggestConnectionsPageModule {}
